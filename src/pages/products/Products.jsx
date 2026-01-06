import { useEffect, useState } from "react";
import "../../styles/Products.css";
import productApi from "../../api/productApi";



function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stockQty, setStockQty] = useState("");

  // 🔹 Load products
  const loadProducts = () => {
    productApi
      .getAll()
      .then(res => setProducts(res.data))
      .catch(err => {
        console.error(err);
        setProducts([]);
      });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // 🔹 Add product
  const addProduct = (e) => {
    e.preventDefault();

    productApi.create({
      name,
      price: Number(price),
      quantity: Number(quantity),
    }).then(() => {
      setName("");
      setPrice("");
      setQuantity("");
      loadProducts();
    });
  };

  // 🔹 Delete product
  const deleteProduct = (id) => {
    if (!window.confirm("Delete product?")) return;
    productApi.remove(id).then(() => loadProducts());
  };

  // 🔹 SAVE STOCK (🔥 MAIN FIX)
  const saveStock = () => {
    console.log("TOKEN:", localStorage.getItem("token"));


    if (!selectedProduct) {
      alert("No product selected");
      return;
    }

    if (!stockQty || Number(stockQty) <= 0) {
      alert("Enter valid stock quantity");
      return;
    }

    productApi
      .updateStock(selectedProduct.id, Number(stockQty))
      .then(() => {
        setShowModal(false);
        setSelectedProduct(null);
        setStockQty("");
        loadProducts(); // 🔥 REQUIRED
      })
      .catch(err => {
        console.error(err);
        alert("Stock update failed");
      });
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  console.log("🔄 Products render | showModal =", showModal, "selectedProduct =", selectedProduct);


  return (
    <div className="products-page">

      <h1 className="page-title">Products</h1>

      {/* ADD PRODUCT */}
      <div className="add-product-card">
        <h2>Add Product</h2>

        <form className="add-product-form" onSubmit={addProduct}>
          <input
            placeholder="Name"
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
            placeholder="Qty"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            required
          />

          <button>Add</button>
        </form>
      </div>

      {/* SEARCH */}
      <input
        className="search-box"
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* TABLE */}
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
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>₹ {p.price}</td>
              <td>{p.quantity}</td>
              <td>
              <button
                  type="button"
                  className="edit"
                  onClick={() => {
                    console.log("✅ Add Stock button CLICKED", p);

                    // 🔥 defer modal open to avoid race condition
                    Promise.resolve().then(() => {
                      setSelectedProduct(p);
                      setStockQty("");
                      setShowModal(true);
                    });
                  }}
                >
                  Add Stock
                </button>

                <button
                  className="delete"
                  onClick={() => deleteProduct(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {showModal && (
  <div className="custom-modal">
    <div className="custom-modal-box">
      <h3>Add Stock</h3>

      <input
        type="number"
        placeholder="Enter quantity"
        value={stockQty}
        onChange={e => setStockQty(e.target.value)}
        autoFocus
      />

      <div className="modal-actions">
        <button
          type="button"
          className="cancel-btn"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>

        <button
          type="button"
          className="save-btn"
          onClick={saveStock}
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default Products;