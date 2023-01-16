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
        toast.success(`data added successfully`);
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
    customerName: Yup.string().required(`customer name is required`),
    productName: Yup.string().required(`product name is required`),
    partName: Yup.string().required(`part name is required`),
    stageName: Yup.string().required(`stage name is required`),
    RandomWeight: Yup.number().required(`random number is required`),
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
        {isShow ? "hide products form" : "show products form"} input
      </button>
      {customers && products && parts && stages && (
        <form
          onSubmit={formik.handleSubmit}
          className={`${isShow ? "block" : "hidden"}`}
        >
          <div className="flex flex-col gap-4 justify-center items-center border border-primary_green rounded-sm p-2 shadow-[0_10px_20px_rgba(79,_119,_45,_0.5)]">
            <SearchSelect
              name="customerName"
              label="customer name"
              formik={formik}
              logo={
                <HiOutlineShoppingCart className="w-6 h-6 text-primary_cream" />
              }
              options={customers}
            />
            <SearchSelect
              name="productName"
              label="product name"
              formik={formik}
              logo={
                <HiOutlineShoppingCart className="w-6 h-6 text-primary_cream" />
              }
              options={products}
            />
            <SearchSelect
              name="partName"
              label="part name"
              formik={formik}
              logo={
                <HiOutlineShoppingCart className="w-6 h-6 text-primary_cream" />
              }
              options={parts}
            />
            <SearchSelect
              name="stageName"
              label="stage name"
              formik={formik}
              logo={
                <HiOutlineShoppingCart className="w-6 h-6 text-primary_cream" />
              }
              options={stages}
            />
            <Input
              name="RandomWeight"
              label="random weight"
              formik={formik}
              logo={<AiOutlineNumber className="w-6 h-6 text-primary_cream" />}
              type="number"
            />
            <Textarea
              name="information"
              label="information"
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
              {formik.isValid ? "Add" : "please fill necessary fields"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
export default ProductsFormInput;
