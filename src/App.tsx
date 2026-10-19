import { Routes, Route, BrowserRouter, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import Shop from "./components/pages/Shop";
import Products from "./components/pages/Products";
import PeakyBlinders from "./components/pages/PeakyBlinders";
import ShopCart from "./components/pages/ShopCart";
// import  Account from "./components/pages/Account";

// header və footer olan səhifələr
function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/products" element={<Shop />} />
          <Route path="/products/:id" element={<Products />} />
          <Route path="/peaky" element={<PeakyBlinders />} /> 
          <Route path="/cart" element={<ShopCart />} />
          {/* <Route path="/account" element={<Account />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}