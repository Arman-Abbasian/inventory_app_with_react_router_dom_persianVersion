import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const ProductsEnters = () => {
    const [exitItems,setExitItems]=useState(null);
    const [enterItem,setEnterItems]=useState(null);
    const [overallItem,setOverallItems]=useState(null);
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
    return (
        <div className="lg:flex-1">
            {/* <FilterEnters filters={filters} changeHandler={changeHandler} toggleChangeHandler={toggleChangeHandler}/>
            <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
                {showdEnterList && 
                showdEnterList.map(item=>(
                    <OneEnterItem key={item.id} id={item.id} productName={item.productName} number={item.number} date={item.date} 
                    deleteHandler={()=>deleteHandler(item.id)} />
                ))
                }
            </div> */}
        </div> 
     );
}
 
export default ProductsEnters;