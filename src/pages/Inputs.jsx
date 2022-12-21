import FormInput from "../components/FormInput";
import { HiOutlineShoppingCart  } from "react-icons/hi2";
import { Input } from "postcss";
import Textarea from "../common/Textarea";
import ProductNameFormInput from "../components/ProductNameFormInput";


const Inputs = () => {
    return ( 
        <div className="flex flex-col gap-3 container mx-auto max-w-md p-2">
            <ProductNameFormInput name="productName" label="product name" logo={<HiOutlineShoppingCart  className="w-6 h-6"/>} />
            <FormInput name="measurmentUnit" label="measurement" logo={<HiOutlineShoppingCart  className="w-6 h-6"/>}/>
            <FormInput name="supplier" label="supplier" logo={<HiOutlineShoppingCart  className="w-6 h-6"/>}/>
            <FormInput name="enterDelivery" label="enter delivery" logo={<HiOutlineShoppingCart  className="w-6 h-6"/>}/>
            <FormInput name="enterTransferee" label="transferee" logo={<HiOutlineShoppingCart  className="w-6 h-6"/>}/>
            <FormInput name="consumingFor" label="consuming for" logo={<HiOutlineShoppingCart  className="w-6 h-6"/>}/>
            <FormInput name="exitDelivery" label="exit delivery" logo={<HiOutlineShoppingCart  className="w-6 h-6"/>}/>
            <FormInput name="exitTransferee" label="exit transferee" logo={<HiOutlineShoppingCart  className="w-6 h-6"/>}/>
            <FormInput name="jobPosition" label="job position" logo={<HiOutlineShoppingCart  className="w-6 h-6"/>}/>
            <FormInput name="unit" label="unit" logo={<HiOutlineShoppingCart  className="w-6 h-6"/>}/>
        </div>
     );
}
export default Inputs;