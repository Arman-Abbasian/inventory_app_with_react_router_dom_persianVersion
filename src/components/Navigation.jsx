import { Link } from "react-router-dom";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { RiStore2Line } from "react-icons/ri";
import {
  MdLogin,
  MdLogout,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { CiCircleList } from "react-icons/ci";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";

const Navigation = () => {
  const [enter, setEnter] = useState(false);
  const [exit, setExit] = useState(false);
  const [enterProduct, setEnterProduct] = useState(false);
  const [exitProduct, setExitProduct] = useState(false);
  const [showAside, setShowAside] = useState(false);
  const [showInventorySection, setShowInventorySection] = useState(false);
  const [showProductSection, setShowProductSection] = useState(false);
  const [showPurchaseSection, setShowPurchaseSection] = useState(false);
  const [showOtherSection, setShowOtherSection] = useState(false);
  return (
    <div className="lg:w-1/4 lg:h-full">
      {/* show in md und lower */}
      <div className="lg:hidden mb-10">
        <div
          onClick={() => setShowAside(!showAside)}
          className="hover:cursor-pointer mb-4"
        >
          <HiMenu className="w-12 h-12 p-2 rounded-full bg-primary_cream" />
        </div>
        <aside
          className={`${
            showAside === false ? "hidden " : ""
          }bg-primary_light_green scrollbar-hide py-4 px-3 rounded`}
        >
          {/* Home icon in side bar */}
          <div className="bg-primary_cream rounded">
            <Link to={"/"} className="flex items-center p-2 rounded-lg  mb-4">
              <AiOutlineHome className="w-6 h-6 text-primary_red" />
              <span class="ml-3">Home</span>
            </Link>
          </div>
          {/* part section icon in side bar */}
          <div className="bg-primary_cream rounded mb-4">
            <button
              className="w-full"
              onClick={() => setShowInventorySection(!showInventorySection)}
            >
              <div className="flex justify-between items-center p-2 w-full  rounded-lg transition duration-75 group  gap-4">
                <div className="flex items-center">
                  <MdOutlineProductionQuantityLimits class="w-6 h-6 text-primary_red" />
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    part section
                  </span>
                </div>
                <div>
                  <BsChevronUp
                    className={`${showInventorySection ? "hidden" : "block"}`}
                  />
                  <BsChevronDown
                    className={`${!showInventorySection ? "hidden" : "block"}`}
                  />
                </div>
              </div>
            </button>
          </div>
          {/* items in part section sidebar */}
          <ul
            className={`flex flex-col gap-4 ${
              showInventorySection ? "block" : "hidden"
            }`}
          >
            <li>
              <Link
                to={"/PartInventory"}
                className="flex items-center p-2 rounded-lg  hover:bg-primary_red"
              >
                <RiStore2Line class="w-6 h-6 " />
                <span class="ml-3">inventory</span>
              </Link>
            </li>

            <li>
              <Link
                to={"/PartInputs"}
                className="flex items-center p-2 rounded-lg  hover:bg-primary_red"
              >
                <CiCircleList className="w-6 h-6 " />
                <span class="ml-3">inputs</span>
              </Link>
            </li>

            <li>
              <button onClick={() => setEnter(!enter)} className="w-full">
                <div className="flex justify-between items-center p-2 w-full  rounded-lg transition duration-75 hover:bg-primary_red group gap-4">
                  <div className="flex items-center">
                    <MdLogin className="w-6 h-6 " />
                    <span className="flex-1 ml-3 text-left whitespace-nowrap">
                      Enters
                    </span>
                  </div>
                  <div>
                    <BsChevronUp className={`${enter ? "hidden" : "block"}`} />
                    <BsChevronDown
                      className={`${!enter ? "hidden" : "block"}`}
                    />
                  </div>
                </div>

                <ul class={`py-2 ${enter ? "flex flex-col" : "hidden"}`}>
                  <li>
                    <Link
                      to={`/PartEnterInput`}
                      className="flex items-center p-2  w-full  rounded-lg transition duration-75 group hover:bg-primary_red"
                    >
                      enter one enter item
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/PartEnterList`}
                      className="flex items-center p-2 w-full rounded-lg transition duration-75 group hover:bg-primary_red"
                    >
                      enter list
                    </Link>
                  </li>
                </ul>
              </button>
            </li>

            <li>
              <button onClick={() => setExit(!exit)} className="w-full">
                <div className="flex justify-between items-center p-2 w-full  rounded-lg transition duration-75 group hover:bg-primary_red gap-4">
                  <div className="flex items-center">
                    <MdLogout class="w-6 h-6 " />
                    <span className="flex-1 ml-3 text-left whitespace-nowrap">
                      Exits
                    </span>
                  </div>
                  <div>
                    <BsChevronUp className={`${exit ? "hidden" : "block"}`} />
                    <BsChevronDown
                      className={`${!exit ? "hidden" : "block"}`}
                    />
                  </div>
                </div>

                <ul className={`p-2 ${exit ? "flex flex-col" : "hidden"}`}>
                  <li>
                    <Link
                      to={`/PartExitInput`}
                      className="flex items-center p-2  w-full  rounded-lg transition duration-75  hover:bg-primary_red"
                    >
                      enter one Exit item
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/PartExitList`}
                      className="flex items-center p-2  w-full rounded-lg transition duration-75  hover:bg-primary_red"
                    >
                      exit list
                    </Link>
                  </li>
                </ul>
              </button>
            </li>
          </ul>

          {/* products section */}
          <div className="bg-primary_cream rounded mb-4">
            <button
              onClick={() => setShowProductSection(!showProductSection)}
              className="w-full"
            >
              <div className="flex justify-between items-center p-2 w-full  rounded-lg transition duration-75 group  gap-4">
                <div className="flex items-center">
                  <MdOutlineProductionQuantityLimits class="w-6 h-6 text-primary_red" />
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    product section
                  </span>
                </div>
                <div>
                  <BsChevronUp
                    className={`${showProductSection ? "hidden" : "block"}`}
                  />
                  <BsChevronDown
                    className={`${!showProductSection ? "hidden" : "block"}`}
                  />
                </div>
              </div>
            </button>
          </div>
          {/* items in product section sidebar */}
          <ul
            className={`flex flex-col gap-4 ${
              showProductSection ? "block" : "hidden"
            }`}
          >
            <li>
              <Link
                onClick={() => setShowAside(false)}
                to={"/ProductsInventory"}
                className="flex items-center p-2 rounded-lg  hover:bg-primary_red"
              >
                <RiStore2Line class="w-6 h-6 " />
                <span class="ml-3">Inventory</span>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setShowAside(false)}
                to={"/ProductsInputs"}
                className="flex items-center p-2 rounded-lg  hover:bg-primary_red"
              >
                <CiCircleList className="w-6 h-6 " />
                <span class="ml-3">Inputs</span>
              </Link>
            </li>
            <li>
              <button
                onClick={() => setEnterProduct(!enterProduct)}
                className="w-full"
              >
                <div className="flex justify-between items-center p-2 w-full  rounded-lg transition duration-75 hover:bg-primary_red group gap-4">
                  <div className="flex items-center">
                    <MdLogin className="w-6 h-6 " />
                    <span className="flex-1 ml-3 text-left whitespace-nowrap">
                      Enters
                    </span>
                  </div>
                  <div>
                    <BsChevronUp
                      className={`${enterProduct ? "hidden" : "block"}`}
                    />
                    <BsChevronDown
                      className={`${!enterProduct ? "hidden" : "block"}`}
                    />
                  </div>
                </div>

                <ul class={`py-2 ${enterProduct ? "flex flex-col" : "hidden"}`}>
                  <li>
                    <Link
                      to={`/EnterOneProductItem`}
                      className="flex items-center p-2  w-full  rounded-lg transition duration-75 group hover:bg-primary_red"
                    >
                      enter one enter product
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/EnterProductsList`}
                      className="flex items-center p-2 w-full rounded-lg transition duration-75 group hover:bg-primary_red"
                    >
                      enter list
                    </Link>
                  </li>
                </ul>
              </button>
            </li>
            <li>
              <button
                onClick={() => setExitProduct(!exitProduct)}
                className="w-full"
              >
                <div className="flex justify-between items-center p-2 w-full  rounded-lg transition duration-75 hover:bg-primary_red group gap-4">
                  <div className="flex items-center">
                    <MdLogout className="w-6 h-6" />
                    <span className="flex-1 ml-3 text-left whitespace-nowrap">
                      Exits
                    </span>
                  </div>
                  <div>
                    <BsChevronUp
                      className={`${exitProduct ? "hidden" : "block"}`}
                    />
                    <BsChevronDown
                      className={`${!exitProduct ? "hidden" : "block"}`}
                    />
                  </div>
                </div>

                <ul class={`py-2 ${exitProduct ? "flex flex-col" : "hidden"}`}>
                  <li>
                    <Link
                      to={`/ExitOneProductItem`}
                      className="flex items-center p-2  w-full  rounded-lg transition duration-75 group hover:bg-primary_red"
                    >
                      enter one exit product
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/ExitProductsList`}
                      className="flex items-center p-2 w-full rounded-lg transition duration-75 group hover:bg-primary_red"
                    >
                      exit list
                    </Link>
                  </li>
                </ul>
              </button>
            </li>
          </ul>

          {/* purchase section */}
          <div className="bg-primary_cream rounded mb-4">
            <button
              onClick={() => setShowPurchaseSection(!showPurchaseSection)}
              className="w-full"
            >
              <div className="flex justify-between items-center p-2 w-full  rounded-lg transition duration-75 group  gap-4">
                <div className="flex items-center">
                  <MdOutlineProductionQuantityLimits class="w-6 h-6 text-primary_red" />
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    purchasing section
                  </span>
                </div>
                <div>
                  <BsChevronUp
                    className={`${showPurchaseSection ? "hidden" : "block"}`}
                  />
                  <BsChevronDown
                    className={`${!showPurchaseSection ? "hidden" : "block"}`}
                  />
                </div>
              </div>
            </button>
          </div>
          {/* items in purchase section sidebar */}
          <ul
            className={`flex flex-col gap-4 ${
              showPurchaseSection ? "block" : "hidden"
            }`}
          >
            <li>
              <Link
                onClick={() => setShowAside(false)}
                to={"/PurchaseRequest"}
                className="flex items-center p-2 rounded-lg  hover:bg-primary_red"
              >
                <RiStore2Line class="w-6 h-6 " />
                <span class="ml-3">purchasing request</span>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setShowAside(false)}
                to={"/Purchasing"}
                className="flex items-center p-2 rounded-lg  hover:bg-primary_red"
              >
                <CiCircleList className="w-6 h-6 " />
                <span class="ml-3">purchasing</span>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setShowAside(false)}
                to={"/PurchasingRequestList"}
                className="flex items-center p-2 rounded-lg  hover:bg-primary_red"
              >
                <CiCircleList className="w-6 h-6 " />
                <span class="ml-3">purchasing requst list</span>
              </Link>
            </li>
          </ul>
          {/* other section */}
          <div className="bg-primary_cream rounded mb-4">
            <button
              onClick={() => setShowOtherSection(!showOtherSection)}
              className="w-full"
            >
              <div className="flex justify-between items-center p-2 w-full  rounded-lg transition duration-75 group  gap-4">
                <div className="flex items-center">
                  <MdOutlineProductionQuantityLimits class="w-6 h-6 text-primary_red" />
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    purchasing section
                  </span>
                </div>
                <div>
                  <BsChevronUp
                    className={`${showOtherSection ? "hidden" : "block"}`}
                  />
                  <BsChevronDown
                    className={`${!showOtherSection ? "hidden" : "block"}`}
                  />
                </div>
              </div>
            </button>
          </div>
          {/* items in other section sidebar */}
          <ul
            className={`flex flex-col gap-4 ${
              showOtherSection ? "block" : "hidden"
            }`}
          >
            <li>
              <Link
                onClick={() => setShowAside(false)}
                to={"/PurchaseRequest"}
                className="flex items-center p-2 rounded-lg  hover:bg-primary_red"
              >
                <RiStore2Line class="w-6 h-6 " />
                <span class="ml-3">purchasing request</span>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setShowAside(false)}
                to={"/Purchasing"}
                className="flex items-center p-2 rounded-lg  hover:bg-primary_red"
              >
                <CiCircleList className="w-6 h-6 " />
                <span class="ml-3">purchasing</span>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setShowAside(false)}
                to={"/PurchasingRequestList"}
                className="flex items-center p-2 rounded-lg  hover:bg-primary_red"
              >
                <CiCircleList className="w-6 h-6 " />
                <span class="ml-3">purchasing requst list</span>
              </Link>
            </li>
          </ul>
        </aside>
      </div>

      {/* show in lg und upper */}
      <aside className={`hidden lg:block scrollbar-hide overflow-y-auto`}>
        <div className="fixed bg-primary_light_green bottom-4 top-4 scrollbar-hide overflow-y-auto py-4 px-3 rounded">
          {/* Home icon in side bar */}
          <div className="bg-primary_cream rounded">
            <Link to={"/"} className="flex items-center p-2 rounded-lg  mb-4">
              <AiOutlineHome className="w-6 h-6 text-primary_red" />
              <span class="ml-3">Home</span>
            </Link>
          </div>
          {/* part section icon in side bar */}
          <div className="bg-primary_cream rounded mb-4">
            <button
              className="w-full"
              onClick={() => setShowInventorySection(!showInventorySection)}
            >
              <div className="flex justify-between items-center p-2 w-full  rounded-lg transition duration-75 group  gap-4">
                <div className="flex items-center">
                  <MdOutlineProductionQuantityLimits class="w-6 h-6 text-primary_red" />
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    part section
                  </span>
                </div>
                <div>
                  <BsChevronUp
                    className={`${showInventorySection ? "hidden" : "block"}`}
                  />
                  <BsChevronDown
                    className={`${!showInventorySection ? "hidden" : "block"}`}
                  />
                </div>
              </div>
            </button>
          </div>
          {/* items in part section sidebar */}
          <ul
            className={`flex flex-col gap-4 ${
              showInventorySection ? "block" : "hidden"
            }`}
          >
            <li>
              <Link
                to={"/PartInventory"}
                className="flex items-center p-2 rounded-lg  hover:bg-primary_red"
              >
                <RiStore2Line class="w-6 h-6 " />
                <span class="ml-3">inventory</span>
              </Link>
            </li>

            <li>
              <Link
                to={"/PartInputs"}
                className="flex items-center p-2 rounded-lg  hover:bg-primary_red"
              >
                <CiCircleList className="w-6 h-6 " />
                <span class="ml-3">inputs</span>
              </Link>
            </li>

            <li>
              <button onClick={() => setEnter(!enter)} className="w-full">
                <div className="flex justify-between items-center p-2 w-full  rounded-lg transition duration-75 hover:bg-primary_red group gap-4">
                  <div className="flex items-center">
                    <MdLogin className="w-6 h-6 " />
                    <span className="flex-1 ml-3 text-left whitespace-nowrap">
                      Enters
                    </span>
                  </div>
                  <div>
                    <BsChevronUp className={`${enter ? "hidden" : "block"}`} />
                    <BsChevronDown
                      className={`${!enter ? "hidden" : "block"}`}
                    />
                  </div>
                </div>

                <ul class={`py-2 ${enter ? "flex flex-col" : "hidden"}`}>
                  <li>
                    <Link
                      to={`/PartEnterInput`}
                      className="flex items-center p-2  w-full  rounded-lg transition duration-75 group hover:bg-primary_red"
                    >
                      enter one enter item
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/PartEnterList`}
                      className="flex items-center p-2 w-full rounded-lg transition duration-75 group hover:bg-primary_red"
                    >
                      enter list
                    </Link>
                  </li>
                </ul>
              </button>
            </li>

            <li>
              <button onClick={() => setExit(!exit)} className="w-full">
                <div className="flex justify-between items-center p-2 w-full  rounded-lg transition duration-75 group hover:bg-primary_red gap-4">
                  <div className="flex items-center">
                    <MdLogout class="w-6 h-6 " />
                    <span className="flex-1 ml-3 text-left whitespace-nowrap">
                      Exits
                    </span>
                  </div>
                  <div>
                    <BsChevronUp className={`${exit ? "hidden" : "block"}`} />
                    <BsChevronDown
                      className={`${!exit ? "hidden" : "block"}`}
                    />
                  </div>
                </div>

                <ul className={`p-2 ${exit ? "flex flex-col" : "hidden"}`}>
                  <li>
                    <Link
                      to={`/PartExitInput`}
                      className="flex items-center p-2  w-full  rounded-lg transition duration-75  hover:bg-primary_red"
                    >
                      enter one Exit item
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/PartExitList`}
                      className="flex items-center p-2  w-full rounded-lg transition duration-75  hover:bg-primary_red"
                    >
                      exit list
                    </Link>
                  </li>
                </ul>
              </button>
            </li>
          </ul>

          {/* products section */}
          <div className="bg-primary_cream rounded mb-4">
            <button
              onClick={() => setShowProductSection(!showProductSection)}
              className="w-full"
            >
              <div className="flex justify-between items-center p-2 w-full  rounded-lg transition duration-75 group  gap-4">
                <div className="flex items-center">
                  <MdOutlineProductionQuantityLimits class="w-6 h-6 text-primary_red" />
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    product section
                  </span>
                </div>
                <div>
                  <BsChevronUp
                    className={`${showProductSection ? "hidden" : "block"}`}
                  />
                  <BsChevronDown
                    className={`${!showProductSection ? "hidden" : "block"}`}
                  />
                </div>
              </div>
            </button>
          </div>
          {/* items in product section sidebar */}
          <ul
            className={`flex flex-col gap-4 ${
              showProductSection ? "block" : "hidden"
            }`}
          >
            <li>
              <Link
                onClick={() => setShowAside(false)}
                to={"/ProductsInventory"}
                className="flex items-center p-2 rounded-lg  hover:bg-primary_red"
              >
                <RiStore2Line class="w-6 h-6 " />
                <span class="ml-3">Inventory</span>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setShowAside(false)}
                to={"/ProductsInputs"}
                className="flex items-center p-2 rounded-lg  hover:bg-primary_red"
              >
                <CiCircleList className="w-6 h-6 " />
                <span class="ml-3">Inputs</span>
              </Link>
            </li>
            <li>
              <button
                onClick={() => setEnterProduct(!enterProduct)}
                className="w-full"
              >
                <div className="flex justify-between items-center p-2 w-full  rounded-lg transition duration-75 hover:bg-primary_red group gap-4">
                  <div className="flex items-center">
                    <MdLogin className="w-6 h-6 " />
                    <span className="flex-1 ml-3 text-left whitespace-nowrap">
                      Enters
                    </span>
                  </div>
                  <div>
                    <BsChevronUp
                      className={`${enterProduct ? "hidden" : "block"}`}
                    />
                    <BsChevronDown
                      className={`${!enterProduct ? "hidden" : "block"}`}
                    />
                  </div>
                </div>

                <ul class={`py-2 ${enterProduct ? "flex flex-col" : "hidden"}`}>
                  <li>
                    <Link
                      to={`/EnterOneProductItem`}
                      className="flex items-center p-2  w-full  rounded-lg transition duration-75 group hover:bg-primary_red"
                    >
                      enter one enter product
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/EnterProductsList`}
                      className="flex items-center p-2 w-full rounded-lg transition duration-75 group hover:bg-primary_red"
                    >
                      enter list
                    </Link>
                  </li>
                </ul>
              </button>
            </li>
            <li>
              <button
                onClick={() => setExitProduct(!exitProduct)}
                className="w-full"
              >
                <div className="flex justify-between items-center p-2 w-full  rounded-lg transition duration-75 hover:bg-primary_red group gap-4">
                  <div className="flex items-center">
                    <MdLogout className="w-6 h-6 " />
                    <span className="flex-1 ml-3 text-left whitespace-nowrap">
                      Exits
                    </span>
                  </div>
                  <div>
                    <BsChevronUp
                      className={`${exitProduct ? "hidden" : "block"}`}
                    />
                    <BsChevronDown
                      className={`${!exitProduct ? "hidden" : "block"}`}
                    />
                  </div>
                </div>

                <ul class={`py-2 ${exitProduct ? "flex flex-col" : "hidden"}`}>
                  <li>
                    <Link
                      to={`/ExitOneProductItem`}
                      className="flex items-center p-2  w-full  rounded-lg transition duration-75 group hover:bg-primary_red"
                    >
                      enter one exit product
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/ExitProductsList`}
                      className="flex items-center p-2 w-full rounded-lg transition duration-75 group hover:bg-primary_red"
                    >
                      exit list
                    </Link>
                  </li>
                </ul>
              </button>
            </li>
          </ul>

          {/* purchase section */}
          <div className="bg-primary_cream rounded mb-4">
            <button
              onClick={() => setShowPurchaseSection(!showPurchaseSection)}
              className="w-full"
            >
              <div className="flex justify-between items-center p-2 w-full  rounded-lg transition duration-75 group  gap-4">
                <div className="flex items-center">
                  <MdOutlineProductionQuantityLimits class="w-6 h-6 text-primary_red" />
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    purchasing section
                  </span>
                </div>
                <div>
                  <BsChevronUp
                    className={`${showPurchaseSection ? "hidden" : "block"}`}
                  />
                  <BsChevronDown
                    className={`${!showPurchaseSection ? "hidden" : "block"}`}
                  />
                </div>
              </div>
            </button>
          </div>
          {/* items in purchase section sidebar */}
          <ul
            className={`flex flex-col gap-4 ${
              showPurchaseSection ? "block" : "hidden"
            }`}
          >
            <li>
              <Link
                onClick={() => setShowProductSection(false)}
                to={"/PurchaseRequest"}
                className="flex items-center p-2 rounded-lg  hover:bg-primary_red"
              >
                <RiStore2Line class="w-6 h-6 " />
                <span class="ml-3">purchasing request</span>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setShowProductSection(false)}
                to={"/Purchasing"}
                className="flex items-center p-2 rounded-lg  hover:bg-primary_red"
              >
                <CiCircleList className="w-6 h-6 " />
                <span class="ml-3">purchasing</span>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setShowProductSection(false)}
                to={"/PurchasingRequestList"}
                className="flex items-center p-2 rounded-lg  hover:bg-primary_red"
              >
                <CiCircleList className="w-6 h-6 " />
                <span class="ml-3">purchasing requst list</span>
              </Link>
            </li>
          </ul>
          {/* other section */}
          <div className="bg-primary_cream rounded">
            <button
              onClick={() => setShowOtherSection(!showOtherSection)}
              className="w-full"
            >
              <div className="flex justify-between items-center p-2 w-full  rounded-lg transition duration-75 group  gap-4">
                <div className="flex items-center">
                  <MdOutlineProductionQuantityLimits class="w-6 h-6 text-primary_red" />
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    purchasing section
                  </span>
                </div>
                <div>
                  <BsChevronUp
                    className={`${showOtherSection ? "hidden" : "block"}`}
                  />
                  <BsChevronDown
                    className={`${!showOtherSection ? "hidden" : "block"}`}
                  />
                </div>
              </div>
            </button>
          </div>
          {/* items in other section sidebar */}
          <ul
            className={`flex flex-col gap-4 ${
              showOtherSection ? "block" : "hidden"
            }`}
          >
            <li>
              <Link
                onClick={() => setShowAside(false)}
                to={"/OtherPalletesConditon"}
                className="flex items-center p-2 rounded-lg  hover:bg-primary_red"
              >
                <RiStore2Line class="w-6 h-6 " />
                <span class="ml-3">palletes conditon</span>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setShowAside(false)}
                to={"/Purchasing"}
                className="flex items-center p-2 rounded-lg  hover:bg-primary_red"
              >
                <CiCircleList className="w-6 h-6 " />
                <span class="ml-3">purchasing</span>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setShowAside(false)}
                to={"/PurchasingRequestList"}
                className="flex items-center p-2 rounded-lg  hover:bg-primary_red"
              >
                <CiCircleList className="w-6 h-6 " />
                <span class="ml-3">purchasing requst list</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Navigation;
