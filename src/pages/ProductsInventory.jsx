import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import OneProduct from "../components/ProductsComponent/OneProduct";

const ProductsInventory = () => {
    const [exitItems,setExitItems]=useState(null);
    const [enterItems,setEnterItems]=useState(null);
    const [overallItem,setOverallItems]=useState(null);
    const [items,setItems]=useState(null);
    useEffect(()=>{
        axios.get(`http://localhost:4000/exitProducts`)
        .then(res=>setExitItems(res.data))
        .catch(err=>toast.error(err.message))
    },[]);
    useEffect(()=>{
        axios.get(`http://localhost:4000/enterProducts`)
        .then(res=>setEnterItems(res.data))
        .catch(err=>toast.error(err.message))
    },[]);
    useEffect(()=>{
        axios.get(`http://localhost:4000/overallProucts`)
        .then(res=>setOverallItems(res.data))
        .catch(err=>toast.error(err.message))
    },[]);
    if(exitItems && enterItems && overallItem && !items){
        overallItem.map(item=>{
            const enters=enterItems.filter(element=>element.whole===item.whole);
            const enterNumbers=enters.reduce(
                (acc, curr) => acc.weight + curr.weight,0);
        })
    }

    return (
        <div className="lg:flex-1">
            {/* <FilterEnters filters={filters} changeHandler={changeHandler} toggleChangeHandler={toggleChangeHandler}/> */}
            <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
                {overallItem && 
                overallItem.map(item=>(
                    <OneProduct key={item.id} id={item.id} customerName={item.customerName} productName={item.productName}
                     partName={item.partName} stageName={item.stageName} whole={item.whole}/>
                ))
                }
            </div>
        </div> 
     );
}
 
export default ProductsInventory;