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
        toast.success(`${label} با موفقیت اضافه گردید`);
        setIsShow(false);
      })
      .catch((err) => toast.error(err.message));
    resetForm();
  };

  const validationSchema = Yup.object({
    [name]: Yup.string().required(`${label} را لطفا وارد کنید`),
    measurmentUnit: Yup.string().required(`واحد اندازه گیری را وارد کنید`),
    safetyStock: Yup.number().required(`موجودی اطمینان را وارد کنید`),
    orderPoint: Yup.number().required(`نقطه سفارش را وارد کنید`),
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
        {isShow ? "بستن" : "نمایش"} فرم {label}
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
            label="واحد اندازه گیری"
            formik={formik}
            logo={<BsSpeedometer2 className="w-6 h-6 text-primary_cream" />}
          />
          <Input
            type="number"
            label="موجودی اطمینان"
            name="safetyStock"
            formik={formik}
            logo={<AiOutlineNumber className="w-6 h-6 text-primary_cream" />}
          />
          <Input
            type="number"
            label="نقطه سفارش"
            name="orderPoint"
            formik={formik}
            logo={<AiOutlineNumber className="w-6 h-6 text-primary_cream" />}
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
            {formik.isValid ? "ثبت" : "لطفا تمامی فیلد های مورد نیاز را وارد کنید"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default PartNameFormInput;
