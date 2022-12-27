import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";

const OneEnterItem = ({id,productName,number,date,deleteHandler}) => {
    return ( 
        <div className="flex items-center gap-2 bg-primary_green rounded-sm p-2">
                <div className="flex flex-col gap-2 flex-1">
                    <Link to={`/enter/detail/${id}`}>
                        <p><span className="font-bold">product name:</span> {productName}</p>
                        <p><span className="font-bold">number:</span> {number}</p>
                        <p><span className="font-bold">date:</span> {date}</p>
                    </Link>
                </div>
                <div className="flex justify-center items-center gap-6 md:col-span-2 xl:col-span-3 2xl:col-span-4 md:justify-self-center">
                    <span><Link to={`/enter/${id}`}><CiEdit className="w-6 h-6" /></Link></span>
                    <span onClick={deleteHandler} className="hover:cursor-pointer"><AiOutlineDelete className="w-6 h-6" /></span>
                </div>           
        </div>
     );
}
 
export default OneEnterItem;