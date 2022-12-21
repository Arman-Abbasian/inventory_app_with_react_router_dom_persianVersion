import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";

const OneEnterItem = ({id,productName,productSpecification,number,measurmentUnit,date,supplier,enterDelivery,enterTransferee, deleteHandler}) => {
    return ( 
        <div className="flex justify-center items-center gap-2 bg-primary_green rounded-sm p-2">
            <div className="grid grid-cols md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 justify-items-start">
                <p><span className="font-bold">product name:</span> {productName}</p>
                <p><span className="font-bold">product specification:</span> {productSpecification}</p>
                <p><span className="font-bold">number:</span> {number}</p>
                <p><span className="font-bold">measurement unit:</span> {measurmentUnit}</p>
                <p><span className="font-bold">date:</span> {date}</p>
                <p><span className="font-bold">supplier:</span> {supplier}</p>
                <p><span className="font-bold">delivery:</span> {enterDelivery}</p>
                <p><span className="font-bold">transferee:</span> {enterTransferee}</p>
                <div className="flex justify-center items-center gap-6 md:col-span-2 xl:col-span-3 2xl:col-span-4 md:justify-self-center">
                    <span><Link to={`/enter/${id}`}><CiEdit className="w-6 h-6" /></Link></span>
                    <span onClick={()=>deleteHandler(id)} className="hover:cursor-pointer"><AiOutlineDelete className="w-6 h-6" /></span>
                </div>
            </div>            
        </div>
     );
}
 
export default OneEnterItem;