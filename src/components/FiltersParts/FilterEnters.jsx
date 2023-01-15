import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineFilter } from "react-icons/ai";

const FilterEnters = ({filters,changeHandler,toggleChangeHandler}) => {
    
    const [options,setOptions]=useState({productNames:null,supplier:null,enterDelivery:null,enterTransferee:null});
    const [showFilterSection,setShowFilterSection]=useState(false);
    //make productNames options
   if(!options.productNames){
        axios.get(`http://localhost:4000/overall?category=productName`)
        .then(res=>{
            const data=res.data;
            const productNames=data.map(item=>{
                return {id:item.id,productName:item.productName}
            });
            setOptions({...options,productNames:productNames})
        })
        .catch(err=>toast.error(err.message))
    }
    //make supplier options
    if(!options.supplier){
        axios.get(`http://localhost:4000/overall?category=supplier`)
        .then(res=>{
            const data=res.data;
            const supplier=data.map(item=>{
                return {id:item.id,supplier:item.supplier}
            });
            setOptions({...options,supplier:supplier})
        })
        .catch(err=>toast.error(err.message))
     }
    //make enterDelivery options
    if(!options.enterDelivery){
        axios.get(`http://localhost:4000/overall?category=enterDelivery`)
        .then(res=>{
            const data=res.data;
            const enterDelivery=data.map(item=>{
                return {id:item.id,enterDelivery:item.enterDelivery}
            });
            setOptions({...options,enterDelivery:enterDelivery})
        })
        .catch(err=>toast.error(err.message))
    }
     //make enterTransferee options
     if(!options.enterTransferee){
        axios.get(`http://localhost:4000/overall?category=enterTransferee`)
        .then(res=>{
            const data=res.data;
            const enterTransferee=data.map(item=>{
                return {id:item.id,enterTransferee:item.enterTransferee}
            });
            setOptions({...options,enterTransferee:enterTransferee})
        })
        .catch(err=>toast.error(err.message))
     }
    return ( 
        <div className="mb-10">
        <button className="w-full p-2 rounded-sm bg-primary_cream mb-4 shadow-md shadow-primary_light_green" onClick={()=>setShowFilterSection(! showFilterSection)}>{showFilterSection ?'hide filter section':'show filter section'}</button> 
            {options.productNames && options.supplier && options.enterDelivery && options.enterTransferee &&
            <div className={`sm:grid-cols-2 gap-8  w-full relative ${showFilterSection ?'grid':'hidden'}`}> 
            {/* make product name options */} 
                    <>
                        <div className="border rounded-sm focus:border-2 flex items-center w-full p-2 gap-2" >
                            <span><AiOutlineFilter className="w-6 h-6 text-primary_cream" /></span>
                            <input placeholder="search product name" list="productNamee" name="productName"  className="w-full bg-transparent outline-none text-primary_cream" value={filters.productName} onChange={(e)=>changeHandler(e)} />
                        </div>
                        <datalist id="productNamee">
                            {options.productNames.map(item=>{
                                return <option key={item.id} value={item.productName}>{item.productName}</option>
                            })}
                        </datalist>  
                    </>
          

            {/* make supplier options */}
                <>
                    <div className="border rounded-sm focus:border-2 flex items-center w-full p-2 gap-2" >
                        <span><AiOutlineFilter className="w-6 h-6 text-primary_cream" /></span>
                        <input placeholder="search supplier name" list="supplierr" name="supplier"  className="w-full bg-transparent outline-none text-primary_cream" value={filters.supplier} onChange={(e)=>changeHandler(e)} />
                    </div>
                    <datalist id="supplierr">
                        {options.supplier.map(item=>{
                            return <option key={item.id} value={item.supplier}>{item.supplier}</option>
                        })}
                    </datalist>  
                </> 

            {/* make enter delivery options */}
                <>
                    <div className="border rounded-sm focus:border-2 flex items-center w-full p-2 gap-2">
                        <span><AiOutlineFilter className="w-6 h-6 text-primary_cream" /></span>
                        <input placeholder="search delivery name" list="enterDeliveryy" name="enterDelivery"  className="w-full bg-transparent outline-none text-primary_cream" value={filters.enterDelivery} onChange={(e)=>changeHandler(e)} />
                    </div>
                    <datalist id="enterDeliveryy">
                        {options.enterDelivery.map(item=>{
                            return <option key={item.id} value={item.enterDelivery}>{item.enterDelivery}</option>
                        })}
                    </datalist>  
                </> 

                <>
                    <div className="border rounded-sm focus:border-2 flex items-center w-full p-2 gap-2" >
                        <span><AiOutlineFilter className="w-6 h-6 text-primary_cream" /></span>
                        <input placeholder="search transferee name" list="enterTransfereee" name="enterTransferee"  className="w-full bg-transparent outline-none text-primary_cream" value={filters.enterTransferee} onChange={(e)=>changeHandler(e)} />
                    </div>
                    <datalist id="enterTransfereee">
                        {options.enterTransferee.map(item=>{
                            return <option key={item.id} value={item.enterTransferee}>{item.enterTransferee}</option>
                        })}
                    </datalist>  
                </> 
                {/* ascending or descending based on date */}
                <div className="w-full">
                    <label className="inline-flex relative items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" name="latest" checked={filters.latest} onChange={(e)=>toggleChangeHandler(e)} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none
                        rounded-md peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                        after:bg-white after:border-gray-300 after:border after:rounded-md after:h-5 after:w-5  after:transition-all  peer-checked:bg-primary_light_green"></div>
                        <span className="ml-3 text-sm font-medium text-primary-white">{filters.latest ? 'latest':'earliest'}</span>
                    </label>
                </div>
            </div> 
                
                }
            </div>
                
 
    
     );
}
 
export default FilterEnters;