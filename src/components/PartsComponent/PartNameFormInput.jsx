import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../common/Input";
import Textarea from "../../common/Textarea";
import { BsSpeedometer2 } from "react-icons/bs";
import { AiOutlineNumber } from "react-icons/ai";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import SearchSelect from "../../common/SearchSelect";

const PartNameFormInput = ({ name, label, logo, searchSelectOptions }) => {
  const initialValues = {
    category: name,
    [name]: "",
    measurmentUnit: "",
    safetyStock: 0,
    orderPoint: 0,
    information: "",
  };
  const onSubmit = (values, { resetForm }) => {
    axios
      .post(`http://localhost:4000/overall`, values)
      .then((res) => {
        toast.success(`${label} added successfully`);
        setIsShow(false);
      })
      .catch((err) => toast.error(err.message));
    resetForm();
  };

  const validationSchema = Yup.object({
    [name]: Yup.string().required(`${label} is required`),
    measurmentUnit: Yup.string().required(`measurment unit is required`),
    safetyStock: Yup.number().required(`safety stock is required`),
    orderPoint: Yup.number().required(`order point is required`),
    information: Yup.string(),
  });
  const [isShow, setIsShow] = useState(false);

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });
  return (
    <div className="flex flex-col gap-3 container mx-auto max-w-md p-2">
      <button
        className={`w-full p-2 rounded-sm bg-primary_cream shadow-[0_10px_20px_rgba(79,_119,_45,_0.5)]`}
        onClick={() => setIsShow(!isShow)}
      >
        {isShow ? "hide" : "show"} {label} input
      </button>
      <form
        onSubmit={formik.handleSubmit}
        className={`${isShow ? "block" : "hidden"}`}
      >
        <div className="flex flex-col gap-4 justify-center items-center border border-primary_cream  rounded-sm p-2">
          <Input name={name} label={label} formik={formik} logo={logo} />
          <SearchSelect
            options={searchSelectOptions}
            name="measurmentUnit"
            label="measurement unit"
            formik={formik}
            logo={<BsSpeedometer2 className="w-6 h-6 text-primary_cream" />}
          />
          <Input
            type="number"
            label="safety stock"
            name="safetyStock"
            formik={formik}
            logo={<AiOutlineNumber className="w-6 h-6 text-primary_cream" />}
          />
          <Input
            type="number"
            label="order point"
            name="orderPoint"
            formik={formik}
            logo={<AiOutlineNumber className="w-6 h-6 text-primary_cream" />}
          />
          <Textarea
            name="information"
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
            {formik.isValid ? "Add" : "please fill add the field"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default PartNameFormInput;
