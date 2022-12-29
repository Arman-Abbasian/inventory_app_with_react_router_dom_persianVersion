import { Link } from "react-router-dom";
import { BsChevronUp , BsChevronDown } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { RiStore2Line } from "react-icons/ri";
import { MdLogin,MdLogout } from "react-icons/md";
import { CiCircleList } from "react-icons/ci";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";


const navigation=[
    {id:1,name:"Home",to:"/"},
    {id:2,name:"add enter",to:"/Enter"},
    {id:3,name:"add exit",to:"/Exit"},
    {id:4,name:"inventory",to:"/Inventory"},
    {id:5,name:"inputs",to:"/Inputs"},
    {id:6,name:"enter list",to:"/EnterList"},
    {id:7,name:"exit list",to:"/ExitList"},
];

const Navigation = () => {
    const [enter,setEnter]=useState(false);
    const [exit,setExit]=useState(false);
    const [showAside,setShowAside]=useState(false)
        return (
            <>
            <div onClick={()=>setShowAside(!showAside)} className="lg:hidden hover:cursor-pointer mb-4"><HiMenu className="w-12 h-12 p-2 rounded-full bg-primary_yellow" /></div>
            <aside className={`${showAside ===false ? 'hidden':''} lg:${()=>setShowAside(true)} lg:h-screen lg:sticky lg:top-2 transition-all duration-1000 bg-primary_yellow rounded mb-10 lg:mb-0`}>
                <div className="overflow-y-auto py-4 px-3 ">
                    <ul className="flex flex-col gap-4">
                        <li>
                            <Link onClick={()=>setShowAside(false)} to={'/'} className="flex items-center p-2 rounded-lg  hover:bg-primary_red">
                            <AiOutlineHome className="w-6 h-6 text-gray-500" />
                            <span class="ml-3">Home</span>
                            </Link>
                        </li>

                        <li>
                            <Link onClick={()=>setShowAside(false)}  to={'/Inventory'} className="flex items-center p-2 rounded-lg  hover:bg-primary_red">
                        <RiStore2Line class="w-6 h-6 text-gray-500" />
                            <span class="ml-3">Inventory</span>
                            </Link>
                        </li>

                        <li>
                            <Link onClick={()=>setShowAside(false)} to={'/Inputs'} className="flex items-center p-2 rounded-lg  hover:bg-primary_red">
                        <CiCircleList className="w-6 h-6 text-gray-500" />
                            <span class="ml-3">Inputs</span>
                            </Link>
                        </li>

                        <li>
                            
                        <button onClick={()=>setEnter(!enter)} className="w-full">
                                <div className="flex justify-between items-center p-2 w-full text-gray-900 rounded-lg transition duration-75 group hover:bg-primary_red gap-4">
                                    <div className="flex items-center">
                                        <MdLogin className="w-6 h-6 text-gray-500" />
                                        <span className="flex-1 ml-3 text-left whitespace-nowrap">Enters</span>
                                    </div>
                                    <div>
                                        <BsChevronUp className={`${enter?'hidden':'block'}`}/>
                                        <BsChevronDown className={`${!enter?'hidden':'block'}`}/>
                                    </div>
                                </div>
                
                                <ul  class={`py-2 ${enter ?'flex flex-col' : 'hidden'}`}>
                                    <li>
                                        <Link onClick={()=>setShowAside(false)} to={`/Enter`} className="flex items-center p-2  w-full  rounded-lg transition duration-75 group hover:bg-primary_red">enter one enter item</Link>
                                    </li>
                                    <li>
                                        <Link onClick={()=>setShowAside(false)} to={`/EnterList`} className="flex items-center p-2 w-full rounded-lg transition duration-75 group hover:bg-primary_red">enter list</Link>
                                    </li>
                                </ul>
                            </button>
                        </li>

                        <li>
                            <button onClick={()=>setExit(!exit)} className="w-full">
                                <div className="flex justify-between items-center p-2 w-full text-gray-900 rounded-lg transition duration-75 group hover:bg-primary_red gap-4">
                                    <div className="flex items-center">
                                        <MdLogout class="w-6 h-6 text-gray-500" />
                                        <span className="flex-1 ml-3 text-left whitespace-nowrap">Exits</span>
                                    </div>
                                    <div>
                                        <BsChevronUp className={`${exit?'hidden':'block'}`}/>
                                        <BsChevronDown className={`${!exit?'hidden':'block'}`}/>
                                    </div>
                                </div>
                
                                <ul  className={`p-2 ${exit ?'flex flex-col' : 'hidden'}`}>
                                    <li>
                                        <Link onClick={()=>setShowAside(false)} to={`/Exit`}  className="flex items-center p-2  w-full  rounded-lg transition duration-75  hover:bg-primary_red">enter one Exit item</Link>
                                    </li>
                                    <li>
                                        <Link onClick={()=>setShowAside(false)} to={`/ExitList`} className="flex items-center p-2  w-full rounded-lg transition duration-75  hover:bg-primary_red">exit list</Link>
                                    </li>
                                </ul>
                            </button>
                        </li>
                    </ul>
                </div>
        </aside>


        <aside className={`hidden lg:block sticky h-screen top-2 transition-all duration-1000 bg-primary_yellow rounded`}>
                <div className="overflow-y-auto py-4 px-3 ">
                    <ul className="flex flex-col gap-4">
                        <li>
                            <Link onClick={()=>setShowAside(false)} to={'/'} className="flex items-center p-2 rounded-lg  hover:bg-primary_red">
                            <AiOutlineHome className="w-6 h-6 text-gray-500" />
                            <span class="ml-3">Home</span>
                            </Link>
                        </li>

                        <li>
                            <Link onClick={()=>setShowAside(false)}  to={'/Inventory'} className="flex items-center p-2 rounded-lg  hover:bg-primary_red">
                        <RiStore2Line class="w-6 h-6 text-gray-500" />
                            <span class="ml-3">Inventory</span>
                            </Link>
                        </li>

                        <li>
                            <Link onClick={()=>setShowAside(false)} to={'/Inputs'} className="flex items-center p-2 rounded-lg  hover:bg-primary_red">
                        <CiCircleList className="w-6 h-6 text-gray-500" />
                            <span class="ml-3">Inputs</span>
                            </Link>
                        </li>

                        <li>
                            
                        <button onClick={()=>setEnter(!enter)}>
                                <div className="flex justify-between items-center p-2 w-full text-gray-900 rounded-lg transition duration-75 group hover:bg-primary_red gap-4">
                                    <div className="flex items-center">
                                        <MdLogin className="w-6 h-6 text-gray-500" />
                                        <span className="flex-1 ml-3 text-left whitespace-nowrap">Enters</span>
                                    </div>
                                    <div>
                                        <BsChevronUp className={`${enter?'hidden':'block'}`}/>
                                        <BsChevronDown className={`${!enter?'hidden':'block'}`}/>
                                    </div>
                                </div>
                
                                <ul  class={`py-2 ml-12 ${enter ?'flex flex-col' : 'hidden'}`}>
                                    <li>
                                        <Link onClick={()=>setShowAside(false)} to={`/Enter`} className="flex items-center p-2  w-full  rounded-lg transition duration-75 group hover:bg-primary_red">enter one enter item</Link>
                                    </li>
                                    <li>
                                        <Link onClick={()=>setShowAside(false)} to={`/EnterList`} className="flex items-center p-2 w-full rounded-lg transition duration-75 group hover:bg-primary_red">enter list</Link>
                                    </li>
                                </ul>
                            </button>
                        </li>

                        <li>
                            <button onClick={()=>setExit(!exit)}>
                                <div className="flex justify-between items-center p-2 w-full text-gray-900 rounded-lg transition duration-75 group hover:bg-primary_red gap-4">
                                    <div className="flex items-center">
                                        <MdLogout class="w-6 h-6 text-gray-500" />
                                        <span className="flex-1 ml-3 text-left whitespace-nowrap">Exits</span>
                                    </div>
                                    <div>
                                        <BsChevronUp className={`${exit?'hidden':'block'}`}/>
                                        <BsChevronDown className={`${!exit?'hidden':'block'}`}/>
                                    </div>
                                </div>
                
                                <ul  className={`p-2 ${exit ?'flex flex-col' : 'hidden'}`}>
                                    <li>
                                        <Link onClick={()=>setShowAside(false)} to={`/Exit`}  className="flex items-center p-2  w-full  rounded-lg transition duration-75  hover:bg-primary_red">enter one Exit item</Link>
                                    </li>
                                    <li>
                                        <Link onClick={()=>setShowAside(false)} to={`/ExitList`} className="flex items-center p-2  w-full rounded-lg transition duration-75  hover:bg-primary_red">exit list</Link>
                                    </li>
                                </ul>
                            </button>
                        </li>
                    </ul>
                </div>
        </aside>
            </>
     );
}
 
export default Navigation;