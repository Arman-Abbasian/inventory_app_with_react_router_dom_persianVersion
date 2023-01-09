import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import FilterProductsInventory from "../components/Filters/FilterInventory";
import OneProduct from "../components/ProductsComponent/OneProduct";

const ProductsInventory = () => {
  const [enterProducts, setEnterProducts] = useState(null);
  const [overallProducts, setOverallProucts] = useState(null);
  const [products, setProducts] = useState(null);
  const [productInventoryFilter,setProductInventoryFilter]=useState({customer:"",product:"",part:"",stage:"",all:true})


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
      <FilterProductsInventory productInventoryFilter={productInventoryFilter} setProductInventoryFilter={setProductInventoryFilter} />
      <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
        {products &&
          products.map((item) => (
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
