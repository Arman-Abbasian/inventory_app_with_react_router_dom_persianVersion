import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import * as Yup from 'yup';
import SearchSelect from "../common/SearchSelect";
import SelectOptions from "../common/SelectOptions";
import Input from "../common/Input";
import { CiCalendarDate } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";


const ExitItem = () => {
    const options={productName:[],productSpecification:[],measurmentUnit:[],consumingFor:[],exitDelivery:[],exitTransferee:[],jobPosition:[],unit:[]};
    const [exitItem,setExitItem]=useState({data:null,error:null,loading:false});
    const [overall,setOverall]=useState(null);
    const {id}=useParams();
    let navigate = useNavigate();
    console.log(id);
    console.log(exitItem.data)
    const initialValues={productName:"",productSpecification:"",measurmentUnit:"",date:"",number:"",consumingFor:"",exitDelivery:"",exitTransferee:"",jobPosition:"",unit:""}
    const onSubmit=(values,{resetForm})=>{
        axios.put(`http://localhost:4000/exit/${id}`,values)
        .then(res=>{
            navigate("/ExitList")
            toast.success("data changed successfully")
        })
        .catch(err=>toast.error(err.message));
        resetForm();
    }
    const validationSchema=Yup.object({
        productName:Yup.string().required('product name is required'),
        productSpecification:Yup.string().required('product Specification is required'),
        measurmentUnit:Yup.string().required('measurement Unit is required'),
        date: Yup.date("the format is not date format").required("data is required"),
        number:Yup.number("the format is not number format").required('number is required'),
        consumingFor:Yup.string().required('consumig for is required'),
        exitDelivery:Yup.string().required("delivery is required"),
        exitTransferee:Yup.string().required("transferee is required"),
        jobPosition:Yup.string().required("job position is required"),
        unit:Yup.string().required("unit is required"),
    });
    useEffect(()=>{
        setExitItem({data:null,error:null,loading:true})
        axios.get(`http://localhost:4000/exit/${id}`)
        .then(res=>{
            setExitItem({data:res.data,error:null,loading:false});   
        })
        .catch(err=>{
            setExitItem({data:null,error:err.message,loading:false});
            toast.error(err.message)
        })
    },[]);
    useEffect(()=>{
        axios.get(`http://localhost:4000/overall`)
        .then(res=>{
         setOverall(res.data)
        })
        .catch(err=>toast.error(err.message))
     },[]);

    function fillOptions(){
        options.productName= overall.filter(item=>item.category==="productName");
        options.productSpecification= overall.filter(item=>item.category==="productSpecification");
        options.measurmentUnit= overall.filter(item=>item.category==="measurmentUnit");
        options.supplier= overall.filter(item=>item.category==="consumingFor");
        options.exitDelivery= overall.filter(item=>item.category==="exitDelivery");
        options.exitTransferee= overall.filter(item=>item.category==="exitTransferee");
        options.jobPosition= overall.filter(item=>item.category==="jobPosition");
        options.unit= overall.filter(item=>item.category==="unit");
        console.log(options)
    };
    if(overall) {
        fillOptions()
    }
    const formik=useFormik({initialValues:exitItem.data,onSubmit,validationSchema,validateOnMount:true,enableReinitialize:true});
    
    console.log(options)
    return ( 
        <div>
            <div>
            {overall && 
                <form onSubmit={formik.handleSubmit} className="container mx-auto max-w-md p-2 ">
                    <div className="flex flex-col gap-4 justify-center items-center">
                            
                        {options.productName &&
                        <SearchSelect options={options.productName} name="productName" formik={formik} logo={<CiCalendarDate />} />
                        }
                        {options.productSpecification &&
                        <SearchSelect options={options.productSpecification} name="productSpecification" formik={formik} logo={<CiCalendarDate />} />
                        }
                        {options.measurmentUnit &&
                        <SelectOptions options={options.measurmentUnit} name="measurmentUnit" formik={formik} logo={<CiCalendarDate />} />
                        }
                        <Input type="date" name="date" label="date" formik={formik} logo={<CiCalendarDate />} />     
                        <Input type="number" label="number" name="number" formik={formik} logo={<CiCalendarDate />} />
                        {options.consumingFor &&
                        <SearchSelect options={options.consumingFor} name="consumingFor" formik={formik} logo={<CiCalendarDate />} />
                        }
                        {options.exitDelivery &&
                        <SearchSelect options={options.exitDelivery} name="exitDelivery" formik={formik} logo={<CiCalendarDate />} />
                        }
                        {options.exitTransferee &&
                        <SearchSelect options={options.exitTransferee} name="exitTransferee" formik={formik} />
                        }
                        {options.jobPosition &&
                        <SearchSelect options={options.jobPosition} name="jobPosition" formik={formik} logo={<CiCalendarDate />} />
                        }
                        {options.unit &&
                        <SearchSelect options={options.unit} name="unit" formik={formik} />
                        }
                        <button disabled={!formik.isValid} className="py-2 px-4 bg-primary_green rounded-sm w-full" type="submit">{formik.isValid ?'Add' : 'please complete all fields'}</button>
                    </div>
                </form>
            }
        </div>
        </div>
     );

            }
 
export default ExitItem;