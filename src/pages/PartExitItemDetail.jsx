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
                <p><span className="font-bold">product name : </span> {item.productName}</p>
                <p><span className="font-bold">number : </span> {item.number}</p>
                <p><span className="font-bold">measurement unit : </span> {item.measurmentUnit}</p>
                <p><span className="font-bold">date : </span> {item.date}</p>
                <p><span className="font-bold">consuming for : </span> {item.consumingFor}</p>
                <p><span className="font-bold">exit delivery : </span> {item.exitDelivery}</p>
                <p><span className="font-bold">exit transferee : </span> {item.exitTransferee}</p>
                <p><span className="font-bold">job position : </span> {item.jobPosition}</p>
                <p><span className="font-bold">unit : </span>{item.unit}</p>
            </div>  
            }          
        </>
     );
}
 
export default PartExitItemDetail;