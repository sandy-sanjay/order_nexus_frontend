import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import "../../styles/Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  // Add product
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  // Stock modal
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stockQty, setStockQty] = useState("");

  const loadProducts = () => {
    api.get("http://localhost:8082/api/products")
      .then(res => setProducts(res.data));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const addProduct = (e) => {
    e.preventDefault();
    api.post("http://localhost:8082/api/products", {
      name,
      price: Number(price),
      quantity: Number(quantity)
    }).then(() => {
      setName("");
      setPrice("");
      setQuantity("");
      loadProducts();
    });
  };

  const deleteProduct = (id) => {
    if (!window.confirm("Delete this product?")) return;
    api.delete(`http://localhost:8082/api/products/${id}`)
      .then(() => loadProducts());
  };

  const openStockModal = (product) => {
    setSelectedProduct(product);
    setStockQty("");
    setShowModal(true);
  };

  const saveStock = () => {
    api.put(`http://localhost:8082/api/products/${selectedProduct.id}`, {
      quantity: Number(stockQty)
    }).then(() => {
      setShowModal(false);
      setSelectedProduct(null);
      setStockQty("");
      loadProducts();
    });
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="products-page">

      {/* 🔹 PAGE TITLE */}
      {/* <h1 className="page-title">Products</h1> */}

      {/* 🔹 ADD PRODUCT */}
      <div className="add-product-card">
        <h2>Add Product</h2>

        <form className="add-product-form" onSubmit={addProduct}>
          <input
            placeholder="Product Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            required
          />

          <button type="submit">Add</button>
        </form>
      </div>

      {/* 🔹 SEARCH */}
      <input
        className="search-box"
        placeholder="Search products..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* 🔹 TABLE */}
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map(p => (
            <tr key={p.id}>
              <td className="center">{p.id}</td>
              <td>{p.name}</td>
              <td className="center">₹ {p.price}</td>
              <td className="center">{p.quantity}</td>
              <td className="center action-cell">
                <button className="edit" onClick={() => openStockModal(p)}>
                  Add Stock
                </button>
                <button className="delete" onClick={() => deleteProduct(p.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔹 STOCK MODAL */}
      {showModal && (
        <div className="modal">
          <div className="modal-box">
            <h3>Add Stock</h3>
            <p><b>{selectedProduct?.name}</b></p>

            <input
              type="number"
              placeholder="Enter quantity"
              value={stockQty}
              onChange={e => setStockQty(e.target.value)}
            />

            <button onClick={saveStock}>Save</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Products;
