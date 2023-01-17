import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const PurchasingRequestList = () => {
  const [allPurchasingRequests, setAllPurchasingRequest] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/purchasingReequests`)
      .then(res=>setAllPurchasingRequest(res.data))
      .catch((err) => toast.error(err.message));
  }, []);
 
  return( <div>
    {allPurchasingRequests && 
     allPurchasingRequests.map(item=>(
      <p>{item.requestCode}</p>
     ))    
    }
      
    
  </div>
  )
  
};

export default PurchasingRequestList;
