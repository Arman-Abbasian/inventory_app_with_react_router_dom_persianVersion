import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineFilter } from "react-icons/ai";

const conditon = [
  { id: 1, conditon: "", name: "All"},
  { id: 2, conditon: "ok", name: "ok", color: "green-500" },
  { id: 3, conditon: "warning", name: "warning", color: "yellow-500" },
  { id: 4, conditon: "danger", name: "danger", color: "red-500" },
];

const FilterInventory = ({ filters, changeHandler }) => {
  const [productNameOptions, setProductNameOptions] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/overall?category=productName`)
      .then((res) => {
        const data = res.data;
        console.log(data);
        const productNames = data.map((item) => {
          return { id: item.id, productName: item.productName };
        });
        console.log(productNames);
        setProductNameOptions(productNames);
      })
      .catch((err) => toast.error(err.message));
  }, []);
  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full relative lg:flex-row">
      {productNameOptions && (
        <div className="lg:w-2/4 w-full">
          <div className="border rounded-sm focus:border-2 flex items-center w-full p-2 gap-2">
            <span>
              <AiOutlineFilter className="text-primary_cream" />
            </span>
            <input
              placeholder="search product name"
              list="productName"
              name="productName"
              className="w-full bg-transparent outline-none text-primary_cream"
              value={filters.productName}
              onChange={(e) => changeHandler(e)}
            />
          </div>
          <datalist id="productName">
            {productNameOptions.map((item) => {
              return (
                <option key={item.id} value={item.productName}>
                  {item.productName}
                </option>
              );
            })}
          </datalist>
        </div>
      )}
      {/* radio button */}
      <div className="flex justify-center gap-4 w-full lg:w-2/4">
        <div className="flex gap-2 items-center w-full">
          {conditon.map((item) => (
            <div key={item.id}
              className={`p-2 border flex justify-center items-center gap-3 rounded-sm flex-1 ${`border-${item.color}`}`}
            >
              <input
                className="form-radio w-5 h-5"
                type="radio"
                name="condition"
                id={item.id}
                value={item.conditon}
                onChange={(e) => changeHandler(e)}
              />
              <label htmlFor={item.id} className={`${`text-${item.color}`}`}>
                {item.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterInventory;
