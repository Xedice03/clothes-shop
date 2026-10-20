import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsSearch, BsPerson, BsBag, BsList } from "react-icons/bs";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  // menyu açıqdır (true), ya bağlı (false)
  const [open, setOpen] = useState(false);

  // axtarış açıqdır, ya bağlı
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  // keçidə basanda menyu bağlansın
  const close = () => setOpen(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchText.trim() === "") {
      return;
    }

    navigate("/shop?search=" + searchText.trim());
    setShowSearch(false);
    setSearchText("");
    close();
  };

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
            <button className="search-btn" type="button" onClick={() => setShowSearch(!showSearch)}>
              <BsSearch />
            </button>
            <Link to="/account" onClick={close}><BsPerson /></Link>
            <Link to="/cart" onClick={close}><BsBag /></Link>
          </div>
        </div>
      </div>

      {/* axtarış */}
      {showSearch && (
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            autoFocus
          />
          <button type="submit">Search</button>
        </form>
      )}
    </header>
  );
}

export default Header;