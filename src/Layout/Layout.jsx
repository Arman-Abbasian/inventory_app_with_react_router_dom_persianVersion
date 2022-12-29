import Footer from "./Footer";
import Header from "./Header";

const Layout = ({children}) => {
    return ( 
        <div className="lg:flex gap-4 p-4">
            <Header />
            {children}
        </div>
     );
}
 
export default Layout;