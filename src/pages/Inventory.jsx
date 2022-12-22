import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import OneInventoryItem from "../components/OneInventoryItem";

const Inventory = () => {
    const [productNames,setProductNames]=useState({data:null,error:null,loading:false});
    const [enters,setEnters]=useState({data:null,error:null,loading:false});
    const [exits,setExits]=useState({data:null,error:null,loading:false});
    const [whole,setWhole]=useState(null);
    const [allproductNames,setAllProductNames]=useState(null);
    //1- fill 3 state at first with data from DB
    useEffect(()=>{
        getOverallFromDB();
        getEnterFromDB();
        getExitFromDB()
    },[]);
    //2- fill the all produtName based on existence data in 'enters.data' state and not existennce data in allproductsName state(forbid from fill rendering)
    if(enters.data && !allproductNames){
         getUniqueEnterProductName()
    };          
    //2- fill the all whole state based on existence allproductNames  and not existennce data in whole state(forbid from fill rendering)
    if(allproductNames && !whole){
        setWholeItems()
    }
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
    }
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
    }
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
        //get unique enter Product Name
        function getUniqueEnterProductName(){
            const allProductNames= enters.data.map(item=>{
               return  item.productName
             });
             setAllProductNames(allProductNames);
             let uniqueProductNames = [];
             allProductNames.forEach((element) => {
             if (!uniqueProductNames.includes(element)) {
                 uniqueProductNames.push(element);
             }
             });
             setAllProductNames(uniqueProductNames) 
     };
    //make one whole object
        function setWholeItems(){
        let init=[]
        allproductNames.map(item=>{
            console.log(item)
            const measurment=enters.data.find(element=>element.productName===item).measurmentUnit;
            const safetyStock=productNames.data.find(element=>element.productName===item).safetyStock;
            const orderPoint=productNames.data.find(element=>element.productName===item).orderPoint;
            const enterItems=enters.data.filter(element=>element.productName===item);
            const sumEnters = enterItems.reduce((accumulator, currentValue) => accumulator + currentValue.number,0);
            const exitItems=exits.data.filter(element=>element.productName===item);
            const sumExits = exitItems.reduce((accumulator, currentValue) => accumulator + currentValue.number,0);
            console.log(enterItems, sumExits);
            init.push({productName:item,measurmentUnit:measurment, numberOfEnter:sumEnters,numberOfExit:sumExits,safetyStock:safetyStock,orderPoint:orderPoint})
        });
        setWhole(init)
};
    return ( 
        <div className="flex flex-col gap-y-4">
            {whole && 
            whole.map(item=>(
                <OneInventoryItem key={item.productName} productName={item.productName} enter={item.numberOfEnter} exit={item.numberOfExit} safetyStock={item.safetyStock} orderPoint={item.orderPoint} />
            ))
            }
        </div>
     );
}
export default Inventory;