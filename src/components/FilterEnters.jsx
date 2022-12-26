import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {HiOutlineInformationCircle } from "react-icons/hi2";

const FilterEnters = ({filters,changeHandler}) => {
    
    const [options,setOptions]=useState({productNames:null,supplier:null,delivery:null,transferee:null,});
    //make productNames options
    useEffect(()=>{
        axios.get(`http://localhost:4000/overall?category=productName`)
        .then(res=>{
            const data=res.data;
            const productNames=data.map(item=>{
                return {id:item.id,productName:item.productName}
            });
            setOptions({...options,productNames:productNames})
        })
        .catch(err=>toast.error(err.message))
    },[]);
    //make supplier options
    useEffect(()=>{
        axios.get(`http://localhost:4000/overall?category=supplier`)
        .then(res=>{
            const data=res.data;
            const supplier=data.map(item=>{
                return {id:item.id,supplier:item.supplier}
            });
            setOptions({...options,supplier:supplier})
        })
        .catch(err=>toast.error(err.message))
    },[]);
    //make enterDelivery options
    useEffect(()=>{
        axios.get(`http://localhost:4000/overall?category=enterDelivery`)
        .then(res=>{
            const data=res.data;
            const enterDelivery=data.map(item=>{
                return {id:item.id,enterDelivery:item.enterDelivery}
            });
            setOptions({...options,enterDelivery:enterDelivery})
        })
        .catch(err=>toast.error(err.message))
    },[]);
     //make enterTransferee options
    useEffect(()=>{
        axios.get(`http://localhost:4000/overall?category=enterTransferee`)
        .then(res=>{
            const data=res.data;
            const enterDelivery=data.map(item=>{
                return {id:item.id,enterTransferee:item.enterTransferee}
            });
            setOptions({...options,enterTransferee:enterTransferee})
        })
        .catch(err=>toast.error(err.message))
    },[]);
     useEffect(()=>{
        axios.get(`http://localhost:4000/overall?category=enterDelivery`)
        .then(res=>{
            const data=res.data;
            const enterDelivery=data.map(item=>{
                return {id:item.id,enterDelivery:item.enterDelivery}
            });
            setOptions({...options,enterDelivery:enterDelivery})
        })
        .catch(err=>toast.error(err.message))
    },[]);
    return ( 
        <div className="flex flex-col gap-8 justify-center items-center w-full relative">
            {productNameOptions && 
            <>
            <div className="border rounded-sm focus:border-2 flex items-center w-full p-2 gap-2" >
            <span><HiOutlineInformationCircle /></span>
            <input placeholder="search product name" list="productNamee" name="productName"  className="w-full bg-transparent outline-none" value={filters.productName} onChange={(e)=>changeHandler(e)} />
        </div>
        <datalist id="productNamee">
            {productNameOptions.map(item=>{
                return <option key={item.id} value={item.productName}>{item.productName}</option>
            })}
        </datalist>  
        </>
    }
            {/* radio button */}
            <div className="flex justify-center gap-6 w-full">
          
             <div className="flex gap-2 items-center w-full" >
                    {conditon.map(item=>(
                        <div className="p-2 border border-emerald-600 flex justify-center items-center gap-1 rounded-sm flex-1">
                            <input className="form-radio w-5 h-5" type="radio" name="condition" id={item.id} value={item.conditon}  onChange={(e)=>changeHandler(e)} />
                            <label htmlFor={item.id}>{item.name}</label>
                        </div>
                    ))}
            </div>
        </div>     
    </div>       
     );
}
 
export default FilterEnters;