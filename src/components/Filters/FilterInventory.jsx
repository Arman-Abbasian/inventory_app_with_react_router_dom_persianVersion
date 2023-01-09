import axios from "axios";
import { useEffect, useState } from "react";

const FilterProductsInventory = ({
  productInventoryFilter,
  setProductInventoryFilter,
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
    <div>
        <div className="">
            <label>select a customer</label>
            <select
                onChange={(e) =>
                setProductInventoryFilter({
                    ...productInventoryFilter,
                    customer: e.target.value,
                })
                }
            >
                
                
            <option value="">All</option>
            {customerFilter.map((item) => (
              <option value={item.customerName}>{item.customerName}</option>
            ))}
          </select>
          </div>

          <div>
          <label>select a product</label>
          <select
            onChange={(e) =>
              setProductInventoryFilter({
                ...productInventoryFilter,
                product: e.target.value,
              })
            }
          >
            <option value="">All</option>
            {productFilter.map((item) => (
              <option value={item.productName}>{item.productName}</option>
            ))}
          </select>
          </div>
          <div>
          <label>select a part</label>
          <select
            onChange={(e) =>
              setProductInventoryFilter({
                ...productInventoryFilter,
                part: e.target.value,
              })
            }
          >
            <option value="">All</option>
            {partFilter.map((item) => (
              <option value={item.partName}>{item.partName}</option>
            ))}
          </select>
          </div>
          <div>
          <label>select a stage</label>
          <select
            onChange={(e) =>
              setProductInventoryFilter({
                ...productInventoryFilter,
                stage: e.target.value,
              })
            }
          >

            <option value="">All</option>
            {stageFilter.map((item) => (
              <option value={item.stageName}>{item.stageName}</option>
            ))}
          </select>
        </div>
      </div>  
      )}; 
      </>  
  );
};

export default FilterProductsInventory;
