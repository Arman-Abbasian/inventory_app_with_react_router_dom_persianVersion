import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import Input from "../common/Input";
import SearchSelect from "../common/SearchSelect";
import {
  HiOutlineShoppingCart,
  HiOutlineInformationCircle,
} from "react-icons/hi2";
import { CiCalendarDate } from "react-icons/ci";
import { AiOutlineNumber } from "react-icons/ai";
import { BsPerson, BsFileEarmarkCode } from "react-icons/bs";

const initialValues = {
  requestCode: "",
  personnel: "",
  jobPosition: "",
  productName: "",
  number: "",
  consumingFor: "",
  supplier: "",
  date: "",
  neededDate: "",
};

const validationSchema = Yup.object({
  requestCode: Yup.string().required("request code is required"),
  personnel: Yup.string().required("applicant is required"),
  jobPosition: Yup.string().required("job position code is required"),
  productName: Yup.string().required("product name code is required"),
  number: Yup.number("the format is not number format").required(
    "number is required"
  ),
  consumingFor: Yup.string().required("consuming for is required"),
  supplier: Yup.string().required("supplier is required"),
  date: Yup.date("the format is not date format").required("data is required"),
  neededDate: Yup.date("the format is not date format").required(
    "eeded data is required"
  ),
});

const PurchaseRequestItemEdit = () => {
  const { id } = useParams();
  console.log(id);
  const [purchaseRequestItem, setPurchaseRequestItem] = useState({
    data: null,
    error: null,
    loading: false,
  });
  const [personnel, setPersonnel] = useState(null);
  const [jobPosition, setJobPosition] = useState(null);
  const [productName, setProductName] = useState(null);
  const [supplier, setSupplier] = useState(null);

  let navigate = useNavigate();
  //   get the data of selected request item
  useEffect(() => {
    setPurchaseRequestItem({ data: null, error: null, loading: true });
    axios
      .get(`http://localhost:4000/purchasingReequests/${id}`)
      .then((res) =>
        setPurchaseRequestItem({ data: res.data, error: null, loading: false })
      )
      .catch((err) => {
        setPurchaseRequestItem({ data: null, error: err, loading: false });
        toast.error(err.message);
      });
  }, []);

  const onSubmit = (values, { resetForm }) => {
    axios
      .put(`http://localhost:4000/purchasingReequests/${id}`, values)
      .then((res) => {
        navigate("/PurchasingRequestList");
        toast.success("ویرایش اطلاعات با موقفیت انجام گردید");
      })
      .catch((err) => toast.error(err.message));
    resetForm();
  };

  //get the applicant list from DB
  useEffect(() => {
    axios
      .get(`http://localhost:4000/overall?category=personnel`)
      .then((res) => setPersonnel(res.data))
      .catch((err) => toast.error(err.message));
  }, []);
  //get the job position list from DB
  useEffect(() => {
    axios
      .get(`http://localhost:4000/overall?category=jobPosition`)
      .then((res) => setJobPosition(res.data))
      .catch((err) => toast.error(err.message));
  }, []);
  //get the supplier list from DB
  useEffect(() => {
    axios
      .get(`http://localhost:4000/overall?category=supplier`)
      .then((res) => setSupplier(res.data))
      .catch((err) => toast.error(err.message));
  }, []);
  //get the product name list from DB
  useEffect(() => {
    axios
      .get(`http://localhost:4000/overall?category=productName`)
      .then((res) => setProductName(res.data))
      .catch((err) => toast.error(err.message));
  }, []);

  const formik = useFormik({
    initialValues: purchaseRequestItem.data,
    onSubmit,
    validationSchema,
    enableReinitialize: true,
    validateOnMount: true,
  });
  console.log(formik.errors);
  return (
    <div className="lg:flex-1">
      {personnel && jobPosition && productName && supplier && (
        <form
          onSubmit={formik.handleSubmit}
          className="container mx-auto max-w-md p-2 "
        >
          <div className="flex flex-col gap-4 justify-center items-center">
            <Input
              name="requestCode"
              label="کد درخواست"
              formik={formik}
              logo={
                <BsFileEarmarkCode className="w-6 h-6 text-primary_cream" />
              }
            />

            <SearchSelect
              options={personnel}
              name="personnel"
              label="درخواست کننده"
              formik={formik}
              logo={<BsPerson className="w-6 h-6 text-primary_cream" />}
            />
            <SearchSelect
              options={jobPosition}
              name="jobPosition"
              label="پست سازمانی"
              formik={formik}
              logo={
                <HiOutlineInformationCircle className="w-6 h-6 text-primary_cream" />
              }
            />
            <SearchSelect
              options={productName}
              name="productName"
              label="نام محصول"
              formik={formik}
              logo={
                <HiOutlineShoppingCart className="w-6 h-6 text-primary_cream" />
              }
            />
            <Input
              type="number"
              label="تعداد"
              name="number"
              formik={formik}
              logo={<AiOutlineNumber className="w-6 h-6 text-primary_cream" />}
            />
            <Input
              label="مورد مصرف"
              name="consumingFor"
              formik={formik}
              logo={
                <HiOutlineInformationCircle className="w-6 h-6 text-primary_cream" />
              }
            />

            <SearchSelect
              options={supplier}
              name="supplier"
              label="تامین کننده"
              formik={formik}
              logo={
                <HiOutlineInformationCircle className="w-6 h-6 text-primary_cream" />
              }
            />
            <Input
              type="date"
              label="تاریخ درخواست"
              name="date"
              formik={formik}
              logo={<CiCalendarDate className="w-6 h-6 text-primary_cream" />}
            />
            <Input
              type="date"
              label="تاریخ مورد نیاز"
              name="neededDate"
              formik={formik}
              logo={<CiCalendarDate className="w-6 h-6 text-primary_cream" />}
            />

            <button
              disabled={!formik.isValid}
              className={`py-2 px-4 bg-primary_cream rounded-sm w-full ${
                !formik.isValid ? "bg-opacity-60" : "bg-opacity-100"
              } `}
              type="submit"
            >
              {formik.isValid
                ? "ویرایش"
                : "لطفا تمامی فیلدهای مورد نیاز را تکمیل نمایید"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PurchaseRequestItemEdit;
