import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import * as Yup from 'yup';
import SearchSelect from "../common/SearchSelect";
import SelectOptions from "../common/SelectOptions";
import Input from "../common/Input";
import { CiCalendarDate } from "react-icons/ci";



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
    const [overall,setOverall]=useState(null);
    const options={productName:[],productSpecification:[],measurmentUnit:[],supplier:[],enterDelivery:[],enterTransferee:[]};
    const [productName,setProductName]=useState(null);
    useEffect(()=>{
       axios.get(`http://localhost:4000/overall`)
       .then(res=>{
        setOverall(res.data)
       })
       .catch(err=>toast.error(err.message))
    },[]);
    function fillOptions(){
        options.productName= overall.filter(item=>item.kind==="productName");
        options.productSpecification= overall.filter(item=>item.kind==="productSpecification");
        options.measurmentUnit= overall.filter(item=>item.kind==="measurmentUnit");
        options.supplier= overall.filter(item=>item.kind==="supplier");
        options.enterDelivery= overall.filter(item=>item.kind==="enterDelivery");
        options.enterTransferee= overall.filter(item=>item.kind==="enterTransferee");
    };
    if(overall) {fillOptions()}
    const formik=useFormik({initialValues,onSubmit,validationSchema,validateOnMount:true});
    console.log(formik.errors);
    // console.log(formik.touched)
    // console.log(formik.isValid);
    return ( 
        <div>
            <form onSubmit={formik.handleSubmit} className="container mx-auto max-w-md p-2 ">
                <div className="flex flex-col gap-4 justify-center items-center">
                {options.productName.length &&
                <SearchSelect options={options.productName} name="productName" formik={formik} logo={<CiCalendarDate />} />
                }
                {options.productSpecification.length &&
                <SearchSelect options={options.productSpecification} name="productSpecification" formik={formik} logo={<CiCalendarDate />} />
                }
                {options.productName.length &&
                <SelectOptions options={options.measurmentUnit} name="measurmentUnit" formik={formik} logo={<CiCalendarDate />} />
                }
                {options.productName.length &&
                <Input type="date" name="date" formik={formik} logo={<CiCalendarDate />} />
                }
                {options.productName.length &&
                <Input type="number" name="number" formik={formik} logo={<CiCalendarDate />} />
                }
                {options.supplier.length &&
                <SearchSelect options={options.supplier} name="supplier" formik={formik} logo={<CiCalendarDate />} />
                }
                {options.enterDelivery.length &&
                <SearchSelect options={options.enterDelivery} name="enterDelivery" formik={formik} logo={<CiCalendarDate />} />
                }
                {options.enterTransferee.length &&
                <SearchSelect options={options.enterTransferee} name="enterTransferee" formik={formik} />
                }
                <button disabled={!formik.isValid} className="py-2 px-4 bg-blue-500 rounded-md w-full" type="submit">Add</button>
                </div>
            </form>
        </div>
     );
}
 
export default Enter;