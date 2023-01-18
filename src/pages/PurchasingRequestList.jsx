import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import OnePurchaseItem from "../components/PurchaseComponent/OnePurchaseItem ";

const PurchasingRequestList = () => {
  const [allPurchasingRequests, setAllPurchasingRequest] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/purchasingReequests`)
      .then((res) => setAllPurchasingRequest(res.data))
      .catch((err) => toast.error(err.message));
  }, []);

  return (
    <div>
      {allPurchasingRequests &&
        allPurchasingRequests.map((item) => (
          <Link to={`/PurchasingRequestList/${item.id}`} key={item.id}>
            <OnePurchaseItem
              productName={item.productName}
              number={item.number}
              date={item.date}
            />
          </Link>
        ))}
    </div>
  );
};

export default PurchasingRequestList;
