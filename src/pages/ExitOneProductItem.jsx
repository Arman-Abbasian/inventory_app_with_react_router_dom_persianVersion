import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import * as Yup from 'yup';
import Input from "../common/Input";
import { CiCalendarDate } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Textarea from "../common/Textarea";
import SearchSelect from "../common/SearchSelect";


const ExitOneProductItem = () => { 
    const initialValues={palleteNumber:"",date:"",information:""};
    const [productList,setProductList]=useState(null);
    const [productsExits,setProductsExits]=useState(null);
    const [productsEnters,setProductsEnters]=useState(null);

    let navigate = useNavigate();

    const onSubmit=(values,{resetForm})=>{
        const findedExitedPalleteNumber=productsExits.find(item=>item.palleteNumber===values.palleteNumber);
        const findedExteredPalletNumber=productsEnters.find(item=>item.palleteNumber===values.palleteNumber);
        if(findedExitedPalleteNumber===undefined && findedExteredPalletNumber!==undefined){
        const findWholeFromEnterProducts=productsEnters.find(item=>item.palleteNumber===values.palleteNumber)
        const whole=findWholeFromEnterProducts.whole
        axios.post(`http://localhost:4000/exitProducts/`,{...values,whole})
        .then(res=>{
            navigate("/ProductsExits")
            toast.success("data added successfully")
        })
        .catch(err=>toast.error(err.message));
        resetForm();
    }else{
        toast.error("pallete number is already existed or  pallete number is not entered beofre")
    }
};

useEffect(()=>{
    axios.get(`http://localhost:4000/exitProducts`)
    .then(res=>{setProductsExits(res.data)})
    .catch(err=>toast.error(err.message))
},[]);

useEffect(()=>{
    axios.get(`http://localhost:4000/enterProducts`)
    .then(res=>{setProductsEnters(res.data)})
    .catch(err=>toast.error(err.message))
},[]);

    const validationSchema=Yup.object({
        palleteNumber:Yup.string().required('pallete number is required'),
        date:Yup.string("the format is not date format").required('date is required'),
        information:Yup.string(),
    });

    useEffect(()=>{
        axios.get(`http://localhost:4000/overallProucts`)
        .then(res=>setProductList(res.data))
        .catch(err=>toast.error(err.message))
    },[]);
    const ref=useRef(null)
    const someFuncton = () => {
        console.log(ref)
    };
    someFuncton();
    const formik=useFormik({initialValues,onSubmit,validationSchema,validateOnMount:true, innerRef:ref})
    return ( 
        <div className="lg:flex-1">
            {productList &&
            <form onSubmit={formik.handleSubmit} className="container mx-auto max-w-md p-2 ">
                <div className="flex flex-col gap-4 justify-center items-center">
                <Input type="number" label="pallete number" name="palleteNumber" formik={formik} logo={<CiCalendarDate />} /> 
                <SearchSelect options={productList} label="product name" name="whole" formik={formik} logo={<CiCalendarDate />} />        
                <Input type="date" label="date" name="date" formik={formik} logo={<CiCalendarDate />} />
                <Textarea name="information" formik={formik} />
                <button disabled={!formik.isValid} className={`py-2 px-4 bg-primary_yellow rounded-sm w-full ${!formik.isValid && 'bg-opacity-60'}`} type="submit">{formik.isValid ?'Add' : 'please complete all fields'}</button>
                </div>
            </form>
            }
        </div>
     );
            }
 
export default ExitOneProductItem;