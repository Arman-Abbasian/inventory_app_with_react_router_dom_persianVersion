import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import OneInventoryItem from "../components/OneInventoryItem";

const Inventory = () => {
    const [productNames,setProductNames]=useState({data:null,error:null,loading:false});
    const [enters,setEnters]=useState({data:null,error:null,loading:false});
    const [exits,setExits]=useState({data:null,error:null,loading:false});
    const [whole,setWhole]=useState(null);

    //1- fill 3 state at first with data from DB
    useEffect(()=>{
        getOverallFromDB();
        getEnterFromDB();
        getExitFromDB()
    },[]);

    if(productNames.data && enters.data && exits.data && !whole){
        setWholeItems()
    };
    //get productName item from overall DB
    async function getOverallFromDB(){
        setProductNames({data:null,error:null,loading:true})
        try {
        const {data}= await axios.get(`http://localhost:4000/overall?category=productName`) 
        setProductNames({data:data,error:null,loading:false})
        } catch (err) {
            setProductNames({data:null,error:err.message,loading:false})
            toast.error(err.message)  
        }
    };
    //get enter item from DB
    async function getEnterFromDB(){
        setEnters({data:null,error:null,loading:true})
        try {
        const {data}= await axios.get(`http://localhost:4000/enter`) 
        setEnters({data:data,error:null,loading:false})
        } catch (err) {
            setEnters({data:null,error:err.message,loading:false})
          toast.error(err.message)  
        }
    };
    //get exits item from DB
    async function getExitFromDB(){
        setExits({data:null,error:null,loading:true})
        try {
        const {data}= await axios.get(`http://localhost:4000/exit`) 
        setExits({data:data,error:null,loading:false})
        } catch (err) {
            setExits({data:null,error:err.message,loading:false})
          toast.error(err.message)  
        }
    };
        function setWholeItems(){
        let init=[]
        productNames.data.map(item=>{
            console.log(item.productName)
            const enterItems=enters.data.filter(element=>element.productName===item.productName);
            const sumEnters = enterItems.reduce((accumulator, currentValue) => accumulator + currentValue.number,0) || 0;
            console.log(sumEnters);
            const exitItems=exits.data.filter(element=>element.productName===item.productName);
            const sumExits = exitItems.reduce((accumulator, currentValue) => accumulator + currentValue.number,0) || 0;
            console.log(sumExits)
            init.push({id:item.id,productName:item.productName,measurmentUnit:item.measurmentUnit, numberOfEnter:sumEnters,numberOfExit:sumExits,safetyStock:item.safetyStock,orderPoint:item.orderPoint})
        });
        setWhole(init)
};



    return ( 
        <div className="flex flex-col gap-y-4">
            {whole && 
            whole.map(item=>(
                <OneInventoryItem key={item.id} productName={item.productName} measurmentUnit={item.measurmentUnit} enter={item.numberOfEnter} exit={item.numberOfExit} safetyStock={item.safetyStock} orderPoint={item.orderPoint} />
            ))
            }
        </div>
     );
};
export default Inventory;