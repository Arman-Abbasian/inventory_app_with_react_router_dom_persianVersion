import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import FilterProductsEnters from "../components/FiltersProducts/FilterProductsEnters";
import OneEnterItem from "../components/ProductsComponent/OneEnterItem";

const EnterProductsList = () => {
  const [enterProductsList, setEnterProductsList] = useState({
    data: null,
    error: null,
    loading: false,
  });
  const [showProducts, setShowProducts] = useState(null);
  const [sum, setSum] = useState(0);

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
    arr = arr.filter(
      (item) => item.palleteNumber.toString() === filters.pallete
    );
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
    if (enterProductsList.data) {
      let show = [...enterProductsList.data];
      console.log(show);
      show = filterWithWhole(show);
      show = filterWithPallete(show);
      show = sortDate(show);
      setShowProducts(show);
      //calculate sum
      const summ = show.reduce(
        (accumulator, currentValue) => accumulator + currentValue.productNumber,
        0
      );
      setSum(summ);
      console.log(summ);
    }
  }, [filters, enterProductsList.data]);

  const changeHandler = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  const toggleChangeDateHandler = (e) => {
    console.log(e.target.checked);
    setFilters({ ...filters, latest: e.target.checked });
  };

  // fill the enterProductsList state
  useEffect(() => {
    setEnterProductsList({ data: null, error: null, loading: true });
    axios
      .get(`http://localhost:4000/allEnterProducts`)
      .then((res) =>
        setEnterProductsList({ data: res.data, error: null, loading: false })
      )
      .catch((err) => {
        toast.error(err.message);
        setEnterProductsList({
          data: null,
          error: err.message,
          loading: false,
        });
      });
  }, []);

  return (
    <div className="lg:flex-1">
      {showProducts && (
        <>
          <FilterProductsEnters
            changeHandler={changeHandler}
            toggleChangeDateHandler={toggleChangeDateHandler}
            selectedProduct={filters.whole}
            selectedPallete={filters.pallete}
            latest={filters.latest}
          />
          <p className="bg-primary_light_green inline-block p-2 rounded mb-10 mt-10 shadow-sm shadow-primary_cream">
            sum: {sum}
          </p>
          <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
            {showProducts &&
              showProducts.map((item) => (
                <OneEnterItem
                  key={item.id}
                  productName={item.whole}
                  number={item.productNumber}
                  date={item.date}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default EnterProductsList;
