import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const FilterProductsEnters = ({
  changeHandler,
  toggleChangeDateHandler,
  selectedProduct,
  selectedPallete,
  latest,
}) => {
  //make options for 'select options' and 'search select' filters
  //1- overall products
  const [overallProducts, setOverallProducts] = useState({
    data: null,
    error: null,
    loading: false,
  });
  const [palletes, setPalletes] = useState({
    data: null,
    error: null,
    loading: false,
  });

  // fill the overallProducts state
  useEffect(() => {
    setOverallProducts({ data: null, error: null, loading: true });
    axios
      .get(`http://localhost:4000/overallProucts`)
      .then((res) =>
        setOverallProducts({ data: res.data, error: null, loading: false })
      )
      .catch((err) => {
        toast.error(err.message);
        setOverallProducts({
          data: null,
          error: err.message,
          loading: false,
        });
      });
  }, []);

  // fill the palletes state
  useEffect(() => {
    setPalletes({ data: null, error: null, loading: true });
    axios
      .get(`http://localhost:4000/palletes`)
      .then((res) =>
        setPalletes({ data: res.data, error: null, loading: false })
      )
      .catch((err) => {
        toast.error(err.message);
        setPalletes({
          data: null,
          error: err.message,
          loading: false,
        });
      });
  }, []);

  return (
    <>
      <div className="grid sm:grid-cols-2 container mx-auto max-w-2xl gap-4">
        {overallProducts.data && palletes.data && (
          <>
            {/* make search select for products */}
            <div className="flex flex-col items-start justify-center">
              <label className="mb-1 text-primary_light_green" htmlFor="productName">
                select a products
              </label>
              <input
                placeholder="Search.."
                id="productName"
                className="w-full bg-transparent p-2 border text-primary_cream rounded focus:outline-none"
                list="overallProducts"
                name="whole"
                onChange={(e) => changeHandler(e)}
                value={selectedProduct}
              />
              <datalist id="overallProducts">
                <option value="" className="bg-primary_yellow">
                  All
                </option>
                {overallProducts.data.map((item) => (
                  <option
                    key={item.id}
                    value={item.whole}
                    className="bg-primary_yellow"
                  >
                    {item.whole}
                  </option>
                ))}
              </datalist>
            </div>
            {/* make search select for palletes */}
            <div className="flex flex-col items-start justify-center">
              <label className="mb-1 text-primary_light_green" htmlFor="pallete">
                select a pallete number
              </label>
              <input
                type="text"
                className="w-full bg-transparent p-2 border text-primary_cream rounded focus:outline-none"
                placeholder="Search.."
                id="pallete"
                list="palleteNumber"
                name="pallete"
                onChange={(e) => changeHandler(e)}
                value={selectedPallete}
              />
              <datalist id="palleteNumber">
                <option value="" className="bg-primary_yellow">
                  All
                </option>
                {palletes.data.map((item) => (
                  <option
                    key={item.id}
                    value={item.palleteNumber}
                    className="bg-primary_yellow"
                  >
                    {item.palleteNumber}
                  </option>
                ))}
              </datalist>
            </div>
          </>
        )}
        {/* ascending or descending based on date */}
        <div className="w-full">
          <label className="inline-flex relative items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              name="latest"
              checked={latest}
              onChange={(e) => toggleChangeDateHandler(e)}
            />
            <div
              className="w-11 h-6 bg-primary_light_green peer-focus:outline-none
                        rounded-md peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                        after:bg-white after:border-gray-300 after:border after:rounded-md after:h-5 after:w-5  after:transition-all  peer-checked:bg-primary_yellow"
            ></div>
            <span className="ml-3 text-sm font-medium text-primary_cream">
              {latest ? "latest" : "earliest"}
            </span>
          </label>
        </div>
      </div>
    </>
  );
};

export default FilterProductsEnters;
