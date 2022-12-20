import { data } from "autoprefixer";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

const EnterList = () => {
    const [enterList,setEnterList]=useState({data:null,error:null,loading:false});
    useEffect(()=>{
      async  function getEnterList(){
        setEnterList({data:null,error:null,loading:true})
        try {
        const {data}= await axios.get(`http://localhost:4000/enter`) 
        setEnterList({data:data,error:null,loading:false})
        } catch (err) {
            setEnterList({data:null,error:err.message,loading:false})
          toast.error(err.message)  
        }
        };
        getEnterList();
    },[]);
    console.log(enterList)
    return ( 
        <div className="flex flex-col gap-y-4">
            {enterList.data && 
            enterList.data.map(item=>(
                <div key={item.id} className="flex justify-center items-center gap-2 bg-primary_green rounded-sm p-2">
                    <div className="grid grid-cols md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 justify-items-start">
                        <p><span className="text-primary_black font-bold">product name:</span> {item.productName}</p>
                        <p><span className="text-primary_black font-bold">product specification:</span> {item.productSpecification}</p>
                        <p><span className="text-primary_black font-bold">number:</span> {item.number}</p>
                        <p><span className="text-primary_black font-bold">measurement unit:</span> {item.measurmentUnit}</p>
                        <p><span className="text-primary_black font-bold">date:</span> {item.date}</p>
                        <p><span className="text-primary_black font-bold">supplier:</span> {item.supplier}</p>
                        <p><span className="text-primary_black font-bold">delivery:</span> {item.enterDelivery}</p>
                        <p><span className="text-primary_black font-bold">transferee:</span> {item.enterTransferee}</p>
                        <div className="flex justify-center items-center gap-6 md:col-span-2 xl:col-span-3 2xl:col-span-4 md:justify-self-center">
                        <span><Link to={`/enter/${item.id}`}><CiEdit className="w-6 h-6" /></Link></span>
                        <span className="hover:cursor-pointer"><AiOutlineDelete className="w-6 h-6" /></span>
                    </div>
                    </div>            
                </div>
            ))
            }
        </div>
     );
}
 
export default EnterList;