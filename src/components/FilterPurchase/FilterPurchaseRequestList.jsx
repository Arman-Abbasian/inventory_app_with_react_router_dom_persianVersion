import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const FilterPurchaseRequestList = ({
  changeHandler,
  toggleChangeDateHandler,
  selectedProduct,
  latest,
}) => {
  //make options for 'select options' and 'search select' filters
  //1- overall products
  const [productNames, setProductNames] = useState({
    data: null,
    error: null,
    loading: false,
  });

  // fill the productName state
  useEffect(() => {
    setProductNames({ data: null, error: null, loading: true });
    axios
      .get(`http://localhost:4000/overall?category=productName`)
      .then((res) =>
        setProductNames({ data: res.data, error: null, loading: false })
      )
      .catch((err) => {
        toast.error(err.message);
        setProductNames({
          data: null,
          error: err.message,
          loading: false,
        });
      });
  }, []);
  return (
    <>
      {productNames.data && (
        <div className="grid container mx-auto max-w-md gap-4 w-full">
          {/* make search select for productNames */}
          <div className="flex flex-col items-start justify-center">
            <label
              className="mb-1 text-primary_light_green"
              htmlFor="productName"
            >
              select a products
            </label>
            <input
              placeholder="Search product name..."
              id="productNamee"
              className="w-full bg-transparent p-2 border text-primary_cream rounded focus:outline-none"
              list="productName"
              name="productName"
              onChange={(e) => changeHandler(e)}
              value={selectedProduct}
            />
            <datalist id="productName">
              <option value="" className="bg-primary_yellow">
                All
              </option>
              {productNames.data.map((item) => (
                <option
                  key={item.id}
                  value={item.productName}
                  className="bg-primary_cream"
                >
                  {item.productName}
                </option>
              ))}
            </datalist>
          </div>

          {/* ascending or descending based on date */}
          <div>
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
      )}
    </>
  );
};

export default FilterPurchaseRequestList;
