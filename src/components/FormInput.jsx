import { useFormik } from "formik";
import * as Yup from 'yup';
import Input from "../common/Input";
import Textarea from "../common/Textarea";
import { HiOutlineShoppingCart , HiOutlineInformationCircle } from "react-icons/hi2";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";


const FormInput = ({name ,label,logo}) => {
    const initialValues={category:name,[name]:"",information:""}
    const onSubmit=(values,{ resetForm })=>{
        axios.post(`http://localhost:4000/overall`,values)
        .then(res=>{
            toast.success(`${label} added successfully`);
            setIsShow(false)
        })
        .catch(err=>toast.error(err.message))
        resetForm();      
};

    const validationSchema=Yup.object({
        [name]:Yup.string().required(`${label} is required`),
        information:Yup.string(),
    });
    const [isShow,setIsShow]=useState(false)

    const formik=useFormik({initialValues,onSubmit,validationSchema,validateOnMount:true});
    return ( 
        <div className="flex flex-col gap-3 container mx-auto max-w-md p-2">
            <button className={`w-full p-2 rounded-sm ${isShow ?'bg-primary_green':'bg-primary_yellow'}`}onClick={()=>setIsShow(!isShow)}>{isShow ?'hide' : 'show'} {label} input</button>
            <form onSubmit={formik.handleSubmit} className={`${isShow ? 'block':'hidden'}`}>
                <div className="flex flex-col gap-4 justify-center items-center border border-primary_green  rounded-sm p-2">
                    <Input  name={name} label={label} formik={formik} logo={logo} />
                    <Textarea name="information" formik={formik} logo={<HiOutlineInformationCircle className="w-6 h-6" /> }/>
                    <button disabled={!formik.isValid} className="py-2 px-4 bg-primary_green rounded-sm w-full disabled:bg-opacity-60" type="submit">Add</button>
                </div>
            </form>
        </div>
     );
}
export default FormInput;