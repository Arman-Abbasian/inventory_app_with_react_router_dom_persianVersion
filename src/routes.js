import { Routes,Route } from "react-router-dom";
import Inventory from "./pages/Inventory";
import Enter from "./pages/Enter";
import Exit from "./pages/Exit";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";


const Routee = () => {
    return ( 
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Enter" element={<Enter />} />
            <Route path="/Exit" element={<Exit />} />
            <Route path="/Inventory"  element={<Inventory />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
     );
}
 
export default Routee;