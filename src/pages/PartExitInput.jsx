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
    const initialValues={productName:"",date:"",number:"",consumingFor:"",exitDelivery:"",exitTransferee:""}
    const onSubmit=(values,{resetForm})=>{
        axios.post(`http://localhost:4000/exit`,values)
        .then(res=>{
            navigate("/PartExitList")
            toast.success("خروجی با موفقیت ثبت گردید")
        })
        .catch(err=>toast.error(err.message));
        resetForm();
    }
    const validationSchema=Yup.object({
        productName:Yup.string().required('product name is required'),
        date: Yup.date("the format is not date format").required("data is required"),
        number:Yup.number("لطفا عدد وارد نمایید").required('تعداد مورد نیاز است'),
        consumingFor:Yup.string().required('مورد مصرف مورد نیاز است'),
        exitDelivery:Yup.string().required("لطفا تحویل دهنده را وارد نمایید"),
        exitTransferee:Yup.string().required("لطفا تحویل گیرنده را وارد نمایید")
    })
    const [overall,setOverall]=useState(null);
    const options={productName:[],consumingFor:[],exitDeliveryy:[],exitTransferee:[]};
    useEffect(()=>{
       axios.get(`http://localhost:4000/overall`)
       .then(res=>{
        setOverall(res.data)
       })
       .catch(err=>toast.error(err.message))
    },[]);
    function fillOptions(){
        options.productName= overall.filter(item=>item.category==="productName");
        options.consumingFor= overall.filter(item=>item.category==="consumingFor");
        options.exitDeliveryy= overall.filter(item=>item.category==="exitDelivery");
        options.exitTransferee= overall.filter(item=>item.category==="exitTransferee");
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
                <SearchSelect options={options.productName} name="productName" label="نام قطعه" formik={formik} logo={<HiOutlineShoppingCart className="w-6 h-6 text-primary_cream" />} />
                }
                <Input type="date" name="date" label="تاریخ" formik={formik} logo={<CiCalendarDate className="w-6 h-6 text-primary_cream"  />} />
                <Input type="number" label="تعداد" name="number" formik={formik} logo={<AiOutlineNumber className="w-6 h-6 text-primary_cream"  />} />
                {options.consumingFor &&
                <SearchSelect options={options.consumingFor} name="consumingFor" label="مورد مصرف" formik={formik} logo={<RiStore2Line className="w-6 h-6 text-primary_cream"  />} />
                }
                {options.exitDeliveryy &&
                <SearchSelect options={options.exitDeliveryy} name="exitDelivery" label="تحویل دهنده" formik={formik} logo={<BsPerson className="w-6 h-6 text-primary_cream"  />} />
                }
                {options.exitTransferee &&
                <SearchSelect options={options.exitTransferee} name="exitTransferee" label="تحویل گیرنده" formik={formik} logo={<BsPerson className="w-6 h-6 text-primary_cream"  />} />
                }
                <button disabled={!formik.isValid} className="py-2 px-4 bg-primary_cream rounded-sm w-full" type="submit">{formik.isValid ?'ثبت' : 'لطفا تمامی فیلدهای مورد نیاز را تکمیل نمایید'}</button>
                </div>
            </form>
        </div>
     );
}
 
export default PartEnterEditInput;