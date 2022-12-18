import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import * as Yup from 'yup';
import { getOptions } from "../common/getOptions";
import SearchSelect from "../common/SearchSelect";
import SelectOptions from "../common/SelectOptions";



const initialValues={productName:"",productSpecification:"",measurmentUnit:"",date:"",number:"",supplier:"",enterDelivery:"",enterTransferee:""}
const onSubmit=(values)=>{
    console.log(values);
}
const validationSchema=Yup.object({
    productName:Yup.string().required('product name is required'),
    productSpecification:Yup.string().required('product Specification is required'),
    measurmentUnit:Yup.string().required('measurement Unit is required'),
    date: Yup.date("the format is not date format").required("data is required"),
    number:Yup.number("the format is not number format").required('number is required'),
    supplier:Yup.string().required('supplier is required'),
    enterDelivery:Yup.string().required("delivery is required"),
    enterTransferee:Yup.string().required("transferee is required")
})

const Enter = () => {
    const optionsDB=['productName','productSpecification','measurmentUnit','supplier','enterDelivery','enterTransferee']
    const [options,setOptions]=useState({productName:[],productSpecification:[],measurmentUnit:[],supplier:[],enterDelivery:[],enterTransferee:[]})
    useEffect(()=>{
        axios.get(`http://localhost:4000/overall`)
        .then(res=>{
            const data=res.data;
            console.log(res.data)
           data.map(item=>{
           options.productName= data.filter(item=>item.name==="productName") 
           options.productSpecification= data.filter(item=>item.name==="productSpecification") 
           options.measurmentUnit= data.filter(item=>item.name==="measurmentUnit")
           options.supplier= data.filter(item=>item.name==="supplier") 
           options.enterDelivery= data.filter(item=>item.name==="enterDelivery") 
           options.enterTransferee= data.filter(item=>item.name==="enterTransferee") 
           })
        })
        .catch()
    },[])
    console.log(options)
    const formik=useFormik({initialValues,onSubmit,validationSchema,validateOnMount:true});
    // console.log(formik.errors);
    // console.log(formik.touched)
    // console.log(formik.isValid);
    return ( 
        <div className="bg-blue-600">
            <form onSubmit={formik.handleSubmit} className="container mx-auto max-w-md p-2 ">
                <div className="flex flex-col gap-4 justify-center items-center">
                {options.productName && 
                <SearchSelect  options={options.productName} name="productName" formik={formik} />
                }
                <button disabled={!formik.isValid} className="py-2 px-4 bg-blue-500 rounded-md w-full" type="submit">Add</button>
                </div>
            </form>
        </div>
     );
}
 
export default Enter;