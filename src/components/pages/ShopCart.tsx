import { useEffect, useMemo, useState } from "react";
import "./ShopCart.css";

type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  color: string;
  qty: number;
};

const CART_KEY = "cart";
const WRAP_PRICE = 10;

const getCartFromStorage = (): CartItem[] => {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Cart could not be read:", error);
    return [];
  }
};

const formatPrice = (value: number): string => `$${value.toFixed(2)}`;

type CartRowProps = {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

const CartRow = ({ item, onIncrease, onDecrease, onRemove }: CartRowProps) => {
  const price = Number(item.price);

  return (
    <div className="cart-row">
      <div className="cart-product">
        <img src={item.image} alt={item.title} />
        <div>
          <h4>{item.title}</h4>
          <p className="gray">Color : {item.color}</p>
          <button className="cart-remove" onClick={onRemove}>
            Remove
          </button>
        </div>
      </div>

      <span>{formatPrice(price)}</span>

      <div className="cart-qty">
        <button onClick={onDecrease} aria-label="Decrease quantity">
          -
        </button>
        <span>{String(item.qty).padStart(2, "0")}</span>
        <button onClick={onIncrease} aria-label="Increase quantity">
          +
        </button>
      </div>

      <span className="right">{formatPrice(price * item.qty)}</span>
    </div>
  );
};

const ShopCart = () => {
  const [items, setItems] = useState<CartItem[]>(getCartFromStorage);
  const [isWrapped, setIsWrapped] = useState<boolean>(false);

  // items dəyişəndə localStorage avtomatik yenilənir
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const changeQty = (id: number, step: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + step) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      alert("Your cart is empty");
      return;
    }
    alert("Thank you for your order!");
    setItems([]);
    setIsWrapped(false);
  };

  const subtotal = useMemo(() => {
    const itemsTotal = items.reduce(
      (sum, item) => sum + Number(item.price) * item.qty,
      0
    );
    return isWrapped && items.length > 0 ? itemsTotal + WRAP_PRICE : itemsTotal;
  }, [items, isWrapped]);

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

      {items.map((item) => (
        <CartRow
          key={item.id}
          item={item}
          onIncrease={() => changeQty(item.id, 1)}
          onDecrease={() => changeQty(item.id, -1)}
          onRemove={() => removeItem(item.id)}
        />
      ))}

      <div className="cart-bottom">
        <label className="cart-wrap">
          <input
            type="checkbox"
            checked={isWrapped}
            onChange={(e) => setIsWrapped(e.target.checked)}
          />{" "}
          For {formatPrice(WRAP_PRICE)} Please Wrap The Product
        </label>

        <div className="cart-sub">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <button className="cart-checkout" onClick={handleCheckout}>
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