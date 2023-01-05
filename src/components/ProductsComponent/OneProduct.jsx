import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";

const OneProduct = ({id,customerName,productName,partName,stageName,whole}) => {
    return ( 
            <div className="flex items-center gap-2 bg-primary_yellow rounded-sm p-2">
                <div className="flex flex-col gap-2 flex-1">
                    <Link to={`/enter/detail/${id}`}>
                        <p><span className="font-bold">customer name:</span> {customerName}</p>
                        <p><span className="font-bold">product name:</span> {productName}</p>
                        <p><span className="font-bold">part name:</span> {partName}</p>
                        <p><span className="font-bold">stage name:</span> {stageName}</p>
                        <p className="hidden"><span className="font-bold">whole name:</span> {whole}</p>
                    </Link>
                </div>         
            </div>
     );
}
 
export default OneProduct;