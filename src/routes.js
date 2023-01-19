import { Routes,Route } from "react-router-dom";
import PartInventory from "./pages/PartInventory";
import PartEnterInput from "./pages/PartEnterInput";
import PartExitInput from "./pages/PartExitInput";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PartInputs from "./pages/PartInputs";
import PartEnterList from "./pages/PartEnterList";
import PartExitList from "./pages/PartExitList";
import PartEnterEditInput from "./pages/PartEnterEditInput";
import PartExitEditInput from "./pages/PartExitEditInput";
import PartEnterItemDetail from "./pages/PartEnterItemDetail";
import PartExitItemDetail from "./pages/PartExitItemDetail";
import InventoryDetail from "./pages/InventoryDetail";
import ProductsInputs from "./pages/ProductsInputs";
import EnterOneProductItem from "./pages/EnterOneProducItem";
import ProductsInventory from "./pages/ProductsInventory";
import ExitOneProductItem from "./pages/ExitOneProductItem";
import EnterProductsList from "./pages/EnterProductsList";
import ExitProductsList from "./pages/ExitProductsList";
import PurchaseRequest from "./pages/PurchaseRequest";
import Purchasing from "./pages/Purchasing";
import PurchasingRequestList from "./pages/PurchasingRequestList";
import PurchasingItemDetail from "./pages/PurchasingItemDetail";
import PurchaseRequestItemEdit from "./pages/PurchaseRequestItemEdit";
import OtherPalletesConditon from "./pages/OtherpalletesConditon";


const Routee = () => {
    return ( 
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/PartEnterInput" element={<PartEnterInput />} />
            <Route path="/PartExitInput" element={<PartExitInput />} />
            <Route path="/PartInventory"  element={<PartInventory />} />
            <Route path="/Inventory/:id"  element={<InventoryDetail />} />
            <Route path="/PartInputs"  element={<PartInputs />} />
            <Route path="/PartEnterList"  element={<PartEnterList />} />
            <Route path="/partEnter/:id"  element={<PartEnterEditInput />} />
            <Route path="/partEnter/detail/:id"  element={<PartEnterItemDetail />} />
            <Route path="/partExitList"  element={<PartExitList />} />
            <Route path="/PartExit/:id"  element={<PartExitEditInput />} />
            <Route path="/PartExit/detail/:id"  element={<PartExitItemDetail />} />


            <Route path="/ProductsInputs"  element={<ProductsInputs />} />
            <Route path="/EnterOneProductItem"  element={<EnterOneProductItem />} />
            <Route path="/EnterProductsList"  element={<EnterProductsList />} />
            <Route path="/ExitOneProductItem"  element={<ExitOneProductItem />} />
            <Route path="/ExitProductsList"  element={<ExitProductsList />} />
            <Route path="/ProductsInventory"  element={<ProductsInventory />} />

            <Route path="/PurchaseRequest"  element={<PurchaseRequest />} />
            <Route path="/Purchasing"  element={<Purchasing />} />
            <Route path="/PurchasingRequestList"  element={<PurchasingRequestList />} />
            <Route path="/PurchasingRequestList/:id"  element={<PurchasingItemDetail />} />
            <Route path="/PurchaseRequestItemEdit/:id"  element={<PurchaseRequestItemEdit />} />


            <Route path="/OtherPalletesConditon"  element={<OtherPalletesConditon />} />


            <Route path="/*" element={<NotFound />} />
        </Routes>
     );
}
 
export default Routee;