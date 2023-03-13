import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../common/Input";
import Textarea from "../../common/Textarea";
import SearchSelect from "../../common/SearchSelect";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  HiOutlineShoppingCart,
  HiOutlineInformationCircle,
} from "react-icons/hi2";
import { AiOutlineNumber } from "react-icons/ai";
const ProductsFormInput = () => {
  const [isShow, setIsShow] = useState(false);
  const [customers, setCustomers] = useState(null);
  const [products, setProducts] = useState(null);
  const [parts, setParts] = useState(null);
  const [stages, setStages] = useState(null);

  const initialValues = {
    name: "products",
    customerName: "",
    productName: "",
    partName: "",
    stageName: "",
    RandomWeight: "",
    information: "",
  };
  const onSubmit = (values, { resetForm }) => {
    axios
      .post(`http://localhost:4000/overallProucts`, {
        ...values,
        whole:
          values.customerName +
          " " +
          values.productName +
          " " +
          values.partName +
          " " +
          values.stageName,
      })
      .then((res) => {
        toast.success(`اطلاعات با موفقیت ثبت شد`);
        setIsShow(false);
      })
      .catch((err) => toast.error(err.message));
    resetForm();
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/customer`)
      .then((res) => setCustomers(res.data))
      .catch((err) => toast.error(err.message));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/product`)
      .then((res) => setProducts(res.data))
      .catch((err) => toast.error(err.message));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/part`)
      .then((res) => setParts(res.data))
      .catch((err) => toast.error(err.message));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/stage`)
      .then((res) => setStages(res.data))
      .catch((err) => toast.error(err.message));
  }, []);

  const validationSchema = Yup.object({
    customerName: Yup.string().required(`لطفا نام مشتری را وارد نمایید`),
    productName: Yup.string().required(`لطفا نام محصول را وارد نمایید`),
    partName: Yup.string().required(`لطفا نام اجزا را وارد نمایید`),
    stageName: Yup.string().required(`لطفا نام مرحله را وارد نمایید`),
    RandomWeight: Yup.number().required(`لطفا وزن رندم را وارد نمایید`),
    information: Yup.string(),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });
  return (
    <div className="flex flex-col gap-3 container mx-auto max-w-md">
      <button
        className={`w-full p-2 rounded-sm bg-primary_cream shadow-[0_10px_20px_rgba(79,_119,_45,_0.5)]`}
        onClick={() => setIsShow(!isShow)}
      >
        {isShow ? "بستن فرم تعریف محصول جدید" : "نمایش فرم تعریف محصول جدید"}
      </button>
      {customers && products && parts && stages && (
        <form
          onSubmit={formik.handleSubmit}
          className={`${isShow ? "block" : "hidden"}`}
        >
          <div className="flex flex-col gap-4 justify-center items-center border border-primary_green rounded-sm p-2 shadow-[0_10px_20px_rgba(79,_119,_45,_0.5)]">
            <SearchSelect
              name="customerName"
              label="نام مشتری"
              formik={formik}
              logo={
                <HiOutlineShoppingCart className="w-6 h-6 text-primary_cream" />
              }
              options={customers}
            />
            <SearchSelect
              name="productName"
              label="نام محصول"
              formik={formik}
              logo={
                <HiOutlineShoppingCart className="w-6 h-6 text-primary_cream" />
              }
              options={products}
            />
            <SearchSelect
              name="partName"
              label="نام اجزا"
              formik={formik}
              logo={
                <HiOutlineShoppingCart className="w-6 h-6 text-primary_cream" />
              }
              options={parts}
            />
            <SearchSelect
              name="stageName"
              label="نام مرحله"
              formik={formik}
              logo={
                <HiOutlineShoppingCart className="w-6 h-6 text-primary_cream" />
              }
              options={stages}
            />
            <Input
              name="RandomWeight"
              label="وزن رندم"
              formik={formik}
              logo={<AiOutlineNumber className="w-6 h-6 text-primary_cream" />}
              type="number"
            />
            <Textarea
              name="information"
              label="توضیحات"
              formik={formik}
              logo={
                <HiOutlineInformationCircle className="w-6 h-6 text-primary_cream" />
              }
            />
            <button
              disabled={!formik.isValid}
              className="py-2 px-4 bg-primary_cream rounded-sm w-full disabled:bg-opacity-60"
              type="submit"
            >
              {formik.isValid ? "ثبت" : "لطفا تمامی فیلدهای مورد نیاز را وارد نمایید"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
export default ProductsFormInput;
