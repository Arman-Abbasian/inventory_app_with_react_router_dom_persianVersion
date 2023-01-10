import axios from "axios";
import { useEffect, useState } from "react";

const FilterProductsInventory = ({
  productInventoryFilter,
  setProductInventoryFilter,
  toggleChangeExistanceHandler,
  all,
}) => {
  const [customerFilter, setCustomerFilter] = useState(null);
  const [productFilter, setProductFilter] = useState(null);
  const [partFilter, setPartFilter] = useState(null);
  const [stageFilter, setStageFilter] = useState(null);

  //fill filter states
  useEffect(() => {
    axios
      .get(`http://localhost:4000/customer`)
      .then((res) => setCustomerFilter(res.data))
      .catch();
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/product`)
      .then((res) => setProductFilter(res.data))
      .catch();
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/part`)
      .then((res) => setPartFilter(res.data))
      .catch();
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/stage`)
      .then((res) => setStageFilter(res.data))
      .catch();
  }, []);

  return (
    <>
      {customerFilter && productFilter && partFilter && stageFilter && (
        <div className="grid sm:grid-cols-2 container mx-auto max-w-lg gap-4">
          <div className="flex flex-col items-start justify-center">
            <label className="mb-1">select a customer</label>
            <select
              className="w-full bg-transparent p-2 border rounded focus:outline-none"
              onChange={(e) =>
                setProductInventoryFilter({
                  ...productInventoryFilter,
                  customer: e.target.value,
                })
              }
            >
              <option value="" className="bg-primary_yellow">
                All
              </option>
              {customerFilter.map((item) => (
                <option className="bg-primary_yellow" value={item.customerName}>
                  {item.customerName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col items-start justify-center">
            <label className="mb-1">select a product</label>
            <select
              className="w-full bg-transparent p-2 border rounded focus:outline-none"
              onChange={(e) =>
                setProductInventoryFilter({
                  ...productInventoryFilter,
                  product: e.target.value,
                })
              }
            >
              <option value="" className="bg-primary_yellow">
                All
              </option>
              {productFilter.map((item) => (
                <option className="bg-primary_yellow" value={item.productName}>
                  {item.productName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col items-start justify-center">
            <label className="mb-1">select a part</label>
            <select
              className="w-full bg-transparent p-2 border rounded focus:outline-none"
              onChange={(e) =>
                setProductInventoryFilter({
                  ...productInventoryFilter,
                  part: e.target.value,
                })
              }
            >
              <option value="" className="bg-primary_yellow">
                All
              </option>
              {partFilter.map((item) => (
                <option className="bg-primary_yellow" value={item.partName}>
                  {item.partName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col items-start justify-center">
            <label className="mb-1">select a stage</label>
            <select
              className="w-full bg-transparent p-2 border rounded focus:outline-none"
              onChange={(e) =>
                setProductInventoryFilter({
                  ...productInventoryFilter,
                  stage: e.target.value,
                })
              }
            >
              <option className="bg-primary_yellow" value="">
                All
              </option>
              {stageFilter.map((item) => (
                <option className="bg-primary_yellow" value={item.stageName}>
                  {item.stageName}
                </option>
              ))}
            </select>
          </div>
          {/* ascending or descending based on date */}
          <div className="w-full">
              <label className="inline-flex relative items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  name="all"
                  checked={all}
                  onChange={(e) => toggleChangeExistanceHandler(e)}
                />
                <div
                  className="w-11 h-6 bg-gray-200 peer-focus:outline-none
                        rounded-md peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                        after:bg-white after:border-gray-300 after:border after:rounded-md after:h-5 after:w-5  after:transition-all  peer-checked:bg-primary_yellow"
                ></div>
                <span className="ml-3 text-sm font-medium text-primary-white">
                  {all ? "all product" : "existed product"}
                </span>
              </label>
            </div>
        </div>
      )}
    </>
  );
};

export default FilterProductsInventory;
