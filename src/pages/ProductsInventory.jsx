import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import FilterProductsInventory from "../components/FiltersProducts/FilterProductsInventory";
import OneProduct from "../components/ProductsComponent/OneProduct";

const ProductsInventory = () => {
  const [enterProducts, setEnterProducts] = useState(null);
  const [overallProducts, setOverallProucts] = useState(null);
  const [products, setProducts] = useState(null);
  const [showProducts, setShowProducts] = useState(null);
  const [productInventoryFilter, setProductInventoryFilter] = useState({
    customer: "",
    product: "",
    part: "",
    stage: "",
    all: true,
  });
  function filterWithCustomer(arr) {
    if (productInventoryFilter.customer === "") {
      return arr;
    } else {
      arr = arr.filter(
        (item) => item.customerName === productInventoryFilter.customer
      );
      return arr;
    }
  }
  function filterWithProduct(arr) {
    if (productInventoryFilter.product === "") {
      return arr;
    } else {
      arr = arr.filter(
        (item) => item.productName === productInventoryFilter.product
      );
      return arr;
    }
  }
  function filterWithPart(arr) {
    if (productInventoryFilter.part === "") {
      return arr;
    } else {
      arr = arr.filter((item) => item.partName === productInventoryFilter.part);
      return arr;
    }
  }

  function filterWithStage(arr) {
    if (productInventoryFilter.stage === "") {
      return arr;
    } else {
      arr = arr.filter(
        (item) => item.stageName === productInventoryFilter.stage
      );
      return arr;
    }
  }
  function filterWihtExistance(arr) {
    if (productInventoryFilter.all) return arr;
    arr = arr.filter((item) => item.inventory > 0);
    return arr;
  }
  const toggleChangeExistanceHandler = (e) => {
    const { checked } = e.target;
    console.log(checked);
    setProductInventoryFilter({ ...productInventoryFilter, all: checked });
  };

  useEffect(() => {
    if (products) {
      let show = [...products];
      show = filterWithCustomer(show);
      show = filterWithProduct(show);
      show = filterWithPart(show);
      show = filterWithStage(show);
      show=filterWihtExistance(show)
      setShowProducts(show);
    }
  }, [productInventoryFilter, products]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/enterProducts`)
      .then((res) => setEnterProducts(res.data))
      .catch((err) => toast.error(err.message));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/overallProucts`)
      .then((res) => setOverallProucts(res.data))
      .catch((err) => toast.error(err.message));
  }, []);

  if (enterProducts && overallProducts && !products) {
    let arr = [];
    overallProducts.map((item) => {
      const customerName = item.customerName;
      const productName = item.productName;
      const partName = item.partName;
      const stageName = item.stageName;
      const whole = item.whole;
      const entersOfItem = enterProducts.filter(
        (element) => element.whole === item.whole
      );
      const inventory = entersOfItem.reduce(
        (acc, curr) => acc + curr.productNumber,
        0
      );
      arr.push({
        customerName,
        productName,
        partName,
        stageName,
        whole,
        inventory,
      });
    });
    setProducts(arr);
  }

  return (
    <div className="lg:flex-1">
      <FilterProductsInventory
        productInventoryFilter={productInventoryFilter}
        setProductInventoryFilter={setProductInventoryFilter}
        all={productInventoryFilter.all}
        toggleChangeExistanceHandler={toggleChangeExistanceHandler}
      />
      <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
        {showProducts &&
          showProducts.map((item) => (
            <OneProduct
              key={item.whole}
              id={item.whole}
              customerName={item.customerName}
              productName={item.productName}
              partName={item.partName}
              stageName={item.stageName}
              inventory={item.inventory}
            />
          ))}
      </div>
    </div>
  );
};

export default ProductsInventory;
