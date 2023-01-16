import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../common/Input";
import Textarea from "../../common/Textarea";
import SearchSelect from "../../common/SearchSelect";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import RadioButton from "../../common/RadioButton";
import { AiOutlineNumber } from "react-icons/ai";
import { HiOutlineInformationCircle } from "react-icons/hi2";

const colorOptions = [
  {
    id: 1,
    value: "blue",
    color: "blue-500",
    label: "blue",
    borderColor: "border-blue-500",
    textColor: "text-blue-500"
  },
  {
    id: 2,
    value: "red",
    color: "red-500",
    label: "red",
    borderColor: "border-red-500",
    textColor: "text-red-500",
  },
  {
    id: 3,
    value: "yellow",
    color: "yellow-500",
    label: "yellow",
    borderColor: "border-yellow-500",
    textColor: "text-yellow-500",
  },
  {
    id: 4,
    value: "green",
    color: "green-500",
    label: "green",
    borderColor: "border-green-500",
    textColor: "text-green-500",
  },
];

const PalleteFormInput = () => {
  const [isShow, setIsShow] = useState(false);
  const [palleteKind, setPalleteKind] = useState(null);

  const initialValues = {
    name: "pallete",
    palleteNumber: "",
    palleteColor: "",
    palleteKind: "",
    palleteWeight: "",
  };
  const onSubmit = (values, { resetForm }) => {
    axios
      .post(`http://localhost:4000/palletes`, {
        ...values,
        whole:
          values.palleteNumber +
          " " +
          values.palleteColor +
          " " +
          values.palleteKind +
          " " +
          values.palleteWeight +
          " ",
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
      .get(`http://localhost:4000/palleteKind`)
      .then((res) => setPalleteKind(res.data))
      .catch((err) => toast.error(err.message));
  }, []);

  const validationSchema = Yup.object({
    palleteNumber: Yup.number().required(`pallete number is required`),
    palleteColor: Yup.string().required(`pallete color is required`),
    palleteKind: Yup.string().required(`pallete kind is required`),
    palleteWeight: Yup.number().required(`pallete weight is required`),
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
        {isShow ? "hide pallet form" : "show  pallet form"} input
      </button>
      {palleteKind && (
        <form
          onSubmit={formik.handleSubmit}
          className={`${isShow ? "block" : "hidden"}`}
        >
          <div className="flex flex-col gap-4 justify-center items-center border border-primary_green rounded-sm p-2 shadow-[0_10px_20px_rgba(79,_119,_45,_0.5)]">
            <Input
              name="palleteNumber"
              label="pallete number"
              formik={formik}
              logo={
                <HiOutlineInformationCircle className="w-6 h-6 text-primary_cream" />
              }
              type="number"
            />
            <RadioButton
              name="palleteColor"
              label="pallete color"
              formik={formik}
              logo={
                <HiOutlineInformationCircle className="w-6 h-6  text-primary_cream" />
              }
              options={colorOptions}
            />
            <SearchSelect
              name="palleteKind"
              label="pallete kind"
              formik={formik}
              logo={
                <HiOutlineInformationCircle className="w-6 h-6  text-primary_cream" />
              }
              options={palleteKind}
            />
            <Input
              name="palleteWeight"
              label="pallete weight"
              formik={formik}
              logo={<AiOutlineNumber className="w-6 h-6  text-primary_cream" />}
              type="number"
            />
            <Textarea
              name="information"
              label="information"
              formik={formik}
              logo={
                <HiOutlineInformationCircle className="w-6 h-6  text-primary_cream" />
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
export default PalleteFormInput;
