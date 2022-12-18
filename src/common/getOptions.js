import axios from "axios";
import { toast } from "react-hot-toast";

export function getOptions(setOptions,options,item){
    axios.get(`http://localhost:4000/${item}`)
    .then(res=>setOptions({...options,[item]:res.data}))
    .catch(err=>toast.error(err.message))
}