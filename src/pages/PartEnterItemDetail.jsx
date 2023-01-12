import { Link, useParams } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const PartEnterItemDetail = () => {
    const [item,setItem]=useState(null);
    const {id}=useParams();
    useEffect(()=>{
        axios.get(`http://localhost:4000/enter/${id}`)
        .then(res=>setItem(res.data))
        .catch(err=>toast.error(err.message))
    },[])
    return ( 
            <>
                {item && 
                    <div className="flex flex-col gap-8 justify-start items-start text-primary_cream">
                    <p><span className="font-bold">product name:</span> {item.productName}</p>
                    <p><span className="font-bold">number:</span> {item.number}</p>
                    <p><span className="font-bold">date:</span> {item.date}</p>
                    <p><span className="font-bold">supplier:</span> {item.supplier}</p>
                    <p><span className="font-bold">delivery:</span> {item.enterDelivery}</p>
                    <p><span className="font-bold">transferee:</span> {item.enterTransferee}</p>
                </div>       
                }     
            </>
     );
}
 
export default PartEnterItemDetail;