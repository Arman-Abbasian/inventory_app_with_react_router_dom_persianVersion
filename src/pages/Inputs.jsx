import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import * as Yup from 'yup';
import Input from "../common/Input";
import Textarea from "../common/Textarea";
import { CiCalendarDate } from "react-icons/ci";



const productNameInitialValues={category:"productName",productName:"",information:""}
const onSubmit=(values)=>{
    console.log(values);
}
const productNameValidationSchema=Yup.object({
    productName:Yup.string().required('product name is required'),
    information:Yup.string(),
})

const productName = () => {
    const [productName,setProductName]=useState(null);
    const formik=useFormik({productNameInitialValues,onSubmit,productNameValidationSchema,validateOnMount:true});
    // console.log(formik.errors);
    console.log(formik.touched)
    // console.log(formik.isValid);
    return ( 
        <div>
            <form onSubmit={formik.handleSubmit} className="container mx-auto max-w-md p-2 ">
                <div className="flex flex-col gap-4 justify-center items-center">
                    <Input type="date" name="date" formik={formik} logo={<CiCalendarDate />} />
                    <Textarea name="information" formik={formik} logo={<CiCalendarDate /> }/>
                    <button disabled={!formik.isValid} className="py-2 px-4 bg-blue-500 rounded-md w-full" type="submit">Add</button>
                </div>
            </form>
        </div>
     );
}
export default productName;