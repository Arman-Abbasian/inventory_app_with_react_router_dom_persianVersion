import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import * as Yup from 'yup';
import SearchSelect from "../common/SearchSelect";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { RiStore2Line } from "react-icons/ri";
import Input from "../common/Input";
import { CiCalendarDate } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { AiOutlineNumber } from "react-icons/ai";
import {  BsPerson} from "react-icons/bs";



const PartEnterEditInput = () => {
    let navigate=useNavigate();
    const initialValues={productName:"",date:"",number:"",supplier:"",enterDelivery:"",enterTransferee:""}
    const onSubmit=(values,{resetForm})=>{
        axios.post(`http://localhost:4000/enter`,values)
        .then(res=>{
            navigate("/EnterList")
            toast.success("data added successfully")
        })
        .catch(err=>toast.error(err.message));
        resetForm();
    }
    const validationSchema=Yup.object({
        productName:Yup.string().required('product name is required'),
        date: Yup.date("the format is not date format").required("data is required"),
        number:Yup.number("the format is not number format").required('number is required'),
        supplier:Yup.string().required('supplier is required'),
        enterDelivery:Yup.string().required("delivery is required"),
        enterTransferee:Yup.string().required("transferee is required")
    })
    const [overall,setOverall]=useState(null);
    const options={productName:[],supplier:[],enterDelivery:[],enterTransferee:[]};
    useEffect(()=>{
       axios.get(`http://localhost:4000/overall`)
       .then(res=>{
        setOverall(res.data)
       })
       .catch(err=>toast.error(err.message))
    },[]);
    function fillOptions(){
        options.productName= overall.filter(item=>item.category==="productName");
        options.supplier= overall.filter(item=>item.category==="supplier");
        options.enterDelivery= overall.filter(item=>item.category==="enterDelivery");
        options.enterTransferee= overall.filter(item=>item.category==="enterTransferee");
    };
    if(overall) {fillOptions()}
    const formik=useFormik({initialValues,onSubmit,validationSchema,validateOnMount:true});
    console.log(formik.errors);
    //console.log(formik.touched)
    // console.log(formik.isValid);
    console.log(options)
    return ( 
        <div className="lg:flex-1">
            <form onSubmit={formik.handleSubmit} className="container mx-auto max-w-md p-2 ">
                <div className="flex flex-col gap-4 justify-center items-center">
                {options.productName &&
                <SearchSelect options={options.productName} name="productName" label="product name" formik={formik} logo={<HiOutlineShoppingCart className="w-6 h-6 text-primary_cream" />} />
                }
                <Input type="date" name="date" label="date" formik={formik} logo={<CiCalendarDate className="w-6 h-6 text-primary_cream"  />} />
                <Input type="number" label="number" name="number" formik={formik} logo={<AiOutlineNumber className="w-6 h-6 text-primary_cream"  />} />
                {options.supplier &&
                <SearchSelect options={options.supplier} name="supplier" label="supplier" formik={formik} logo={<RiStore2Line className="w-6 h-6 text-primary_cream"  />} />
                }
                {options.enterDelivery &&
                <SearchSelect options={options.enterDelivery} name="enterDelivery" label="enter delivery" formik={formik} logo={<BsPerson className="w-6 h-6 text-primary_cream"  />} />
                }
                {options.enterTransferee &&
                <SearchSelect options={options.enterTransferee} name="enterTransferee" label="enter transferee" formik={formik} logo={<BsPerson className="w-6 h-6 text-primary_cream"  />} />
                }
                <button disabled={!formik.isValid} className="py-2 px-4 bg-primary_cream rounded-sm w-full" type="submit">{formik.isValid ?'Add' : 'please complete all fields'}</button>
                </div>
            </form>
        </div>
     );
}
 
export default PartEnterEditInput;