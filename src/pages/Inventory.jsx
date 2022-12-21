import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getDataFromDB } from "../common/getDataFromDB";
import OneEnterItem from "../components/OneEnterItem";
import OneInventoryItem from "../components/OneInventoryItem";

const Inventory = () => {
    const [productNames,setProductNames]=useState({data:null,error:null,loading:false});
    const [enters,setEnters]=useState({data:null,error:null,loading:false});
    const [exits,setExits]=useState({data:null,error:null,loading:false});
    const [whole,setWhole]=useState([
        {id:"",poroductName:"",numberOfEnter:"",numberOfExit:"",safetyStock:0,orederPoint:0}
    ]);
    
    useEffect(()=>{
        getOverallFromDB();
        getEnterFromDB();
        getExitFromDB()
    },[]);

    async function getOverallFromDB(){
        setProductNames({data:null,error:null,loading:true})
        try {
        const {data}= await axios.get(`http://localhost:4000/overall?category=productName`) 
        setProductNames({data:data,error:null,loading:false})
        } catch (err) {
            setProductNames({data:null,error:err.message,loading:false})
          toast.error(err.message)  
        }
    }
    async function getEnterFromDB(){
        setEnters({data:null,error:null,loading:true})
        try {
        const {data}= await axios.get(`http://localhost:4000/enter`) 
        setEnters({data:data,error:null,loading:false})
        } catch (err) {
            setEnters({data:null,error:err.message,loading:false})
          toast.error(err.message)  
        }
    }
    async function getExitFromDB(){
        setExits({data:null,error:null,loading:true})
        try {
        const {data}= await axios.get(`http://localhost:4000/exit`) 
        setExits({data:data,error:null,loading:false})
        } catch (err) {
            setExits({data:null,error:err.message,loading:false})
          toast.error(err.message)  
        }
    }
    if(productNames.data && enters.data){
        productNames.data.map(item=>{
            const d=enters.data.filter(element=>element.productName===item.productName);
            const sumEnters = d.reduce((accumulator, currentValue) => accumulator + currentValue.number,0);
            console.log(sumEnters)
        })
    }
    return ( 
        <div className="flex flex-col gap-y-4">
            {/* {productNames.data  && enters.data && exits.data && 
            productNames.data.map(item=>(
                <OneInventoryItem productName={item.productName} enter={'dd'} exit={'dd'} safetyStock={'dd'} orderPoint={'dd'} />
            ))
            } */}
        </div>
     );
}
export default Inventory;