import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import * as Yup from 'yup';
import SearchSelect from "../common/SearchSelect";
import Input from "../common/Input";
import { CiCalendarDate } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Textarea from "../common/Textarea";


const EnterOneProductItem = () => { 
    const initialValues={palleteNumber:"",whole:"",weight:"",date:"",information:""};
    const [productsEnters,setProductsEnters]=useState(null);
    const [palletes,setPalletes]=useState(null);
    const [overallProucts,setOverallProucts]=useState(null);
    const [productList,setProductList]=useState(null);

    let navigate = useNavigate();

    const onSubmit=(values,{resetForm})=>{
        //check for existence pallete in enterProducts alredy
        const findedPalleteNumber=productsEnters.find(item=>item===values.palleteNumber)||undefined;
        //find the enteredpallete in palletes DB
        const findedPalleteInwholePalletes=palletes.find(item=>item.palleteNumber===values.palleteNumber);
        //find the  enteredProduct in overallProucts DB
        const choosedOverallProduct= overallProucts.find(item=>item.whole===values.whole);
        if(findedPalleteNumber===undefined && findedPalleteInwholePalletes!==undefined && choosedOverallProduct){
        axios.post(`http://localhost:4000/enterProducts/`,
        {...values,productId:choosedOverallProduct.id,productNumber:Math.round((values.weight- findedPalleteInwholePalletes.palleteWeight ) / choosedOverallProduct.RandomWeight)})
        .then(res=>{
            axios.post(`http://localhost:4000/allEnterProducts/`,
        {...values,productId:choosedOverallProduct.id,productNumber:Math.round((values.weight- findedPalleteInwholePalletes.palleteWeight ) / choosedOverallProduct.RandomWeight)})
            .then(res=>{
                navigate("/ProductsInventory")
                toast.success("data added successfully")
            })
        })
        .catch(err=>toast.error(err.message));
        resetForm();
    }else{
        toast.error("some error occured")
    }
};
    //get enterProducts from enterProducts DB    
    useEffect(()=>{
        axios.get(`http://localhost:4000/enterProducts`)
        .then(res=>{
          const data=  res.data.map(item=>item.palleteNumber);
          setProductsEnters(data)
        })
        .catch(err=>toast.error(err.message))
    },[]);
    //get overallProduct from DB
    useEffect(()=>{
        axios.get(`http://localhost:4000/overallProucts`)
        .then(res=>{
            setOverallProucts(res.data);
           const productList= res.data.map(item=>item.whole);
           setProductList(productList)
        })
        .catch(err=>toast.error(err.message))
    },[]);
    //get palletes from palletes DB
    useEffect(()=>{
        axios.get(`http://localhost:4000/palletes`)
        .then(res=>{setPalletes(res.data)})
        .catch(err=>toast.error(err.message))
    },[]);

    const validationSchema=Yup.object({
        palleteNumber:Yup.string().required('pallete number is required'),
        whole: Yup.string("").required("product data is required"),
        weight:Yup.number("the format is not number format").required('weight is required'),
        date:Yup.string("the format is not date format").required('date is required'),
        information:Yup.string(),
    });

    const formik=useFormik({initialValues,onSubmit,validationSchema,validateOnMount:true});
    console.log(formik.isValid)
    return ( 
        <div className="lg:flex-1">
            {overallProucts &&
            <form onSubmit={formik.handleSubmit} className="container mx-auto max-w-md p-2 ">
                <div className="flex flex-col gap-4 justify-center items-center">
                <Input type="number" label="pallete number" name="palleteNumber" formik={formik} logo={<CiCalendarDate />} />         
                {productList && 
                    <SearchSelect options={productList} label="product name" name="whole" formik={formik} logo={<CiCalendarDate />} />
                }
                <Input type="number" label="weight" name="weight" formik={formik} logo={<CiCalendarDate />} />
                <Input type="date" label="date" name="date" formik={formik} logo={<CiCalendarDate />} />
                <Textarea name="information" formik={formik} />
                <button disabled={!formik.isValid} className={`py-2 px-4 bg-primary_yellow rounded-sm w-full ${!formik.isValid && 'bg-opacity-60'}`} type="submit">{formik.isValid ?'Add' : 'please complete all fields'}</button>
                </div>
            </form>
            }
        </div>
     );

            }
 
export default EnterOneProductItem;