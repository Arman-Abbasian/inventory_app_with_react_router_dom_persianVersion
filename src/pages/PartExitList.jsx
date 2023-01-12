import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import FilterExits from "../components/FiltersParts/FilterExits";
import OneExitItem from "../components/PartsComponent/OneExitItem";

const PartExitList = () => {
    const [exitList,setExitList]=useState({data:null,error:null,loading:false});
    const [showdExitList,setShowedExitList]=useState(null);
    const [filters,setFilters]=useState({latest:true,productName:"",consumingFor:"",exitDelivery:"",jobPosition:"",unit:""});

    async  function getExitList(){
        setExitList({data:null,error:null,loading:true})
        try {
        const {data}= await axios.get(`http://localhost:4000/exit`) 
        setExitList({data:data,error:null,loading:false})
        } catch (err) {
            setExitList({data:null,error:err.message,loading:false})
          toast.error(err.message)  
        }
    };
    const changeHandler=(e)=>{
        const {name,value}=e.target;
        setFilters({...filters,[name]:value})
    };
    const toggleChangeHandler=(e)=>{
        const {name,checked}=e.target;
        console.log(checked)
        setFilters({...filters,[name]:checked})
    };
    useEffect(()=>{getExitList()},[]);
    useEffect(()=>{
        if(exitList.data){
        let val=[...exitList.data];
        val=includeProductNameFilter(val)
        val=includeConsumingForFilter(val)
        val=includeExitDeliveryFilter(val)
        val=includeJobPositionFilter(val)
        val=includeUnitFilter(val)
        val=sortDate(val)
        setShowedExitList(val)
        }
    },[filters,exitList.data])
    const deleteHandler=(id)=>{
        console.log(id)
        axios.delete(`http://localhost:4000/exit/${id}`)
        .then(res=>{
            toast.success('data removed successfully');
            getExitList();
        })
        .catch(err=>toast.error(err.message))
    };
    function includeProductNameFilter(array){
        array=array.filter(item=>item.productName.toLowerCase().includes(filters.productName.toLowerCase()));
        return array;
    };
    function includeConsumingForFilter(array){
        array=array.filter(item=>item.consumingFor.toLowerCase().includes(filters.consumingFor.toLowerCase()));
        return array;
    };
    function includeExitDeliveryFilter(array){
        array=array.filter(item=>item.exitDelivery.toLowerCase().includes(filters.exitDelivery.toLowerCase()));
        return array;
    };
    function includeJobPositionFilter(array){
        array=array.filter(item=>item.jobPosition.toLowerCase().includes(filters.jobPosition.toLowerCase()));
        return array;
    };
    function includeUnitFilter(array){
        array=array.filter(item=>item.unit.toLowerCase().includes(filters.unit.toLowerCase()));
        return array;
    };
    function sortDate(array){
        if(filters.latest){
            array.sort(function(a, b){
                const date1 = new Date(a.date)
                const date2 = new Date(b.date);
                return date2 - date1;
            });
        }else{
            array.sort(function(a, b){
                const date1 = new Date(a.date)
                const date2 = new Date(b.date);
                return date1 - date2;
            });
        }
        return array;
    };
    if(showdExitList){sortDate(showdExitList)}
    return ( 
        <div className="flex flex-col gap-y-4 lg:flex-1">
            <FilterExits filters={filters} changeHandler={changeHandler} toggleChangeHandler={toggleChangeHandler}/>
            <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
            {showdExitList && 
            showdExitList.map(item=>(
                <OneExitItem key={item.id} id={item.id} productName={item.productName}
                number={item.number}measurmentUnit={item.measurmentUnit}date={item.date} consumingFor={item.consumingFor}
                exitDelivery={item.exitDelivery} exitTransferee={item.exitTransferee} jobPosition={item.jobPosition} unit={item.unit} deleteHandler={()=>deleteHandler(item.id)} />
            ))
            }
            </div>
        </div>
     );
} 
export default PartExitList;