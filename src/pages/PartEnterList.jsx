import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import FilterEnters from "../components/FiltersParts/FilterEnters";
import OneEnterItem from "../components/PartsComponent/OneEnterItem";

const PartEnterList = () => {
  const [enterList, setEnterList] = useState({
    data: null,
    error: null,
    loading: false,
  });
  const [showdEnterList, setShowedEnterList] = useState(null);
  const [filters, setFilters] = useState({
    latest: true,
    productName: "",
    supplier: "",
    enterDelivery: "",
    enterTransferee: "",
  });
  async function getEnterList() {
    setEnterList({ data: null, error: null, loading: true });
    try {
      const { data } = await axios.get(`http://localhost:4000/enter`);
      setEnterList({ data: data, error: null, loading: false });
    } catch (err) {
      setEnterList({ data: null, error: err.message, loading: false });
      toast.error(err.message);
    }
  }
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };
  const toggleChangeHandler = (e) => {
    const { name, checked } = e.target;
    console.log(checked);
    setFilters({ ...filters, [name]: checked });
  };

  useEffect(() => {
    getEnterList();
  }, []);
  useEffect(() => {
    if (enterList.data) {
      let val = [...enterList.data];
      val = includeProductNameFilter(val);
      val = includeSupplierFilter(val);
      val = includeEnterDeliveryFilter(val);
      val = includeEnterTransfereeFilter(val);
      val = sortDate(val);
      setShowedEnterList(val);
    }
  }, [filters, enterList.data]);
  const deleteHandler = (id) => {
    axios
      .delete(`http://localhost:4000/enter/${id}`)
      .then((res) => {
        toast.success("data removed successfully");
        getEnterList();
      })
      .catch((err) => toast.error(err.message));
  };
  function includeProductNameFilter(array) {
    array = array.filter((item) =>
      item.productName.toLowerCase().includes(filters.productName.toLowerCase())
    );
    return array;
  }
  function includeSupplierFilter(array) {
    array = array.filter((item) =>
      item.supplier.toLowerCase().includes(filters.supplier.toLowerCase())
    );
    return array;
  }
  function includeEnterDeliveryFilter(array) {
    array = array.filter((item) =>
      item.enterDelivery
        .toLowerCase()
        .includes(filters.enterDelivery.toLowerCase())
    );
    return array;
  }
  function includeEnterTransfereeFilter(array) {
    array = array.filter((item) =>
      item.enterTransferee
        .toLowerCase()
        .includes(filters.enterTransferee.toLowerCase())
    );
    return array;
  }
  function sortDate(array) {
    if (filters.latest) {
      array.sort(function (a, b) {
        const date1 = new Date(a.date);
        const date2 = new Date(b.date);
        return date2 - date1;
      });
    } else {
      array.sort(function (a, b) {
        const date1 = new Date(a.date);
        const date2 = new Date(b.date);
        return date1 - date2;
      });
    }
    return array;
  }
  return (
    <div className="lg:flex-1">
      <FilterEnters
        filters={filters}
        changeHandler={changeHandler}
        toggleChangeHandler={toggleChangeHandler}
      />
      <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
        {showdEnterList &&
          showdEnterList.map((item) => (
            <OneEnterItem
              key={item.id}
              id={item.id}
              productName={item.productName}
              number={item.number}
              date={item.date}
              deleteHandler={() => deleteHandler(item.id)}
            />
          ))}
      </div>
    </div>
  );
};

export default PartEnterList;
