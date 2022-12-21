import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import OneEnterItem from "../components/OneEnterItem";

const EnterList = () => {
    const [enterList,setEnterList]=useState({data:null,error:null,loading:false});
    async  function getEnterList(){
        setEnterList({data:null,error:null,loading:true})
        try {
        const {data}= await axios.get(`http://localhost:4000/enter`) 
        setEnterList({data:data,error:null,loading:false})
        } catch (err) {
            setEnterList({data:null,error:err.message,loading:false})
          toast.error(err.message)  
        }
    }
    useEffect(()=>{getEnterList()},[]);
    const deleteHandler=(id)=>{
        axios.delete(`http://localhost:4000/enter/${id}`)
        .then(res=>{
            toast.success('data removed successfully');
            getEnterList();
        })
        .catch(err=>toast.error(err.message))
    }
    console.log(enterList)
    return ( 
        <div className="flex flex-col gap-y-4">
            {enterList.data && 
            enterList.data.map(item=>(
                <OneEnterItem key={item.id} id={item.id}productName={item.productName}
                number={item.number}measurmentUnit={item.measurmentUnit}date={item.date}supplier={item.supplier}
                enterDelivery={item.enterDelivery}enterTransferee={item.enterTransferee} deleteHandler={()=>deleteHandler(item.id)} />
            ))
            }
        </div>
     );
}
 
export default EnterList;