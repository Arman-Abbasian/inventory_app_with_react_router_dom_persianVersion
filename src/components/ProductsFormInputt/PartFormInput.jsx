import { useFormik } from "formik";
import * as Yup from 'yup';
import Input from "../../common/Input";
import Textarea from "../../common/Textarea";
import {  HiOutlineInformationCircle } from "react-icons/hi2";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";


const PartFormInput = () => {
    const [isShow,setIsShow]=useState(false);

    const initialValues={partName:"",information:""}
    const onSubmit=(values,{ resetForm })=>{
        axios.post(`http://localhost:4000/part`,values)
        .then(res=>{
            toast.success(`data added successfully`);
            setIsShow(false)
        })
        .catch(err=>toast.error(err.message))
        resetForm();      
};

    const validationSchema=Yup.object({
        partName:Yup.string().required(`part name is required`),
        information:Yup.string(),
    });

    const formik=useFormik({initialValues,onSubmit,validationSchema,validateOnMount:true});
    return ( 
        <div className="flex flex-col gap-3 container mx-auto max-w-md">
            <button className={`w-full p-2 rounded-sm bg-primary_cream shadow-[0_10px_20px_rgba(79,_119,_45,_0.5)]`}onClick={()=>setIsShow(!isShow)}>{isShow ?'hide part name' : 'show part name'}  input</button>
            <form onSubmit={formik.handleSubmit} className={`${isShow ? 'block':'hidden'}`}>
                <div className="flex flex-col gap-4 justify-center items-center border border-primary_green  rounded-sm p-2">
                    <Input  name="partName" label="part name" formik={formik} logo={<HiOutlineInformationCircle className="w-6 h-6" />} />
                    <Textarea name="information" label="information" formik={formik} logo={<HiOutlineInformationCircle className="w-6 h-6" /> }/>
                    <button disabled={!formik.isValid} className="py-2 px-4 bg-primary_cream rounded-sm w-full disabled:bg-opacity-60" type="submit">{formik.isValid ? 'Add':'please fill necessary fields'}</button>
                </div>
            </form>
        </div>
     );
}
export default PartFormInput;