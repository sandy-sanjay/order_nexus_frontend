import { useState, useEffect } from "react";
import api from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import "../../styles/CreateOrder.css";

function CreateOrder() {

  // ✅ Product image mapping
  const productImages = {
    iphone: "/images/mobile.jpg",
    mobile: "/images/mobile.jpg",
    laptop: "/images/laptop.jpg",
    tablet: "/images/tablet.jpg",
  };

  // ✅ Safe image resolver
  const getProductImage = (name) => {
    if (!name) return "/images/default.png";
    const key = name.toLowerCase().trim();
    return productImages[key] || "/images/default.png";
  };

  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [result, setResult] = useState(null);

  const navigate = useNavigate();

  // 🔄 Load products
  useEffect(() => {
    api.get("http://localhost:8082/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  // 🛒 Place order
  const placeOrder = (e) => {
    e.preventDefault();

    if (!productId) {
      alert("Please select a product");
      return;
    }

    const orderData = {
      productId: Number(productId),
      quantity: Number(quantity)
    };

    api.post("http://localhost:8083/api/orders", orderData)
      .then(res => {
        const order = res.data;
        setResult(order);

        navigate("/payments", {
          state: {
            orderId: order.id,
            amount: order.price
          }
        });
      })
      .catch(() => setResult({ error: "Order failed" }));
  };

  return (
    <div className="order-container">
      <div className="order-card">
        <h2>Create Order</h2>
        <p className="subtitle">Select a product and place your order</p>

        {/* 🧱 PRODUCT GRID */}
        <div className="product-grid">
          {products.map(p => (
            <div
              key={p.id}
              className={`product-card ${productId === p.id ? "active" : ""}`}
              onClick={() => setProductId(p.id)}
            >
              <img
                src={getProductImage(p.name)}
                alt={p.name}
              />
              <h4>{p.name}</h4>
              <p className="price">₹ {p.price}</p>
            </div>
          ))}
        </div>

        {/* 📝 ORDER FORM */}
        <form onSubmit={placeOrder}>
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              min="1"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            Place Order
          </button>
        </form>

        {/* ✅ SUCCESS */}
        {result?.id && (
          <div className="success-box">
            ✅ Order placed successfully <br />
            Order ID: <b>{result.id}</b>
          </div>
        )}

        {/* ❌ ERROR */}
        {result?.error && (
          <div className="error-box">
            ❌ {result.error}
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateOrder;
