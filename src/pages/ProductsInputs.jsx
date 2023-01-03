import { HiOutlineShoppingCart  } from "react-icons/hi2";
import ProductsFormInput from "../components/ProductsFormInputt/ProductsFormInput";
import PalleteFormInput from "../components/ProductsFormInputt/PalleteFormInput";


const ProductsInputs = () => {
    return ( 
        <div className="grid gap-3 container mx-auto p-2 lg:flex-1">
            <ProductsFormInput name="productName"  label="product name" logo={<HiOutlineShoppingCart  className="w-6 h-6"/>} />
            <PalleteFormInput />
            
        </div>
     );
}
export default ProductsInputs;