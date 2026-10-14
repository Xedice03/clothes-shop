import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsChevronLeft, BsChevronRight, BsStarFill, BsStar } from "react-icons/bs";
import "./Home.css";
import PeakyBlinders from "./PeakyBlinders";
import DealsOfMonth from "./DealsMonth";
import Instagram from "./FollowInst";
import img1 from "../pages/../../assets/image 2 28.png";
import img4 from "../pages/../../assets/image 227.png";
import img3 from "../pages/../../assets/frends.png";
import img2 from "../pages/../../assets/images.png";
import reyler1 from "../pages/../../assets/image (2).png"
import reyler2 from "../pages/../../assets/комент.png"
import reyler3 from "../pages/../../assets/women.koment.png"


type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  rating: { rate: number; count: number };
};

// API kateqoriya
const tabs = [
  { name: "Men’s Fashion", category: "men's clothing" },
  { name: "Women’s Fashion", category: "women's clothing" },
  { name: "Women Accessories", category: "jewelery" },
  { name: "Men Accessories", category: "electronics" },
  { name: "Discount Deals", category: "" },
];

// rəylər
const reviews = [
  {
    img: reyler1,
    text: "Items That I ordered were the best investment I ever made. I can't say enough about your quality service.",
    name: "Suzan B.",
    role: "UI Designer",
  },
  {
    img: reyler2,
    text: "You won't regret it. I would like to personally thank you for your outstanding product. Absolutely wonderful!",
    name: "James K.",
    role: "Traveler",
  },
  {
    img: reyler3,
    text: "Just what I was looking for. Thank you for making it painless, pleasant and most of all hassle free! All products are great.",
    name: "Megen W.",
    role: "Manager",
  },
];

// 5 ulduz (rəylər üçün)
function ReviewStars() {
  return (
    <div className="review-stars">
      {[0, 1, 2, 3, 4].map((n) => (
        <BsStarFill key={n} />
      ))}
    </div>
  );
}

function Home() {
  // New Arrivals (API)
  const [activeTab, setActiveTab] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  // neçə məhsul göstərilir (View More)
  const [count, setCount] = useState(6);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const category = tabs[activeTab].category;
  let shown = products;

  if (category) {
    shown = products.filter((p) => p.category === category);
  }

  const total = shown.length;
  shown = shown.slice(0, count);

  //  rəylər
  const [cards, setCards] = useState(reviews);

  const nextReview = () => {
    setCards([cards[1], cards[2], cards[0]]);
  };

  const prevReview = () => {
    setCards([cards[2], cards[0], cards[1]]);
  };

  return (
    <section>
      {/* Sale hissəsi */}
      <div className="container sale-wrap py-5">
        <div className="row g-3">
          {/* Sol şəkil */}
          <div className="col-12 col-lg-4">
            <div className="sale-box">
              <img src={img1} alt="Model" />
            </div>
          </div>

          {/* Orta hissə */}
          <div className="col-12 col-lg-4">
            <div className="sale-center text-center">
              <img src={img2} alt="New collection" className="sale-small-img1" />

              <div className="sale-content">
                <h2 className="sale-title">ULTIMATE</h2>
                <h2 className="sale-outline">SALE</h2>

                <p className="sale-subtitle">NEW COLLECTION</p>

                <Link to="/shop" className="sale-button">
                  SHOP NOW
                </Link>
              </div>

              <img src={img3} alt="Fashion collection" className="sale-small-img" />
            </div>
          </div>

          {/* Sağ şəkil */}
          <div className="col-12 col-lg-4">
            <div className="sale-box">
              <img src={img4} alt="Fashion model" />
            </div>
          </div>
        </div>
      </div>

      {/* Brendlər */}
      <div className="brands">
        <div className="container sale-wrap">
          <div className="brands-list">
            <span className="brand-chanel">CHANEL</span>
            <span className="brand-lv">LOUIS VUITTON</span>
            <span className="brand-prada">PRADA</span>
            <span className="brand-ck">Calvin Klein</span>
            <span className="brand-denim">DENIM</span>
          </div>
        </div>
      </div>

      {/* Deals Of The Month */}
      <DealsOfMonth />

      {/* New Arrivals */}
      <div className="container py-5">
        <div className="text-center mb-4">
          <h2 className="arrivals-title mb-3">New Arrivals</h2>
          <p className="small text-secondary mx-auto" style={{ maxWidth: "480px" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis
            ultricies sollicitudin aliquam sem. Scelerisque duis ultricies sollicitudin
          </p>
        </div>

        <div className="d-flex justify-content-center flex-wrap gap-3 mb-5">
          {tabs.map((tab, i) => (
            <button
              key={tab.name}
              type="button"
              className={i === activeTab ? "tab-btn active" : "tab-btn"}
              onClick={() => {
                setActiveTab(i);
                setCount(6);
              }}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className="row g-4">
          {shown.map((p) => (
            <div className="col-12 col-md-6 col-lg-4" key={p.id}>
              <div className="product-card">
                <div className="product-img">
                  <img src={p.image} alt={p.title} />
                </div>

                <div className="d-flex justify-content-between align-items-start mt-3">
                  <div>
                    <h6 className="mb-0">
                      {p.title.length > 14 ? p.title.slice(0, 14) + "..." : p.title}
                    </h6>
                    <span className="product-small">Al Karam</span>
                  </div>
                  <div className="stars">
                    {[0, 1, 2, 3, 4].map((n) =>
                      n < Math.round(p.rating.rate) ? (
                        <BsStarFill key={n} />
                      ) : (
                        <BsStar key={n} />
                      )
                    )}
                  </div>
                </div>

                <p className="product-small mt-3 mb-3">({p.rating.count}) Customer Reviews</p>

                <div className="d-flex justify-content-between align-items-center">
                  <span className="product-price">${p.price.toFixed(2)}</span>
                  <span className="sold-out">Almost Sold Out</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {count < total && (
          <button type="button" className="view-more" onClick={() => setCount(count + 3)}>
            View More
          </button>
        )}
      </div>
<section >
      {/* Peaky Blinders */}
      <PeakyBlinders />
</section>
      {/* instagram */}
      <Instagram />

      {/*  rəylər */}
      <div className="reviews">
        <div className="container">
          <h2>This Is What Our Customers Say</h2>
          <p className="reviews-sub">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis
          </p>

          <div className="reviews-slider">
            {["review-left", "review-center", "review-right"].map((cls, i) => (
              <div className={`review-card ${cls}`} key={cls}>
                <div className="review-photo">
                  <img src={cards[i].img} alt={cards[i].name} />
                </div>
                <div className="review-text">
                  <p>"{cards[i].text}"</p>
                  <ReviewStars />
                  <hr />
                  <h4>{cards[i].name}</h4>
                  <span>{cards[i].role}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="review-arrows">
            <button type="button" aria-label="Previous" onClick={prevReview}>
              <BsChevronLeft />
            </button>
            <button type="button" aria-label="Next" onClick={nextReview}>
              <BsChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;