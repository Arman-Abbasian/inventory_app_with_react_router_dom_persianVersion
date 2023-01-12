import { Routes,Route } from "react-router-dom";
import PartInventory from "./pages/PartInventory";
import Enter from "./pages/Enter";
import Exit from "./pages/Exit";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PartInputs from "./pages/PartInputs";
import EnterList from "./pages/EnterList";
import ExitList from "./pages/ExitList";
import EnterItem from "./pages/EnterItem";
import ExitItem from "./pages/ExitItem";
import EnterItemDetail from "./pages/EnterItemDetail";
import ExitItemDetail from "./pages/ExitItemDetail";
import InventoryDetail from "./pages/InventoryDetail";
import ProductsInputs from "./pages/ProductsInputs";
import EnterOneProductItem from "./pages/EnterOneProducItem";
import ProductsInventory from "./pages/ProductsInventory";
import ExitOneProductItem from "./pages/ExitOneProductItem";
import EnterProductsList from "./pages/EnterProductsList";
import ExitProductsList from "./pages/ExitProductsList";


const Routee = () => {
    return ( 
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Enter" element={<Enter />} />
            <Route path="/Exit" element={<Exit />} />
            <Route path="/PartInventory"  element={<PartInventory />} />
            <Route path="/Inventory/:id"  element={<InventoryDetail />} />
            <Route path="/PartInputs"  element={<PartInputs />} />
            <Route path="/EnterList"  element={<EnterList />} />
            <Route path="/ExitList"  element={<ExitList />} />
            <Route path="/enter/:id"  element={<EnterItem />} />
            <Route path="/enter/detail/:id"  element={<EnterItemDetail />} />
            <Route path="/exit/:id"  element={<ExitItem />} />
            <Route path="/exit/detail/:id"  element={<ExitItemDetail />} />


            <Route path="/ProductsInputs"  element={<ProductsInputs />} />
            <Route path="/EnterOneProductItem"  element={<EnterOneProductItem />} />
            <Route path="/EnterProductsList"  element={<EnterProductsList />} />
            <Route path="/ExitOneProductItem"  element={<ExitOneProductItem />} />
            <Route path="/ExitProductsList"  element={<ExitProductsList />} />
            <Route path="/ProductsInventory"  element={<ProductsInventory />} />


            <Route path="/*" element={<NotFound />} />
        </Routes>
     );
}
 
export default Routee;