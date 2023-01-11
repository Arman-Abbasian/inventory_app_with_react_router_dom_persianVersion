import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="lg:flex gap-4">
      <Header />
        {children}
    </div>
  );
};

export default Layout;
