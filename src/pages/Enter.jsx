import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import SelectOptions from "../common/SelectOptions";



const initialValues={productName:"",productSpecification:"",measurementUnit:"",date:"",number:"",supplier:"",delivery:"",transferee:""}
const onSubmit=(values)=>{
    console.log(values);
}
const validationSchema=Yup.object({
    productName:Yup.string().required('product name is required'),
    productSpecification:Yup.string().required('product Specification is required'),
    measurementUnit:Yup.string().required('measurement Unit is required'),
    date: Yup.date("the format is not date format").required("data is required"),
    number:Yup.number("the format is not number format").required('number is required'),
    supplier:Yup.string().required('supplier is required'),
    delivery:Yup.string().required("delivery is required"),
    transferee:Yup.string().required("transferee is required")
})

const Enter = () => {
    const [options,setOptions]=useState({productName:null,productSpecification:null,measurementUnit:null,supplier:null,delivery:null,transferee:null})
    useEffect(()=>{
        axios.get(`http://localhost:4000/product%20name`)
        .then()
        .catch()
    },[])
    const formik=useFormik({initialValues,onSubmit,validationSchema,validateOnMount:true});
    console.log(formik.errors);
    console.log(formik.touched)
    console.log(formik.isValid);
    return ( 
        <div className="bg-blue-600">
            <form onSubmit={formik.handleSubmit} className="container mx-auto max-w-md p-2 ">
                <div className="flex flex-col gap-4 justify-center items-center">
                <SelectOptions options={options} name="productName" formik={formik} />
                <button disabled={!formik.isValid} className="py-2 px-4 bg-blue-500 rounded-md w-full" type="submit">Add</button>
                </div>
            </form>
        </div>
     );
}
 
export default Enter;