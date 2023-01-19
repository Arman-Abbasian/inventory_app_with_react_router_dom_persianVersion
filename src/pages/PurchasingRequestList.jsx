import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import FilterPurchaseRequestList from "../components/FilterPurchase/FilterPurchaseRequestList";
import OnePurchaseItem from "../components/PurchaseComponent/OnePurchaseItem ";

const PurchasingRequestList = () => {
  const [allPurchasingRequests, setAllPurchasingRequest] = useState({
    data: null,
    error: null,
    loading: false,
  });
  const [showAllPurchasingRequests, setShowAllPurchasingRequests] =
    useState(null);
  const [sum, setSum] = useState(0);

  const [filters, setFilters] = useState({
    productName: "",
    latest: true,
  });
  useEffect(() => {
    setAllPurchasingRequest({ data: null, error: null, loading: true });
    axios
      .get(`http://localhost:4000/purchasingReequests`)
      .then((res) =>
        setAllPurchasingRequest({ data: res.data, error: null, loading: false })
      )
      .catch((err) => {
        setAllPurchasingRequest({
          data: null,
          error: err.message,
          loading: false,
        });
        toast.error(err.message);
      });
  }, []);
  useEffect(() => {
    if (allPurchasingRequests.data) {
      let show = [...allPurchasingRequests.data];
      show = filterWithAllPurchasingRequests(show);
      show = sortDate(show);
      setShowAllPurchasingRequests(show);
      //calculate sum
      const summ = show.reduce(
        (accumulator, currentValue) => accumulator + currentValue.number,
        0
      );
      setSum(summ);
      console.log(summ);
    }
  }, [filters, allPurchasingRequests.data]);

  const changeHandler = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  const toggleChangeDateHandler = (e) => {
    console.log(e.target.checked);
    setFilters({ ...filters, latest: e.target.checked });
  };
  function filterWithAllPurchasingRequests(arr) {
    if (filters.productName === "") {
      return arr;
    } else {
      arr = arr.filter((item) => item.productName === filters.productName);
      return arr;
    }
  }
  function sortDate(arr) {
    if (filters.latest) {
      arr.sort(function (a, b) {
        const date1 = new Date(a.date);
        const date2 = new Date(b.date);
        return date2 - date1;
      });
    } else {
      arr.sort(function (a, b) {
        const date1 = new Date(a.date);
        const date2 = new Date(b.date);
        return date1 - date2;
      });
    }
    return arr;
  }
  const deleteHandler = (id) => {
    axios
      .delete(`http://localhost:4000/purchasingReequests/${id}`)
      .then((res) => {
        axios.get(`http://localhost:4000/purchasingReequests`).then((res) =>
          setAllPurchasingRequest({
            data: res.data,
            error: null,
            loading: false,
          })
        );
        toast.success("data deleted successfully");
      })
      .catch((err) => toast.error(err.message));
  };
  return (
    <div className="lg:flex-1">
      <FilterPurchaseRequestList
        changeHandler={changeHandler}
        toggleChangeDateHandler={toggleChangeDateHandler}
        selectedProduct={filters.productName}
        latest={filters.latest}
      />
      <p className="bg-primary_light_green inline-block p-2 rounded mb-10 mt-10 shadow-sm shadow-primary_cream">
        sum: {sum}
      </p>
      <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
        {showAllPurchasingRequests &&
          showAllPurchasingRequests.map((item) => (
            <OnePurchaseItem
              productName={item.productName}
              number={item.number}
              date={item.date}
              id={item.id}
              deleteHandler={deleteHandler}
            />
          ))}
      </div>
    </div>
  );
};

export default PurchasingRequestList;
