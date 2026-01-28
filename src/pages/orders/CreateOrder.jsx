import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/CreateOrder.css";
import productApi from "../../api/productApi";
import orderApi from "../../api/OrderApi";

function CreateOrder() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(null);
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();

  // 🔹 Product name → image mapping
  const productImages = {
    Mobile: "/images/mobile.jpg",
    Laptop: "/images/laptop.jpg",
    Tablet: "/images/tablet.jpg",
  };

  useEffect(() => {
    productApi.getAll().then(res => setProducts(res.data));
  }, []);

  const placeOrder = (e) => {
    e.preventDefault();

    orderApi.create({
      productId: Number(productId),
      quantity: Number(quantity),
    }).then(res => {
      navigate("/payments", {
        state: {
          orderId: res.data.id,
          amount: res.data.price,
        },
      });
    });
  };

  return (
    <div className="amazon-layout">

      <main className="amazon-main">
        <div className="product-grid">
          {products.map(p => (
            <div
              key={p.id}
              className={`product-card ${productId === p.id ? "active" : ""}`}
              onClick={() => setProductId(p.id)}
            >
              <div className="image-container">
                <img
                  src={p.imageUrl ? `http://localhost:8080${p.imageUrl}` : (productImages[p.name] || "/images/default.jpg")}
                  alt={p.name}
                />
              </div>
              <div className="product-info">
                <h4>{p.name}</h4>
                <p className="price">₹{p.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 🟡 STICKY ORDER BAR */}
        {productId && (
          <div className="order-summary-bar">
            <span>Selected Item: <strong>{products.find(p => p.id === productId)?.name}</strong></span>
            <div className="action-area">
              <input
                type="number"
                placeholder="Qty"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
              />
              <button className="amazon-btn" onClick={placeOrder}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default CreateOrder;
