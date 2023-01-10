import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import FilterEnters from "../components/FilterEnters";
import FilterProductsExits from "../components/Filters/FilterProductsExits";
import OneExitItem from "../components/ProductsComponent/OneExitItem";

const ExitProductsList = () => {
  //states
  //1- enter products
  const [exitProductsList, setExitProductsList] = useState({
    data: null,
    error: null,
    loading: false,
  });
  const [showProducts, setShowProducts] = useState(null);

  const [filters, setFilters] = useState({
    whole: "",
    pallete: "",
    latest: true,
  });

  function filterWithWhole(arr) {
    if (filters.whole === "") {
      return arr;
    } else {
      arr = arr.filter((item) => item.whole === filters.whole);
      return arr;
    }
  }
  function filterWithPallete(arr) {
    if (filters.pallete === "") return arr;
    arr = arr.filter((item) => item.palleteNumber.toString() === filters.pallete);
    return arr;
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

  useEffect(() => {
    if (exitProductsList.data) {
      let show = [...exitProductsList.data];
      console.log(show)
      show = filterWithWhole(show);
      show = filterWithPallete(show);
      show = sortDate(show);
      setShowProducts(show);
    }
  }, [filters, exitProductsList.data]);

  const changeHandler = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  const toggleChangeDateHandler = (e) => {
    console.log(e.target.checked);
    setFilters({ ...filters, latest: e.target.checked });
  };
  // fill the exitProductsList state
  useEffect(() => {
    setExitProductsList({ data: null, error: null, loading: true });
    axios
      .get(`http://localhost:4000/allExitProducts`)
      .then((res) =>
        setExitProductsList({ data: res.data, error: null, loading: false })
      )
      .catch((err) => {
        toast.error(err.message);
        setExitProductsList({
          data: null,
          error: err.message,
          loading: false,
        });
      });
  }, []);


  return (
    <div className="lg:flex-1">
      <FilterProductsExits
            changeHandler={changeHandler}
            toggleChangeDateHandler={toggleChangeDateHandler}
            selectedProduct={filters.whole}
            selectedPallete={filters.pallete}
            latest={filters.latest}
          />
      <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
        {showProducts &&
          showProducts.map((item) => (
            <OneExitItem
              key={item.id}
              productName={item.whole}
              number={item.productNumber}
              date={item.date}
            />
          ))}
      </div>
    </div>
  );
};

export default ExitProductsList;
