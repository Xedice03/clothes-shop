import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import Shop from "./components/pages/Shop";
import Products from "./components/pages/Products";
import PeakyBlinders from "./components/pages/PeakyBlinders";
import ShopCart from "./components/pages/ShopCart";
import Account from "./components/pages/Account";

export function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/products" element={<Shop />} />
        <Route path="/products/:id" element={<Products />} />
        <Route path="/peaky" element={<PeakyBlinders />} />
        <Route path="/cart" element={<ShopCart />} />
        <Route path="/account" element={<Account />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}