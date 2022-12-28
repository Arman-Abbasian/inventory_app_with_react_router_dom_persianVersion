import FormInput from "../components/FormInput";
import { HiOutlineShoppingCart  } from "react-icons/hi2";
import { Input } from "postcss";
import Textarea from "../common/Textarea";
import ProductNameFormInput from "../components/ProductNameFormInput";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";


const Inputs = () => {
    const[measurmentUnit,setMeasurmentUnit]=useState(null);
    useEffect(()=>{
        axios.get(`http://localhost:4000/overall`)
        .then(res=>{
            const data=res.data;
            const measurementUnits=data.filter(item=>item.category==="measurmentUnit");
            setMeasurmentUnit(measurementUnits)
        })
        .catch(err=>toast.error(err.message))
    },[])
    return ( 
        <div className="grid xl:grid-cols-2 gap-3 container mx-auto p-2">
            {measurmentUnit &&
            <ProductNameFormInput name="productName" searchSelectOptions={measurmentUnit} label="product name" logo={<HiOutlineShoppingCart  className="w-6 h-6"/>} />}
            <FormInput name="measurmentUnit" label="measurement" logo={<HiOutlineShoppingCart  className="w-6 h-6"/>}/>
            <FormInput name="supplier" label="supplier" logo={<HiOutlineShoppingCart  className="w-6 h-6"/>}/>
            <FormInput name="enterDelivery" label="enter delivery" logo={<HiOutlineShoppingCart  className="w-6 h-6"/>}/>
            <FormInput name="enterTransferee" label="transferee" logo={<HiOutlineShoppingCart  className="w-6 h-6"/>}/>
            <FormInput name="consumingFor" label="consuming for" logo={<HiOutlineShoppingCart  className="w-6 h-6"/>}/>
            <FormInput name="exitDelivery" label="exit delivery" logo={<HiOutlineShoppingCart  className="w-6 h-6"/>}/>
            <FormInput name="exitTransferee" label="exit transferee" logo={<HiOutlineShoppingCart  className="w-6 h-6"/>}/>
            <FormInput name="jobPosition" label="job position" logo={<HiOutlineShoppingCart  className="w-6 h-6"/>}/>
            <FormInput name="unit" label="unit" logo={<HiOutlineShoppingCart  className="w-6 h-6"/>}/>
        </div>
     );
}
export default Inputs;