import FormInput from "../components/FormInput";
import { HiOutlineShoppingCart,HiOutlineInformationCircle  } from "react-icons/hi2";
import ProductNameFormInput from "../components/ProductNameFormInput";
import { RiStore2Line } from "react-icons/ri";
import { HiBuildingOffice } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { BsSpeedometer2 , BsPerson} from "react-icons/bs";
import { GrUserWorker } from "react-icons/gr";
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
        <div className="grid gap-3 container mx-auto p-2 lg:flex-1">
            {measurmentUnit &&
            <ProductNameFormInput name="productName" searchSelectOptions={measurmentUnit} label="product name" logo={<HiOutlineShoppingCart  className="w-6 h-6"/>} />}
            <FormInput name="measurmentUnit" label="measurement unit" logo={<BsSpeedometer2  className="w-6 h-6"/>}/>
            <FormInput name="supplier" label="supplier" logo={<RiStore2Line  className="w-6 h-6"/>}/>
            <FormInput name="enterDelivery" label="enter delivery" logo={<BsPerson  className="w-6 h-6"/>}/>
            <FormInput name="enterTransferee" label="enter transferee" logo={<BsPerson  className="w-6 h-6"/>}/>
            <FormInput name="consumingFor" label="consuming for" logo={<HiOutlineInformationCircle  className="w-6 h-6"/>}/>
            <FormInput name="exitDelivery" label="exit delivery" logo={<BsPerson  className="w-6 h-6"/>}/>
            <FormInput name="exitTransferee" label="exit transferee" logo={<BsPerson  className="w-6 h-6"/>}/>
            <FormInput name="jobPosition" label="job position" logo={<GrUserWorker  className="w-6 h-6"/>}/>
            <FormInput name="unit" label="unit" logo={<HiBuildingOffice  className="w-6 h-6"/>}/>
        </div>
     );
}
export default Inputs;