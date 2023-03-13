import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

const PartExitItemDetail = () => {
    const [item,setItem]=useState(null);
    const {id}=useParams();
    useEffect(()=>{
        axios.get(`http://localhost:4000/exit/${id}`)
        .then(res=>setItem(res.data))
        .catch(err=>toast.error(err.message))
    },[])
    return ( 
        <>
        {item &&
            <div className="flex flex-col gap-8 justify-start items-start text-primary_cream">
                <p><span className="font-bold">نام قطعه : </span> {item.productName}</p>
                <p><span className="font-bold">تعداد : </span> {item.number}</p>
                <p><span className="font-bold">تاریخ : </span> {new Date(item.date).toLocaleDateString('fa-IR')}</p>
                <p><span className="font-bold">مورد مصرف : </span> {item.consumingFor}</p>
                <p><span className="font-bold">تحویل دهنده : </span> {item.exitDelivery}</p>
                <p><span className="font-bold">تحویل گیرنده : </span> {item.exitTransferee}</p>
            </div>  
            }          
        </>
     );
}
 
export default PartExitItemDetail;