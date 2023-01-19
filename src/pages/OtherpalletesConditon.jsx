import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import SearchSelect from "../common/SearchSelect";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { RiStore2Line } from "react-icons/ri";
import Input from "../common/Input";
import { CiCalendarDate } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { AiOutlineNumber } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";

const OtherPalleteCondition = () => {
  let navigate = useNavigate();
  const initialValues = {
    date: "",
    customerName: "",
    palleteKind: "",
    numberOfEntries: "",
    numberOfExits: "",
  };
  const onSubmit = (values, { resetForm }) => {
    axios
      .post(`http://localhost:4000/PalleteConditonEnter`, values)
      .then((res) => {
        navigate("/EnterList");
        toast.success("data added successfully");
      })
      .catch((err) => toast.error(err.message));
    resetForm();
  };
  const validationSchema = Yup.object({
    date: Yup.date("the format is not date format").required(
      "data is required"
    ),
    customerName: Yup.string().required("customer name is required"),
    palleteKind: Yup.string().required("pallete kind is required"),
    numberOfEntries: Yup.number("the format is not number format").required(
      "number of Entries is required"
    ),
  });
  const [customerName, setCustomerName] = useState(null);
  const [palleteKind, setPalleteKind] = useState(null);
  const options = {
    productName: "",
    palleteKind: "",
    enterDelivery: "",
    enterTransferee: "",
  };
  useEffect(() => {
    axios
      .get(`http://localhost:4000/customer`)
      .then((res) => {
        setCustomerName(res.data);
      })
      .catch((err) => toast.error(err.message));
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/palleteKind`)
      .then((res) => {
        setCustomerName(res.data);
      })
      .catch((err) => toast.error(err.message));
  }, []);

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <div className="lg:flex-1">
      <form
        onSubmit={formik.handleSubmit}
        className="container mx-auto max-w-md p-2 "
      >
        <div className="flex flex-col gap-4 justify-center items-center">
          <Input
            type="date"
            name="date"
            label="date"
            formik={formik}
            logo={<CiCalendarDate className="w-6 h-6 text-primary_cream" />}
          />
          {customerName && (
            <SearchSelect
              options={customerName}
              name="supplier"
              label="supplier"
              formik={formik}
              logo={<RiStore2Line className="w-6 h-6 text-primary_cream" />}
            />
          )}
          {options.enterDelivery && (
            <SearchSelect
              options={options.enterDelivery}
              name="enterDelivery"
              label="enter delivery"
              formik={formik}
              logo={<BsPerson className="w-6 h-6 text-primary_cream" />}
            />
          )}
          <Input
            type="number"
            label="number"
            name="number"
            formik={formik}
            logo={<AiOutlineNumber className="w-6 h-6 text-primary_cream" />}
          />

          {options.enterTransferee && (
            <SearchSelect
              options={options.enterTransferee}
              name="enterTransferee"
              label="enter transferee"
              formik={formik}
              logo={<BsPerson className="w-6 h-6 text-primary_cream" />}
            />
          )}
          <button
            disabled={!formik.isValid}
            className="py-2 px-4 bg-primary_cream rounded-sm w-full"
            type="submit"
          >
            {formik.isValid ? "Add" : "please complete all fields"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OtherPalleteCondition;
