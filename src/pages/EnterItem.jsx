import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

const EnterItem = () => {
    const [item,setItem]=useState({data:null,error:null,loading:false});
    const {id}=useParams();
    console.log(id);
    useEffect(()=>{
        setItem({data:null,error:null,loading:true})
        axios.get(`http://localhost:4000/enter/${id}`)
        .then(res=>setItem({data:res.data,error:null,loading:false}))
        .catch(err=>{
            setItem({data:null,error:err.message,loading:false});
            toast.error(err.message)
        })
    },[])
    return ( 
        <div>
            {item.data &&
            <p>{item.data.id}</p>
            
            
            }
        </div>
     );
}
 
export default EnterItem;