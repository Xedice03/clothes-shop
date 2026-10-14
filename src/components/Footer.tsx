import { Link } from "react-router-dom";
import "./Footer.css";
import right from "./pages/../../assets/image 2.png"
import left from "./pages/../../assets/image 3.png"

function Footer() {
  return (
    <footer>
      {/* Newsletter hissəsi */}
      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-3 d-none d-lg-block">
            <img src={right} alt="Model" className="img-fluid" />
          </div>

          <div className="col-12 col-lg-6 text-center">
            <h2 className="newsletter-title mb-4">Subscribe To Our Newsletter</h2>
            <p className="small text-secondary mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis
              ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin
            </p>

            <input
              type="email"
              className="form-control form-control-lg border-0 shadow-sm mb-4"
              placeholder="michael@ymail.com"
            />
            <button type="button" className="btn btn-dark px-4 shadow">
              Subscribe Now
            </button>
          </div>

          <div className="col-lg-3 d-none d-lg-block">
            <img src={left} alt="Model" className="img-fluid" />
          </div>
        </div>
      </section>

      {/* Alt hissə */}
      <div className="border-top">
        <div className="container py-4">
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/" className="footer-logo text-decoration-none text-secondary fs-4">
              FASCO
            </Link>

            <ul className="list-unstyled d-flex gap-4 gap-lg-5 mb-0">
              <li><Link to="/" className="footer-link small text-secondary text-decoration-none">Home</Link></li>
              <li><Link to="/shop" className="footer-link small text-secondary text-decoration-none">Shop</Link></li>
              <li><Link to="/products" className="footer-link small text-secondary text-decoration-none">Products</Link></li>
              <li><Link to="/about" className="footer-link small text-secondary text-decoration-none">Pages</Link></li>
            </ul>
          </div>

          <p className="text-center text-secondary mt-4 mb-0" style={{ fontSize: "11px" }}>
            Copyright © 2022 FASCO . All Rights Reseved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;