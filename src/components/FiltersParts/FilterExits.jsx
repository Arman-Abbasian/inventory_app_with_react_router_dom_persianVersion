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
    jobPosition: null,
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
  if (!options.jobPosition) {
    axios
      .get(`http://localhost:4000/overall?category=jobPosition`)
      .then((res) => {
        const data = res.data;
        const jobPosition = data.map((item) => {
          return { id: item.id, jobPosition: item.jobPosition };
        });
        setOptions({ ...options, jobPosition });
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
        options.jobPosition &&
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
                  placeholder="search product name"
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
                  placeholder="search supplier name"
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
                  placeholder="search delivery name"
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
            {/* make exit job position options */}
            <>
              <div className="border rounded-sm focus:border-2 flex items-center w-full p-2 gap-2">
                <span>
                  <AiOutlineFilter className="w-6 h-6 text-primary_cream" />
                </span>
                <input
                  placeholder="search job position"
                  list="jobPositionn"
                  name="jobPosition"
                  className="w-full bg-transparent outline-none text-primary_cream"
                  value={filters.jobPosition}
                  onChange={(e) => changeHandler(e)}
                />
              </div>
              <datalist id="jobPositionn">
                {options.jobPosition.map((item) => {
                  return (
                    <option key={item.id} value={item.jobPosition}>
                      {item.jobPosition}
                    </option>
                  );
                })}
              </datalist>
            </>
            {/* make unit options */}
            <>
              <div className="border rounded-sm focus:border-2 flex items-center w-full p-2 gap-2">
                <span>
                  <AiOutlineFilter className="w-6 h-6 text-primary_cream" />
                </span>
                <input
                  placeholder="search unit"
                  list="unitt"
                  name="unit"
                  className="w-full bg-transparent outline-none text-primary_cream"
                  value={filters.unit}
                  onChange={(e) => changeHandler(e)}
                />
              </div>
              <datalist id="unitt">
                {options.unit.map((item) => {
                  return (
                    <option key={item.id} value={item.unit}>
                      {item.unit}
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
                  className="w-11 h-6 bg-gray-200 peer-focus:outline-none
                        rounded-md peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                        after:bg-white after:border-gray-300 after:border after:rounded-md after:h-5 after:w-5  after:transition-all  peer-checked:bg-primary_light_green"
                ></div>
                <span className="ml-3 text-sm font-medium text-primary-white">
                  {filters.latest ? "latest" : "earliest"}
                </span>
              </label>
            </div>
          </div>
        )}
    </>
  );
};

export default FilterExits;
