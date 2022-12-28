import { useEffect, useState } from "react";

const OneInventoryItem = ({productName,measurmentUnit,enter,exit,safetyStock,orderPoint}) => {
    const [condition,setCondition]=useState("");
    useEffect(()=>{
        if((enter - exit)>=orderPoint) setCondition("ok")
        else if((enter - exit)< safetyStock) setCondition("danger")
        else if((enter - exit)< orderPoint) setCondition("warning")
    },[])
    return (
        <>
        {condition && 
        <div className={`flex justify-center items-center gap-2 bg-primary_yellow rounded-sm p-2 border-r-8 ${condition==="ok" &&'border-green-500'} 
            ${condition==="warning" &&'border-yellow-900'}  ${condition==="danger" &&'border-red-800'} `}>
            <div className="grid grid-cols md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 justify-items-start">
                <p><span className="font-bold">product name:</span> {productName}</p>
                <p><span className="font-bold">measurement unit:</span> {measurmentUnit}</p>
                <p><span className="font-bold">enter:</span> {enter}</p>
                <p><span className="font-bold">exit:</span> {exit}</p>
                <p><span className="font-bold">inventory:</span> {enter - exit}</p>
                <p><span className="font-bold">safety stock:</span> {safetyStock}</p>
                <p><span className="font-bold">order point :</span> {orderPoint}</p>
            </div>            
        </div>
    }
    </> 
     );
}
export default OneInventoryItem;