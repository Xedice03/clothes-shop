import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./Products.css";

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

function Products() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [fetchedProduct, setFetchedProduct] = useState<ProductData | null>(null);
  const product = location.state?.product ?? fetchedProduct;
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("");
  const [count, setCount] = useState(1);
  const [liked, setLiked] = useState(false);
  const [seconds, setSeconds] = useState(21587);

  // shopdan gelibse state-dən götürürük, yoxsa api-dən
  useEffect(() => {
    if (location.state?.product) {
      return;
    }

    fetch("https://fakestoreapi.com/products/" + id)
      .then((res) => res.json())
      .then((data) => setFetchedProduct(data));
  }, [id, location.state]);

  // sayğac
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => {
        if (s > 0) {
          return s - 1;
        }
        return 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!product) {
    return <p>Loading...</p>;
  }

  let sizes = ["S", "M", "L", "XL"];
  if (product.sizes) {
    sizes = product.sizes;
  }

  let colors = ["#6ecbff", "#ff6b6b", "#9be564"];
  if (product.colors) {
    colors = product.colors;
  }

  // rəng seçilməyibsə birincini götürürük
  let currentColor = color;
  if (currentColor === "") {
    currentColor = colors[0];
  }

  function getColorName(c: string) {
    if (c === "#6ecbff") {
      return "Blue";
    }
    if (c === "#ff6b6b") {
      return "Red";
    }
    if (c === "#9be564") {
      return "Green";
    }
    return c;
  }

  let rate = 4;
  let reviews = 3;
  if (product.rating) {
    rate = Math.round(product.rating.rate);
    reviews = product.rating.count;
  }

  // apidə köhnə qiymət yoxdu
  const oldPrice = product.price * 1.5;

  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  function pad(n: number) {
    if (n < 10) {
      return "0" + n;
    }
    return "" + n;
  }

  function minus() {
    if (count > 1) {
      setCount(count - 1);
    }
  }

  function plus() {
    setCount(count + 1);
  }

  function share() {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied");
  }

  function addToCart() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // eyni mehsul varsa sayini artiririq
    let found = false;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === product.id && cart[i].size === size && cart[i].color === currentColor) {
        cart[i].qty = cart[i].qty + count;
        found = true;
      }
    }

    if (found === false) {
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
  }

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

          <div className="pd-title-row">
            <h1>{product.title}</h1>
            <button className="pd-wish" onClick={() => setLiked(!liked)}>
              {liked ? "★" : "☆"}
            </button>
          </div>

          <p className="pd-rating">
            {"★".repeat(rate)}
            {"☆".repeat(5 - rate)} ({reviews})
          </p>

          <div className="pd-price">
            <h2>${product.price.toFixed(2)}</h2>
            <del>${oldPrice.toFixed(2)}</del>
            <span className="pd-badge">SAVE 33%</span>
          </div>

          <p className="pd-viewers">👁 24 people are viewing this right now</p>

          {seconds > 0 && (
            <div className="pd-countdown">
              <span>Hurry up! Sale ends in:</span>
              <span>
                {pad(days)} : {pad(hours)} : {pad(minutes)} : {pad(secs)}
              </span>
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

          <h3>Color: {getColorName(currentColor)}</h3>
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
              <button onClick={minus}>-</button>
              <span>{count}</span>
              <button onClick={plus}>+</button>
            </div>

            <button className="pd-add" onClick={addToCart}>
              Add to cart
            </button>
          </div>

          <div className="pd-links">
            <button>⇅ Compare</button>
            <button>? Ask a question</button>
            <button onClick={share}>⤴ Share</button>
          </div>

          <p className="pd-info">
             <b>Estimated Delivery:</b> Jul 30 - Aug 03
          </p>
          <p className="pd-info">
             <b>Free Shipping & Returns:</b> On all orders over $75
          </p>

          <div className="pd-secure">
            <div className="pd-cards">
              <span>VISA</span>
              <span>MC</span>
              <span>AMEX</span>
              <span>JCB</span>
            </div>
            <p>Guarantee safe & secure checkout</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Products;