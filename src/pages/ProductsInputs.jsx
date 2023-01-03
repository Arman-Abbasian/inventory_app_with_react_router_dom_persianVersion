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
import ProductsFormInput from "../components/ProductsFormInput";


const ProductsInputs = () => {
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
            <ProductsFormInput name="productName" searchSelectOptions={measurmentUnit} label="product name" logo={<HiOutlineShoppingCart  className="w-6 h-6"/>} />}
            
        </div>
     );
}
export default ProductsInputs;