import FormInput from "../components/FormInput";
import { HiOutlineShoppingCart  } from "react-icons/hi2";


const Inputs = () => {
    return ( 
        <div className="flex flex-col gap-3 container mx-auto max-w-md p-2">
           <FormInput name="productNameInput" label="product name" logo={<HiOutlineShoppingCart  className="w-6 h-6"/>}/>
           <FormInput name="productNameSpecification" label="product specification" logo={<HiOutlineShoppingCart  className="w-6 h-6"/>}/>
           <FormInput name="measurement" label="measurement" logo={<HiOutlineShoppingCart  className="w-6 h-6"/>}/>
           <FormInput name="supplier" label="supplier" logo={<HiOutlineShoppingCart  className="w-6 h-6"/>}/>
           <FormInput name="delivery" label="delivery" logo={<HiOutlineShoppingCart  className="w-6 h-6"/>}/>
           <FormInput name="transferee" label="transferee" logo={<HiOutlineShoppingCart  className="w-6 h-6"/>}/>
        </div>
     );
}
export default Inputs;