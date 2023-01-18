import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import OnePurchaseItemDetail from "../components/PurchaseComponent/OnePurchaseItemDetail";

const PurchasingItemDetail = () => {
  const { id } = useParams();
  const [purchaseItem, setPurchaseItem] = useState({
    data: null,
    error: null,
    loading: false,
  });
  useEffect(() => {
    axios
      .get(`http://localhost:4000/purchasingReequests/${id}`)
      .then((res) =>
        setPurchaseItem({ data: res.data, error: null, loading: false })
      )
      .catch((err) => {
        setPurchaseItem({ data: null, error: err.message, loading: false });
        toast.error(err.message);
      });
  }, []);

  if (purchaseItem.loading) return <p>loading...</p>;
  if (!purchaseItem.loading && purchaseItem.data && !purchaseItem.error)
    return (
      <OnePurchaseItemDetail
        requestCode={purchaseItem.data.requestCode}
        personnel={purchaseItem.data.personnel}
        jobPosition={purchaseItem.data.jobPosition}
        productName={purchaseItem.data.productName}
        number={purchaseItem.data.number}
        consumingFor={purchaseItem.data.consumingFor}
        supplier={purchaseItem.data.supplier}
        date={purchaseItem.data.date}
        neededDate={purchaseItem.data.neededDate}
      />
    );
};

export default PurchasingItemDetail;
