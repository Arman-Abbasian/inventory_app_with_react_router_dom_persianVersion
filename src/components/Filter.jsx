import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {HiOutlineInformationCircle } from "react-icons/hi2";


const conditon=[
    {id:1,conditon:"ok",color:'border-green-500'},
    {id:2,conditon:"warning",color:'border-yellow-500'},
    {id:3,conditon:"danger",color:'border-red-500'},
]

const Filter = ({filters,changeHandler}) => {
    const [productNameOptions,setProductNameOptions]=useState(null)
    useEffect(()=>{
        axios.get(`http://localhost:4000/overall?category=productName`)
        .then(res=>{
            const data=res.data;
            console.log(data)
            const productNames=data.map(item=>{
                return {"id":item.id,"productName":item.productName}
            });
            console.log(productNames)
            setProductNameOptions(productNames)
        })
        .catch(err=>toast.error(err.message))
    },[]);
    return ( 
        <div className="flex flex-col gap-2 justify-center items-center w-full relative">
            {productNameOptions && 
            <>
            <div className="border rounded-sm focus:border-2 flex items-center w-full p-2 gap-2" >
            <span><HiOutlineInformationCircle /></span>
            <input placeholder="search product name" list="productName" name="productName"  className="w-full bg-transparent outline-none" value={filters.productName} onChange={(e)=>changeHandler(e)} />
        </div>
        <datalist id="productName">
            {productNameOptions.map(item=>{
                return <option key={item.id} value={item.productName}>{item.productName}</option>
            })}
        </datalist>  
        </>
    }
            {/* radio button */}
            <div className="flex justify-center gap-6 w-full">
          
             <div className="flex gap-2 justify-between items-center" >
                    {conditon.map(item=>(
                        <>
                            <input className="form-radio w-5 h-5" type="radio" name="condition" id={item.id} value={item.conditon}  onChange={(e)=>changeHandler(e)} />
                            <label htmlFor={item.id}>{item.conditon}</label>
                        </>
                    ))}
            </div>
        </div>     
    </div>       
     );
}
 
export default Filter;