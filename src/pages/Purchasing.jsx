import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import SearchSelect from "../common/SearchSelect";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { HiOutlineInformationCircle } from "react-icons/hi";
import Input from "../common/Input";
import { CiCalendarDate } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { AiOutlineNumber } from "react-icons/ai";
import { BsPerson,BsFileEarmarkCode } from "react-icons/bs";

const initialValues = {
  requestCode: "",
  date: "",
  enterDelivery: "",
  number: "",
  unitCost: "",
};

const validationSchema = Yup.object({
  requestCode: Yup.string().required("request code is required"),
  date: Yup.date("the format is not date format").required("تاریخ را وارد نمایید"),
  enterDelivery: Yup.string().required("resposible for purchase is required"),
  number: Yup.number("لطفا داده عددی وارد نمایید").required(
    "تعداد را وارد نمایید"
  ),
  unitCost: Yup.number("لطفا داده عددی وارد نمایید").required(
    "قیمت واحد را وارد نمایید"
  ),
  
});

const Purchasing = () => {
  const [requestCode, setRequestCode] = useState(null);
  const[personnel,setPersonnel]=useState(null)
  let navigate = useNavigate();

  const onSubmit = (values, { resetForm }) => {
    axios
      .post(`http://localhost:4000/purchasing`, {...values,wholeCost:values.number*values.unitCost})
      .then((res) => {
        navigate("/PurchasingCondition");
        toast.success("داده با موقفیت ثبت گردید");
      })
      .catch((err) => toast.error(err.message));
    resetForm();
  };
  
  //get the requst code list from DB
  useEffect(() => {
    axios
      .get(`http://localhost:4000/purchasingReequests`)
      .then((res) => setRequestCode(res.data))
      .catch((err) => toast.error(err.message));
  }, []);
  //get the personnel list from DB
  useEffect(() => {
    axios
      .get(`http://localhost:4000/overall?category=enterDelivery`)
      .then((res) => setPersonnel(res.data))
      .catch((err) => toast.error(err.message));
  }, []);


  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });
  console.log(formik.errors)
  return (
    <div className="lg:flex-1">
      {personnel && requestCode && (
        <form
          onSubmit={formik.handleSubmit}
          className="container mx-auto max-w-md p-2 "
        >
          <div className="flex flex-col gap-4 justify-center items-center">
          <SearchSelect
              options={requestCode}
              name="requestCode"
              label="کد درخواست"
              formik={formik}
              logo={<BsPerson className="w-6 h-6 text-primary_cream" />}
            />
            <Input
              type="date"
              label="تاریخ"
              name="date"
              formik={formik}
              logo={<CiCalendarDate className="w-6 h-6 text-primary_cream" />}
            />

            <SearchSelect
              options={personnel}
              name="enterDelivery"
              label="مسئول خرید"
              formik={formik}
              logo={<BsPerson className="w-6 h-6 text-primary_cream" />}
            />
            
            <Input
              type="number"
              label="تعداد"
              name="number"
              formik={formik}
              logo={<AiOutlineNumber className="w-6 h-6 text-primary_cream" />}
            />
            <Input
              type="number"
              label="قیمت"
              name="unitCost"
              formik={formik}
              logo={<AiOutlineNumber className="w-6 h-6 text-primary_cream" />}
            />
            
       

            <button
              disabled={!formik.isValid}
              className={`py-2 px-4 bg-primary_cream rounded-sm w-full ${!formik.isValid ? 'bg-opacity-60' :'bg-opacity-100'} `}
              type="submit"
            >
              {formik.isValid ? "ثبت" : "لطفا تمامی فیلدهای مورد نیاز را تکمیل نمایید"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Purchasing;

