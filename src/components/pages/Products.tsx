import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./Products.css";
import carts from "../../assets/trustbag.png.png";
import { FiShare2 } from "react-icons/fi";
import { BsQuestionSquare } from "react-icons/bs";
import { FaCodeCompare } from "react-icons/fa6";

type ProductData = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  rating?: { rate: number; count: number };
  sizes?: string[];
  colors?: string[];
};

type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  size: string;
  color: string;
  qty: number;
};

const colorNames: Record<string, string> = {
  "#6ecbff": "Blue",
  "#ff6b6b": "Red",
  "#9be564": "Green",
};

const Products = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [fetchedProduct, setFetchedProduct] = useState<ProductData | null>(null);
  const product = location.state?.product ?? fetchedProduct;
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("");
  const [count, setCount] = useState(1);
  const [seconds, setSeconds] = useState(21587);

  // shopdan gelibse state-dən götürürük, yoxsa api-dən
  useEffect(() => {
    if (location.state?.product) {
      return;
    }

    const getProduct = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products/" + id);
        const data = await res.json();
        setFetchedProduct(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
  }, [id, location.state]);

  // sayğac
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!product) {
    return <p>Loading...</p>;
  }

  const sizes = product.sizes || ["S", "M", "L", "XL"];
  const colors = product.colors || ["#6ecbff", "#ff6b6b", "#9be564"];

  // rəng seçilməyibsə birincini götürürük
  const currentColor = color || colors[0];

  // ulduz sayı apidən gəlir, yoxdursa 4 götürürük
  const rate = product.rating ? Math.round(product.rating.rate) : 4;
  const reviews = product.rating ? product.rating.count : 3;

  // apidə köhnə qiymət yoxdu
  const oldPrice = product.price * 1.5;

  const formatTime = (sec: number) => {
    const days = Math.floor(sec / 86400);
    const hours = Math.floor((sec % 86400) / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const secs = sec % 60;

    return [days, hours, minutes, secs]
      .map((n) => String(n).padStart(2, "0"))
      .join(" : ");
  };

  const share = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link);
    alert("Link copied");
  };

  const addToCart = () => {
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

    // eyni mehsul varsa sayini artiririq
    const existing = cart.find(
      (item) =>
        item.id === product.id &&
        item.size === size &&
        item.color === currentColor
    );

    if (existing) {
      existing.qty += count;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        size: size,
        color: currentColor,
        qty: count,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // səbət ayrıca səhifədə açılır
    navigate("/cart");
  };

  return (
    <section className="pd">
      <button className="pd-back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="pd-wrap">
        <div className="pd-left">
          <div className="pd-thumbs">
            <img className="pd-thumb" src={product.image} alt="" />
          </div>
          <div className="pd-main">
            <img className="pd-img" src={product.image} alt={product.title} />
          </div>
        </div>

        <div className="pd-right">
          <p className="pd-brand">FASCO</p>

          <p className="pd-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star}>{star <= rate ? "★" : "☆"}</span>
            ))}{" "}
            ({reviews})
          </p>

          <div className="pd-price">
            <h2>${product.price.toFixed(2)}</h2>
            <del>${oldPrice.toFixed(2)}</del>
            <span className="pd-badge">SAVE 33%</span>
          </div>

          <p className="pd-viewers">24 people are viewing this right now</p>

          {seconds > 0 && (
            <div className="pd-countdown">
              <span>Hurry up! Sale ends in:</span>
              <span>{formatTime(seconds)}</span>
            </div>
          )}

          <p className="pd-stock">
            Only <b>9</b> item(s) left in stock!
          </p>
          <div className="pd-bar">
            <div className="pd-bar-fill"></div>
          </div>

          <h3>Size: {size}</h3>
          {sizes.map((s: string) => (
            <button
              key={s}
              className={s === size ? "pd-size active" : "pd-size"}
              onClick={() => setSize(s)}
            >
              {s}
            </button>
          ))}

          <h3>Color: {colorNames[currentColor] || currentColor}</h3>
          {colors.map((c: string) => (
            <button
              key={c}
              className={c === currentColor ? "pd-color active" : "pd-color"}
              style={{ background: c }}
              onClick={() => setColor(c)}
            ></button>
          ))}

          <h3>Quantity</h3>
          <div className="pd-buy">
            <div className="pd-qty">
              <button onClick={() => count > 1 && setCount(count - 1)}>-</button>
              <span>{count}</span>
              <button onClick={() => setCount(count + 1)}>+</button>
            </div>

            <button className="pd-add" onClick={addToCart}>
              Add to cart
            </button>
          </div>

          <div className="pd-links">
            <button><FaCodeCompare /> Compare</button>
            <button><BsQuestionSquare /> Ask a question</button>
            <button onClick={share}><FiShare2 /> Share</button>
          </div>

          <p className="pd-info">
            <b>Estimated Delivery:</b> Jul 30 - Aug 03
          </p>
          <p className="pd-info">
            <b>Free Shipping & Returns:</b> On all orders over $75
          </p>

          <div className="pd-secure">
            <img className="pd-cards" src={carts} alt="cards" />
            <p>Guarantee safe & secure checkout</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;