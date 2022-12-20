import { Link } from "react-router-dom";

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
    return ( 
        <ul className="flex items-center gap-4 flex-wrap p-2">
            {navigation.map(item=>{
                return <li className="hover:bg-primary_black"  key={item.id}><Link to={item.to}>{item.name}</Link></li>
            })}
        </ul>
     );
}
 
export default Navigation;