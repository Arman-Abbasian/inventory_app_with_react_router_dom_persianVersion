import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import Input from "../common/Input";
import { CiCalendarDate } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Textarea from "../common/Textarea";
import SearchSelect from "../common/SearchSelect";
import {
  HiOutlineInformationCircle,
  HiOutlineShoppingCart,
} from "react-icons/hi";
import { AiOutlineNumber } from "react-icons/ai";

const ExitOneProductItem = () => {
  const initialValues = {
    palleteNumber: "",
    whole: "",
    date: "",
    information: "",
  };
  const [productList, setProductList] = useState(null);
  const [productsEnters, setProductsEnters] = useState(null);

  let navigate = useNavigate();

  const onSubmit = (values, { resetForm }) => {
    const choosedEnterItem =
      productsEnters.find(
        (item) => item.palleteNumber === values.palleteNumber
      ) || undefined;
    const wholeEquality = choosedEnterItem
      ? choosedEnterItem.whole === values.whole
      : false;
    if (choosedEnterItem !== undefined && wholeEquality) {
      axios
        .post(`http://localhost:4000/allExitProducts`, {
          ...values,
          productNumber: choosedEnterItem.productNumber,
        })
        .then((res) => {
          axios
            .delete(
              `http://localhost:4000/allEnterProducts/${choosedEnterItem.id}`
            )
            .then((res) => {
              navigate("/ProductsInventory");
              toast.success("اطلاعات با موقفیت ثبت گردید");
            });
        })
        .catch((err) => toast.error(err.message));
      resetForm();
    } else {
      toast.error("خطایی در ورود اطلاعات رخ داده است");
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/allEnterProducts`)
      .then((res) => {
        setProductsEnters(res.data);
      })
      .catch((err) => toast.error(err.message));
  }, []);

  //get overallProduct from DB
  useEffect(() => {
    axios
      .get(`http://localhost:4000/overallProucts`)
      .then((res) => {
        const productList = res.data.map((item) => item.whole);
        setProductList(productList);
      })
      .catch((err) => toast.error(err.message));
  }, []);

  const validationSchema = Yup.object({
    palleteNumber: Yup.string().required("لطفا شماره پالت را وارد نمایید"),
    date: Yup.string("the format is not date format").required(
      "date is required"
    ),
    information: Yup.string(),
  });

  useEffect(() => {
    axios
      .get(`http://localhost:4000/overallProucts`)
      .then((res) => setProductList(res.data))
      .catch((err) => toast.error(err.message));
  }, []);
  const ref = useRef(null);
  const someFuncton = () => {
    console.log(ref);
  };
  someFuncton();
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    innerRef: ref,
  });
  return (
    <div className="lg:flex-1">
      {productList && (
        <form
          onSubmit={formik.handleSubmit}
          className="container mx-auto max-w-md p-2 "
        >
          <div className="flex flex-col gap-4 justify-center items-center">
            <Input
              type="number"
              label="شماره پالت"
              name="palleteNumber"
              formik={formik}
              logo={<AiOutlineNumber className="w-6 h-6 text-primary_cream" />}
            />
            {productList && (
              <SearchSelect
                options={productList}
                label="نام محصول"
                name="whole"
                formik={formik}
                logo={
                  <HiOutlineShoppingCart className="w-6 h-6 text-primary_cream" />
                }
              />
            )}
            <Input
              type="date"
              label="تاریخ خروج"
              name="date"
              formik={formik}
              logo={<CiCalendarDate className="w-6 h-6 text-primary_cream" />}
            />
            <Textarea
              name="information"
              formik={formik}
              label="توضیحات"
              logo={
                <HiOutlineInformationCircle className="w-6 h-6 text-primary_cream" />
              }
            />
            <button
              disabled={!formik.isValid}
              className={`py-2 px-4 bg-primary_cream rounded-sm w-full ${
                !formik.isValid && "bg-opacity-60"
              }`}
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

export default ExitOneProductItem;
