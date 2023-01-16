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
            <div className="flex flex-col gap-8 items-start">
                <p className="text-primary_cream"><span className="font-bold">product name:</span> {productName}</p>
                <p className="text-primary_cream"><span className="font-bold">measurement unit:</span> {measurmentUnit}</p>
                <p className="text-primary_cream"><span className="font-bold">enter:</span> {enter}</p>
                <p className="text-primary_cream"><span className="font-bold">exit:</span> {exit}</p>
                <p className="text-primary_cream"><span className="font-bold">inventory:</span> {enter - exit}</p>
                <p className="text-primary_cream"><span className="font-bold">safety stock:</span> {safetyStock}</p>
                <p className="text-primary_cream"><span className="font-bold">order point :</span> {orderPoint}</p>
            </div>            
    }
    </> 
     );
}
export default OneInventoryItem;