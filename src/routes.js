import { Routes,Route } from "react-router-dom";
import Inventory from "./pages/Inventory";
import Enter from "./pages/Enter";
import Exit from "./pages/Exit";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Inputs from "./pages/Inputs";
import EnterList from "./pages/EnterList";
import ExitList from "./pages/ExitList";
import EnterItem from "./pages/EnterItem";
import ExitItem from "./pages/ExitItem";


const Routee = () => {
    return ( 
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Enter" element={<Enter />} />
            <Route path="/Exit" element={<Exit />} />
            <Route path="/Inventory"  element={<Inventory />} />
            <Route path="/Inputs"  element={<Inputs />} />
            <Route path="/EnterList"  element={<EnterList />} />
            <Route path="/ExitList"  element={<ExitList />} />
            <Route path="/enter/:id"  element={<EnterItem />} />
            <Route path="/exit/:id"  element={<ExitItem />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
     );
}
 
export default Routee;