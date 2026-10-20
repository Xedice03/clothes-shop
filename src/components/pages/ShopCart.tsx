import { useEffect, useState } from "react";
import "./ShopCart.css";

type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  size: string;
  color: string;
  qty: number;
};

const ShopCart = () => {
  const [items, setItems] = useState<CartItem[]>(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );
  const [wrapped, setWrapped] = useState(false);

  // items dəyişəndə localStorage yenilənir
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const plus = (index: number) => {
    const newItems = [...items];
    newItems[index].qty = newItems[index].qty + 1;
    setItems(newItems);
  };

  const minus = (index: number) => {
    const newItems = [...items];
    if (newItems[index].qty > 1) {
      newItems[index].qty = newItems[index].qty - 1;
    }
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const checkout = () => {
    alert("Thank you for your order!");
    setItems([]);
    setWrapped(false);
  };

  let subtotal = 0;
  items.forEach((item) => {
    subtotal = subtotal + item.price * item.qty;
  });

  if (wrapped && items.length > 0) {
    subtotal = subtotal + 10;
  }

  return (
    <section className="cart">
      <h2>Shopping Cart</h2>
      <p className="cart-path">Home &gt; Your Shopping Cart</p>

      <div className="cart-row cart-head">
        <span>Product</span>
        <span>Price</span>
        <span>Quantity</span>
        <span className="right">Total</span>
      </div>

      {items.length === 0 && <p>Your cart is empty</p>}

      {items.map((item, index) => (
        <div className="cart-row" key={index}>
          <div className="cart-product">
            <img src={item.image} alt={item.title} />
            <div>
              <h4>{item.title}</h4>
              <p className="gray">Size : {item.size}</p>
              <p className="gray">
                Color : <span className="cart-color" style={{ background: item.color }}></span>
              </p>
              <button className="cart-remove" onClick={() => removeItem(index)}>
                Remove
              </button>
            </div>
          </div>

          <span>${item.price.toFixed(2)}</span>

          <div className="cart-qty">
            <button onClick={() => minus(index)}>-</button>
            <span>{item.qty}</span>
            <button onClick={() => plus(index)}>+</button>
          </div>

          <span className="right">${(item.price * item.qty).toFixed(2)}</span>
        </div>
      ))}

      <div className="cart-bottom">
        <label className="cart-wrap">
          <input
            type="checkbox"
            checked={wrapped}
            onChange={(e) => setWrapped(e.target.checked)}
          />{" "}
          For $10.00 Please Wrap The Product
        </label>

        <div className="cart-sub">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <button className="cart-checkout" onClick={checkout}>
          Checkout
        </button>
        <button className="cart-view" onClick={() => window.scrollTo(0, 0)}>
          View Cart
        </button>
      </div>
    </section>
  );
};

export default ShopCart;