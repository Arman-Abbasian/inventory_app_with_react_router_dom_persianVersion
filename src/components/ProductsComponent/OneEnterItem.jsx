import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";

const OneEnterItem = ({productName,number,date}) => {
    return ( 
            <div className="flex items-center gap-2 bg-primary_cream rounded-sm p-2 shadow-md shadow-primary_light_green">
                <div className="flex flex-col gap-2 flex-1">
                        <p><span className="font-bold">نام محصول :</span> {productName}</p>
                        <p><span className="font-bold">تعداد :</span> {number}</p>
                        <p><span className="font-bold">تاریخ ورود :</span> {new Date(date).toLocaleDateString('fa-IR')}</p>
                </div>        
            </div>
     );
}
 
export default OneEnterItem;