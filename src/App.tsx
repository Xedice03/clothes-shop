import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import Shop from "./components/pages/Shop";
import PeakyBlinders from "./components/pages/PeakyBlinders";



export function App() {
  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        {/* <Route path="/products" element={<Products />} /> */}
         <Route path="/peaky" element={<PeakyBlinders />} />
      </Routes>
      <Footer />
      </BrowserRouter>
    </>
  );
}