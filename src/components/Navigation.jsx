import { Link } from "react-router-dom";

const navigation=[
    {id:1,name:"Home",to:"/"},
    {id:2,name:"Enter",to:"/Enter"},
    {id:3,name:"Exit",to:"/Exit"},
    {id:4,name:"Inventory",to:"/Inventory"},
];

const Navigation = () => {
    return ( 
        <ul>
            {navigation.map(item=>{
                return <li key={item.id}><Link to={item.to}>{item.name}</Link></li>
            })}
        </ul>
     );
}
 
export default Navigation;