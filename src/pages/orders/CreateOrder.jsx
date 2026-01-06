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
    <div className="order-container">
      <div className="order-card">

        <h2>Create Order</h2>
        <p className="subtitle">Select a product and quantity</p>

        {/* PRODUCT GRID */}
        <div className="product-grid">
          {products.map(p => (
            <div
              key={p.id}
              className={`product-card ${productId === p.id ? "active" : ""}`}
              onClick={() => setProductId(p.id)}
            >
              {/* ✅ IMAGE ADDED */}
              <img
                src={productImages[p.name] || "/images/default.jpg"}
                alt={p.name}
              />

              <h4>{p.name}</h4>
              <p className="price">₹ {p.price}</p>
            </div>
          ))}
        </div>

        {/* FORM */}
        <form onSubmit={placeOrder}>
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              required
            />
          </div>

          <button className="btn-primary" disabled={!productId}>
            Place Order
          </button>
        </form>

      </div>
    </div>
  );
}

export default CreateOrder;
