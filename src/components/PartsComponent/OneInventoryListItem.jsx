import { useEffect, useState } from "react";

const OneInventoryListItem = ({productName,enter,exit,safetyStock,orderPoint}) => {
    const [condition,setCondition]=useState("");
    useEffect(()=>{
        if((enter - exit)>=orderPoint) setCondition("ok")
        else if((enter - exit)< safetyStock) setCondition("danger")
        else if((enter - exit)< orderPoint) setCondition("warning")
    },[])
    return (
        <>
        {condition && 
        <div className={`flex  items-center gap-2 bg-primary_cream rounded-sm p-2 border-r-8 ${condition==="ok" &&'border-green-500'} 
            ${condition==="warning" &&'border-yellow-500'}  ${condition==="danger" &&'border-red-500'} `}>
            <div className="flex flex-col gap-8 items-start">
                <p><span className="font-bold">product name:</span> {productName}</p>
                <p><span className="font-bold">inventory:</span> {enter - exit}</p>
            </div>            
        </div>
    }
    </> 
     );
}
export default OneInventoryListItem;