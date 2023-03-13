import FormInput from "../components/PartsComponent/FormInput";
import {
  HiOutlineShoppingCart,
  HiOutlineInformationCircle,
} from "react-icons/hi2";
import ProductNameFormInput from "../components/PartsComponent/PartNameFormInput";
import { RiStore2Line } from "react-icons/ri";
import { HiBuildingOffice } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { BsSpeedometer2, BsPerson } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";

const PartInputs = () => {
  const [measurmentUnit, setMeasurmentUnit] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/overall`)
      .then((res) => {
        const data = res.data;
        const measurementUnits = data.filter(
          (item) => item.category === "measurmentUnit"
        );
        setMeasurmentUnit(measurementUnits);
      })
      .catch((err) => toast.error(err.message));
  }, []);
  return (
    <div className="grid gap-3 container mx-auto p-2 lg:flex-1">
      {measurmentUnit && (
        <ProductNameFormInput
          name="productName"
          searchSelectOptions={measurmentUnit}
          label="قطعات"
          logo={
            <HiOutlineShoppingCart className="w-6 h-6 text-primary_cream" />
          }
        />
      )}
      <FormInput
        name="measurmentUnit"
        label="واحد اندازه گیری"
        textareaLabel="توضیحات"
        logo={<BsSpeedometer2 className="w-6 h-6 text-primary_cream" />}
      />
      <FormInput
        name="supplier"
        label="تامین کننده"
        textareaLabel="توضیحات"
        logo={<RiStore2Line className="w-6 h-6 text-primary_cream" />}
      />
      <FormInput
        name="enterDelivery"
        label="تحویل دهنده ورودی"
        textareaLabel="توضیحات"
        logo={<BsPerson className="w-6 h-6 text-primary_cream" />}
      />
      <FormInput
        name="enterTransferee"
        label="تحویل گیرنده ورودی"
        textareaLabel="توضیحات"
        logo={<BsPerson className="w-6 h-6 text-primary_cream" />}
      />
      <FormInput
        name="consumingFor"
        label="مورد مصرف"
        textareaLabel="توضیحات"
        logo={
          <HiOutlineInformationCircle className="w-6 h-6 text-primary_cream" />
        }
      />
      <FormInput
        name="exitDelivery"
        label="تحویل دهنده خروجی"
        textareaLabel="توضیحات"
        logo={<BsPerson className="w-6 h-6 text-primary_cream" />}
      />
      <FormInput
        name="exitTransferee"
        label="تحویل گیرنده خروجی"
        textareaLabel="توضیحات"
        logo={<BsPerson className="w-6 h-6 text-primary_cream" />}
      />
      <FormInput
        name="personnel"
        label="نام پرسنل"
        textareaLabel="توضیحات"
        logo={<BsPerson className="w-6 h-6 text-primary_cream" />}
      />
      <FormInput
        name="jobPosition"
        label="پست سازمانی"
        textareaLabel="توضیحات"
        logo={<BsPerson className="w-6 h-6 text-primary_cream" />}
      />
      <FormInput
        name="unit"
        label="واحد سازمانی"
        textareaLabel="توضیحات"
        logo={<HiBuildingOffice className="w-6 h-6 text-primary_cream" />}
      />
    </div>
  );
};
export default PartInputs;
