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
                <p className="text-primary_cream"><span className="font-bold">نام قطعه :</span> {productName}</p>
                <p className="text-primary_cream"><span className="font-bold">واحد اندازه گیری :</span> {measurmentUnit}</p>
                <p className="text-primary_cream"><span className="font-bold">ورودی :</span> {enter}</p>
                <p className="text-primary_cream"><span className="font-bold">خروجی :</span> {exit}</p>
                <p className="text-primary_cream"><span className="font-bold">موجودی :</span> {enter - exit}</p>
                <p className="text-primary_cream"><span className="font-bold">موجودی اطمینان :</span> {safetyStock}</p>
                <p className="text-primary_cream"><span className="font-bold">نقطه سفارش :</span> {orderPoint}</p>
            </div>            
    }
    </> 
     );
}
export default OneInventoryItem;