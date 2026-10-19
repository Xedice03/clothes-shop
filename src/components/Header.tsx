import { useState } from "react";
import { Link } from "react-router-dom";
import { BsSearch, BsPerson, BsBag, BsList } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa";
import "./Header.css";

function Header() {
  // menyu açıqdır (true), ya bağlı (false)
  const [open, setOpen] = useState(false);

  // keçidə basanda menyu bağlansın
  const close = () => setOpen(false);

  return (
    <header className="header">
      <div className="header-wrap">
        {/* logo */}
        <Link className="logo" to="/" onClick={close}>
          FASCO
        </Link>

        {/* hamburger düyməsi */}
        <button className="menu-btn" type="button" onClick={() => setOpen(!open)}>
          <BsList />
        </button>

        {/* menyu */}
        <div className={open ? "menu open" : "menu"}>
          <ul className="menu-list">
            <li>
              <Link to="/" onClick={close}>Home</Link>
            </li>
            <li>
              <Link to="/Shop" onClick={close}>Shop</Link>
            </li>
            <li>
              <Link to="/products" onClick={close}>Products</Link>
            </li>
          </ul>

          {/* ikonlar */}
          <div className="icons">
            <Link to="/search" onClick={close}><BsSearch /></Link>
            <Link to="/account" onClick={close}><BsPerson /></Link>
            <Link to="/star" onClick={close}><FaRegStar /></Link>
            <Link to="/cart" onClick={close}><BsBag /></Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;