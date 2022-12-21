import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import OneExitItem from "../components/OneExitItem";

const ExitList = () => {
    const [exitList,setExitList]=useState({data:null,error:null,loading:false});
    async  function getExitList(){
        setExitList({data:null,error:null,loading:true})
        try {
        const {data}= await axios.get(`http://localhost:4000/exit`) 
        setExitList({data:data,error:null,loading:false})
        } catch (err) {
            setExitList({data:null,error:err.message,loading:false})
          toast.error(err.message)  
        }
    }
    useEffect(()=>{getExitList()},[]);
    const deleteHandler=(id)=>{
        console.log(id)
        axios.delete(`http://localhost:4000/exit/${id}`)
        .then(res=>{
            toast.success('data removed successfully');
            getExitList();
        })
        .catch(err=>toast.error(err.message))
    }
    console.log('exitList :', exitList.data);
    return ( 
        <div className="flex flex-col gap-y-4">
            {exitList.data && 
            exitList.data.map(item=>(
                <OneExitItem key={item.id} id={item.id}productName={item.productName}
                number={item.number}measurmentUnit={item.measurmentUnit}date={item.date} consumingFor={item.consumingFor}
                exitDelivery={item.exitDelivery} exitTransferee={item.exitTransferee} jobPosition={item.jobPosition} unit={item.unit} deleteHandler={()=>deleteHandler(item.id)} />
            ))
            }
        </div>
     );
} 
export default ExitList;