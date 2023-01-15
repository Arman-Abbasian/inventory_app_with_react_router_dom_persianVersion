import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import SearchSelect from "../common/SearchSelect";
import { HiOutlineInformationCircle,HiOutlineShoppingCart } from "react-icons/hi";
import { FaRegBuilding } from "react-icons/fa";
import { BsPerson } from "react-icons/bs";
import { AiOutlineNumber } from "react-icons/ai";
import { CiCalendarDate } from "react-icons/ci";
import Input from "../common/Input";
import { useNavigate, useParams } from "react-router-dom";


const PartExitEditInput = () => {
  const options = {
    productName: [],
    consumingFor: [],
    exitDelivery: [],
    exitTransferee: [],
    jobPosition: [],
    unit: [],
  };
  const [exitItem, setExitItem] = useState({
    data: null,
    error: null,
    loading: false,
  });
  const [overall, setOverall] = useState(null);
  const { id } = useParams();
  let navigate = useNavigate();
  console.log(id);
  console.log(exitItem.data);
  const initialValues = {
    productName: "",
    date: "",
    number: "",
    consumingFor: "",
    exitDelivery: "",
    exitTransferee: "",
    jobPosition: "",
    unit: "",
  };
  const onSubmit = (values, { resetForm }) => {
    axios
      .put(`http://localhost:4000/exit/${id}`, values)
      .then((res) => {
        navigate("/PartExitList");
        toast.success("data changed successfully");
      })
      .catch((err) => toast.error(err.message));
    resetForm();
  };
  const validationSchema = Yup.object({
    productName: Yup.string().required("product name is required"),
    date: Yup.date("the format is not date format").required(
      "data is required"
    ),
    number: Yup.number("the format is not number format").required(
      "number is required"
    ),
    consumingFor: Yup.string().required("consumig for is required"),
    exitDelivery: Yup.string().required("delivery is required"),
    exitTransferee: Yup.string().required("transferee is required"),
    jobPosition: Yup.string().required("job position is required"),
    unit: Yup.string().required("unit is required"),
  });
  useEffect(() => {
    setExitItem({ data: null, error: null, loading: true });
    axios
      .get(`http://localhost:4000/exit/${id}`)
      .then((res) => {
        setExitItem({ data: res.data, error: null, loading: false });
        axios.get(`http://localhost:4000/overall`).then((res) => {
          setOverall(res.data);
        });
      })
      .catch((err) => {
        setExitItem({ data: null, error: err.message, loading: false });
        toast.error(err.message);
      });
  }, []);

  function fillOptions() {
    options.productName = overall.filter(
      (item) => item.category === "productName"
    );
    options.consumingFor = overall.filter(
      (item) => item.category === "consumingFor"
    );
    options.exitDelivery = overall.filter(
      (item) => item.category === "exitDelivery"
    );
    options.exitTransferee = overall.filter(
      (item) => item.category === "exitTransferee"
    );
    options.jobPosition = overall.filter(
      (item) => item.category === "jobPosition"
    );
    options.unit = overall.filter((item) => item.category === "unit");
    console.log(options);
  }
  if (overall) {
    fillOptions();
  }

  const formik = useFormik({
    initialValues: exitItem.data,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });

  console.log(options);
  return (
    <div className="lg:flex-1">
      {overall && (
        <form
          onSubmit={formik.handleSubmit}
          className="container mx-auto max-w-md p-2 "
        >
          <div className="flex flex-col gap-4 justify-center items-center">
            {options.productName && (
              <SearchSelect
                options={options.productName}
                label="product name"
                name="productName"
                formik={formik}
                logo={<HiOutlineShoppingCart className="w-6 h-6 text-primary_cream" />}
              />
            )}
            <Input
              type="date"
              name="date"
              label="date"
              formik={formik}
              logo={<CiCalendarDate className="w-6 h-6 text-primary_cream" />}
            />
            <Input
              type="number"
              label="number"
              name="number"
              formik={formik}
              logo={<AiOutlineNumber className="w-6 h-6 text-primary_cream" />}
            />
            {options.consumingFor && (
              <SearchSelect
                options={options.consumingFor}
                label="consuming for"
                name="consumingFor"
                formik={formik}
                logo={<HiOutlineInformationCircle className="w-6 h-6 text-primary_cream" />}
              />
            )}
            {options.exitDelivery && (
              <SearchSelect
                options={options.exitDelivery}
                label="delivery"
                name="exitDelivery"
                formik={formik}
                logo={<BsPerson className="w-6 h-6 text-primary_cream" />}
              />
            )}
            {options.exitTransferee && (
              <SearchSelect
                options={options.exitTransferee}
                label="transferee"
                name="exitTransferee"
                formik={formik}
                logo={<BsPerson className="w-6 h-6 text-primary_cream" />}
              />
            )}
            {options.jobPosition && (
              <SearchSelect
                options={options.jobPosition}
                label="job position"
                name="jobPosition"
                formik={formik}
                logo={<HiOutlineInformationCircle className="w-6 h-6 text-primary_cream" />}
              />
            )}
            {options.unit && (
              <SearchSelect
                options={options.unit}
                label="unit"
                name="unit"
                formik={formik}
                logo={<FaRegBuilding className="w-6 h-6 text-primary_cream" />}
              />
            )}
            <button
              disabled={!formik.isValid}
              className={`py-2 px-4 bg-primary_cream rounded-sm w-full ${
                !formik.isValid ? "bg-opacity-60" : ""
              }`}
              type="submit"
            >
              {formik.isValid ? "Edit" : "please complete all fields"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PartExitEditInput;
