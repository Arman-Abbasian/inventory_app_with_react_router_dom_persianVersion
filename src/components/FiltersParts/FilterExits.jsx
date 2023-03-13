import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { AiOutlineFilter } from "react-icons/ai";

const FilterExits = ({ filters, changeHandler, toggleChangeHandler }) => {
  const [options, setOptions] = useState({
    productNames: null,
    consumingFor: null,
    exitDelivery: null,
    exitTransferee: null,
    unit: null,
  });
  const [showFilterSection, setShowFilterSection] = useState(false);
  //make productNames options
  if (!options.productNames) {
    axios
      .get(`http://localhost:4000/overall?category=productName`)
      .then((res) => {
        const data = res.data;
        const productNames = data.map((item) => {
          return { id: item.id, productName: item.productName };
        });
        setOptions({ ...options, productNames: productNames });
      })
      .catch((err) => toast.error(err.message));
  }
  //make supplier options
  if (!options.supplier) {
    axios
      .get(`http://localhost:4000/overall?category=supplier`)
      .then((res) => {
        const data = res.data;
        const supplier = data.map((item) => {
          return { id: item.id, supplier: item.supplier };
        });
        setOptions({ ...options, supplier: supplier });
      })
      .catch((err) => toast.error(err.message));
  }
  //make consumingFor options
  if (!options.consumingFor) {
    axios
      .get(`http://localhost:4000/overall?category=consumingFor`)
      .then((res) => {
        const data = res.data;
        const consumingFor = data.map((item) => {
          return { id: item.id, consumingFor: item.consumingFor };
        });
        setOptions({ ...options, consumingFor });
      })
      .catch((err) => toast.error(err.message));
  }
  //make exitDelivery options
  if (!options.exitDelivery) {
    axios
      .get(`http://localhost:4000/overall?category=exitDelivery`)
      .then((res) => {
        const data = res.data;
        console.log(res.data);
        const exitDelivery = data.map((item) => {
          return { id: item.id, exitDelivery: item.exitDelivery };
        });
        setOptions({ ...options, exitDelivery });
      })
      .catch((err) => toast.error(err.message));
  }
  //make job position options
  if (!options.exitTransferee) {
    axios
      .get(`http://localhost:4000/overall?category=exitTransferee`)
      .then((res) => {
        const data = res.data;
        const exitTransferee = data.map((item) => {
          return { id: item.id, exitTransferee: item.exitTransferee };
        });
        setOptions({ ...options, exitTransferee });
      })
      .catch((err) => toast.error(err.message));
  }
  //make unig options
  if (!options.unit) {
    axios
      .get(`http://localhost:4000/overall?category=unit`)
      .then((res) => {
        const data = res.data;
        const unit = data.map((item) => {
          return { id: item.id, unit: item.unit };
        });
        setOptions({ ...options, unit });
      })
      .catch((err) => toast.error(err.message));
  }
  return (
    <>
      <button
        className="w-full p-2 rounded-sm bg-primary_cream mb-4 shadow-md shadow-primary_light_green"
        onClick={() => setShowFilterSection(!showFilterSection)}
      >
        {showFilterSection ? "hide filter section" : "show filter section"}
      </button>
      {options.productNames &&
        options.consumingFor &&
        options.exitDelivery &&
        options.exitTransferee &&
        options.unit && (
          <div
            className={`sm:grid-cols-2 gap-8  w-full relative ${
              showFilterSection ? "grid" : "hidden"
            }`}
          >
            {/* make product name options */}
            <>
              <div className="border rounded-sm focus:border-2 flex items-center w-full p-2 gap-2">
                <span>
                  <AiOutlineFilter className="w-6 h-6 text-primary_cream" />
                </span>
                <input
                  placeholder="نام قطعه را جستجو کنید ..."
                  list="productNamee"
                  name="productName"
                  className="w-full bg-transparent outline-none text-primary_cream"
                  value={filters.productName}
                  onChange={(e) => changeHandler(e)}
                />
              </div>
              <datalist id="productNamee">
                {options.productNames.map((item) => {
                  return (
                    <option key={item.id} value={item.productName}>
                      {item.productName}
                    </option>
                  );
                })}
              </datalist>
            </>

            {/* make consuming for options */}
            <>
              <div className="border rounded-sm focus:border-2 flex items-center w-full p-2 gap-2">
                <span>
                  <AiOutlineFilter className="w-6 h-6 text-primary_cream" />
                </span>
                <input
                  placeholder="مورد مصرف ..."
                  list="consumingForr"
                  name="consumingFor"
                  className="w-full bg-transparent outline-none text-primary_cream"
                  value={filters.supplier}
                  onChange={(e) => changeHandler(e)}
                />
              </div>
              <datalist id="consumingForr">
                {options.consumingFor.map((item) => {
                  return (
                    <option key={item.id} value={item.consumingFor}>
                      {item.consumingFor}
                    </option>
                  );
                })}
              </datalist>
            </>

            {/* make exit delivery options */}
            <>
              <div className="border rounded-sm focus:border-2 flex items-center w-full p-2 gap-2">
                <span>
                  <AiOutlineFilter className="w-6 h-6 text-primary_cream" />
                </span>
                <input
                  placeholder="نام تحویل دهنده را جستجو کنید ..."
                  list="exitDeliveryy"
                  name="exitDelivery"
                  className="w-full bg-transparent outline-none text-primary_cream"
                  value={filters.enterDelivery}
                  onChange={(e) => changeHandler(e)}
                />
              </div>
              <datalist id="exitDeliveryy">
                {options.exitDelivery.map((item) => {
                  return (
                    <option key={item.id} value={item.exitDelivery}>
                      {item.exitDelivery}
                    </option>
                  );
                })}
              </datalist>
            </>
            {/* make exit transferee options */}
            <>
              <div className="border rounded-sm focus:border-2 flex items-center w-full p-2 gap-2">
                <span>
                  <AiOutlineFilter className="w-6 h-6 text-primary_cream" />
                </span>
                <input
                  placeholder="نام تحویل گیرنده را جستجو کنید ..."
                  list="exitTransfereen"
                  name="exitTransferee"
                  className="w-full bg-transparent outline-none text-primary_cream"
                  value={filters.exitTransferee}
                  onChange={(e) => changeHandler(e)}
                />
              </div>
              <datalist id="exitTransfereen">
                {options.exitTransferee.map((item) => {
                  return (
                    <option key={item.id} value={item.exitTransferee}>
                      {item.exitTransferee}
                    </option>
                  );
                })}
              </datalist>
            </>
            {/* ascending or descending based on date */}
            <div className="w-full">
              <label className="inline-flex relative items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer text-primary_cream"
                  name="latest"
                  checked={filters.latest}
                  onChange={(e) => toggleChangeHandler(e)}
                />
                <div
                  className="w-16 h-6 bg-primary_cream peer-focus:outline-none
                        rounded-md peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[88px]
                        after:bg-primary_light_green after:border-gray-300 after:border after:rounded-md after:h-5 after:w-5  after:transition-all  peer-checked:bg-primary_cream"
                ></div>
                <span className="ml-3 mr-1 text-sm font-medium text-primary_cream">
                  {filters.latest ? "جدیدترین" : "قدیمی ترین"}
                </span>
              </label>
            </div>
          </div>
        )}
    </>
  );
};

export default FilterExits;
