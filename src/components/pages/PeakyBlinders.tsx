import { BsAward, BsShieldCheck, BsBoxSeam, BsHeadset } from "react-icons/bs";
import "./PeakyBlinders.css";
import personModel from "../pages/../../assets/image (1).png";
import point1 from "../pages/../../assets/point.png";
import point2 from "../pages/../../assets/point4.png";
import point3 from "../pages/../../assets/point (1).png";
import point4 from "../pages/../../assets/point2.png";
import point5 from "../pages/../../assets/point (2).png";

function PeakyBlinders() {
  return (
    <div className="container">
      <div className="peaky">
        <div className="peaky-product d-flex flex-column flex-md-row">
          <div className="peaky-stage">
            <img className="peaky-model" src={personModel} alt="Peaky Blinders" />
            <img
              className="point-img"
              src={point1}
              alt="Flat Cap"
              style={{ top: "4%", left: "45%" }}
            />
            <img
              className="point-img point-img-left"
              src={point2}
              alt="Suspender"
              style={{ top: "23%", left: "37%" }}
            />
            <img
              className="point-img"
              src={point3}
              alt="Hugo Boss"
              style={{ top: "30%", left: "46%" }}
            />
            <img
              className="point-img point-img-left"
              src={point4}
              alt="Hugo Boss"
              style={{ top: "50%", left: "36%" }}
            />
            <img
              className="point-img"
              src={point5}
              alt="Santoni"
              style={{ top: "84%", left: "42%" }}
            />
          </div>

          <div className="peaky-right">
            <small>Women Collection</small>
            <h1>Peaky Blinders</h1>
            <u>DESCRIPTION</u>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis.
            </p>
            <div className="peaky-size">
              Size: <span>M</span>
            </div>
            <div className="peaky-price">
              $100<i>.00</i>
            </div>
            <button type="button" className="peaky-btn">
              Buy Now
            </button>
          </div>
        </div>

        {/* üstünlüklər */}
        <div className="peaky-features d-flex flex-column flex-md-row justify-content-between gap-4">
          <div className="peaky-f d-flex align-items-center gap-3">
            <BsAward />
            <div>
              <b>High Quality</b>
              <span>crafted from top materials</span>
            </div>
          </div>
          <div className="peaky-f d-flex align-items-center gap-3">
            <BsShieldCheck />
            <div>
              <b>Warranty Protection</b>
              <span>Over 2 years</span>
            </div>
          </div>
          <div className="peaky-f d-flex align-items-center gap-3">
            <BsBoxSeam />
            <div>
              <b>Free Shipping</b>
              <span>Order over 150 $</span>
            </div>
          </div>
          <div className="peaky-f d-flex align-items-center gap-3">
            <BsHeadset />
            <div>
              <b>24 / 7 Support</b>
              <span>Dedicated support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PeakyBlinders;