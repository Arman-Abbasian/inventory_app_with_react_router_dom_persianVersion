import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import PartInventory from "../../pages/PartInventory";

const OneProduct = ({
  id,
  customerName,
  productName,
  partName,
  stageName,
  whole,
  inventory,
}) => {
  return (
    <div
      className={`flex items-center gap-2 bg-primary_cream rounded-sm p-2 shadow-md shadow-primary_light_green ${
        inventory > 0
          ? "border-r-8 border-green-500"
          : "border-r-8 border-red-500"
      }`}
    >
      <div className="flex flex-col gap-2 flex-1">
        <p>
          <span className="font-bold">نام مشتری :</span> {customerName}
        </p>
        <p>
          <span className="font-bold">نام محصول :</span> {productName}
        </p>
        <p>
          <span className="font-bold">نام اجزا :</span> {partName}
        </p>
        <p>
          <span className="font-bold">نام مرحله :</span> {stageName}
        </p>
        <p>
          <span className="font-bold">موجودی:</span> {inventory}
        </p>
        <p className="hidden">
          <span className="font-bold">whole name:</span> {whole}
        </p>
      </div>
    </div>
  );
};

export default OneProduct;
