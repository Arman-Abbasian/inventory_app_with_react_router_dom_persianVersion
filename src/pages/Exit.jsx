import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import * as Yup from 'yup';
import SearchSelect from "../common/SearchSelect";
import SelectOptions from "../common/SelectOptions";
import Input from "../common/Input";
import { CiCalendarDate } from "react-icons/ci";



const initialValues={productName:"",date:"",number:"",consumingFor:"",exitDelivery:"",exitTransferee:"",jobPosition:"",unit:""}
const onSubmit=(values,{resetForm})=>{
    axios.post(`http://localhost:4000/exit`,values)
    .then(res=>toast.success("data added successfully"))
    .catch(err=>toast.error(err.message));
    resetForm();
}
const validationSchema=Yup.object({
    productName:Yup.string().required('product name is required'),
    date: Yup.date("the format is not date format").required("data is required"),
    number:Yup.number("the format is not number format").required('number is required'),
    consumingFor:Yup.string().required('consumig for is required'),
    exitDelivery:Yup.string().required("delivery is required"),
    exitTransferee:Yup.string().required("transferee is required"),
    jobPosition:Yup.string().required("job position is required"),
    unit:Yup.string().required("unit is required"),
});

const Exit = () => {
    const [overall,setOverall]=useState(null);
    const options={productName:[],date:[],number:[],consumingFor:[],exitDelivery:[],exitTransferee:[],jobPosition:[],unit:[]};
    useEffect(()=>{
       axios.get(`http://localhost:4000/overall`)
       .then(res=>{
        setOverall(res.data)
       })
       .catch(err=>toast.error(err.message))
    },[]);
    function fillOptions(){
        options.productName= overall.filter(item=>item.category==="productName");
        options.measurmentUnit= overall.filter(item=>item.category==="measurmentUnit");
        options.consumingFor= overall.filter(item=>item.category==="consumingFor");
        options.exitDelivery= overall.filter(item=>item.category==="exitDelivery");
        options.exitTransferee= overall.filter(item=>item.category==="exitTransferee");
        options.jobPosition= overall.filter(item=>item.category==="jobPosition");
        options.unit= overall.filter(item=>item.category==="unit");
    };
    if(overall) {fillOptions()}
    const formik=useFormik({initialValues,onSubmit,validationSchema,validateOnMount:true});
    console.log(formik.errors);
    //console.log(formik.touched)
    // console.log(formik.isValid);
    console.log(options)
    return ( 
        <div className="lg:flex-1">
            {overall && 
            <form onSubmit={formik.handleSubmit} className="container mx-auto max-w-md p-2 ">
                <div className="flex flex-col gap-4 justify-center items-center">
                    
                {options.productName &&
                <SearchSelect options={options.productName} name="productName" label="product name" formik={formik} logo={<CiCalendarDate />} />
                }
                <Input type="date" name="date" label="date" formik={formik} logo={<CiCalendarDate />} />
                
                <Input type="number" label="number" name="number" formik={formik} logo={<CiCalendarDate />} />
                {options.consumingFor &&
                <SearchSelect options={options.consumingFor} name="consumingFor" label="consuming for" formik={formik} logo={<CiCalendarDate />} />
                }
                {options.exitDelivery &&
                <SearchSelect options={options.exitDelivery} name="exitDelivery" label="exit delivery" formik={formik} logo={<CiCalendarDate />} />
                }
                {options.exitTransferee &&
                <SearchSelect options={options.exitTransferee} name="exitTransferee" label="exit transferee" formik={formik} />
                }
                {options.jobPosition &&
                <SearchSelect options={options.jobPosition} name="jobPosition" label="job position" formik={formik} logo={<CiCalendarDate />} />
                }
                {options.unit &&
                <SearchSelect options={options.unit} name="unit" label="unit" formik={formik} />
                }
                 <button disabled={!formik.isValid} className="py-2 px-4 bg-primary_yellow rounded-sm w-full" type="submit">{formik.isValid ?'Add' : 'please complete all fields'}</button>
                </div>
            </form>
            }
        </div>
     );
}
 
export default Exit;