import { useEffect, useState } from "react";
import "../../styles/Products.css";
import productApi from "../../api/productApi";



function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 🔹 EDIT STATE
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editQty, setEditQty] = useState("");
  const [editImage, setEditImage] = useState(null);

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

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("quantity", quantity);
    if (image) {
      formData.append("image", image);
    }

    productApi.create(formData).then(() => {
      setName("");
      setPrice("");
      setQuantity("");
      setImage(null);
      // Reset file input
      const fileInput = document.getElementById("product-image-upload");
      if (fileInput) fileInput.value = "";
      loadProducts();
    }).catch(err => {
      console.error("Add product failed", err);
      alert("Failed to add product");
    });
  };

  // 🔹 Delete product
  const deleteProduct = (id) => {
    if (!window.confirm("Delete product?")) return;
    productApi.remove(id).then(() => loadProducts());
  };

  // 🔹 SAVE PRODUCT (EDIT)
  const saveEdit = () => {
    if (!selectedProduct) {
      alert("No product selected");
      return;
    }

    if (!editName || !editPrice || editQty === "") {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", editName);
    formData.append("price", editPrice);
    formData.append("quantity", editQty);
    if (editImage) {
      formData.append("image", editImage);
    }

    productApi
      .update(selectedProduct.id, formData)
      .then(() => {
        setShowModal(false);
        setSelectedProduct(null);
        setEditName("");
        setEditPrice("");
        setEditQty("");
        setEditImage(null);
        loadProducts();
      })
      .catch(err => {
        console.error(err);
        alert("Product update failed");
      });
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

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

          <input
            id="product-image-upload"
            type="file"
            accept="image/*"
            onChange={e => setImage(e.target.files[0])}
            style={{ padding: "10px" }}
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
            <th>Image</th>
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
              <td>
                {p.imageUrl ? (
                  <img
                    src={`http://localhost:8080${p.imageUrl}`}
                    alt={p.name}
                    style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }}
                  />
                ) : (
                  <span style={{ color: "#ccc" }}>No Image</span>
                )}
              </td>
              <td>₹ {p.price}</td>
              <td>{p.quantity}</td>
              <td>
                <button
                  type="button"
                  className="edit"
                  onClick={() => {
                    setSelectedProduct(p);
                    setEditName(p.name);
                    setEditPrice(p.price);
                    setEditQty(p.quantity);
                    setEditImage(null);
                    setShowModal(true);
                  }}
                >
                  Edit
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
            <h3>Edit Product</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <label>Name:</label>
              <input
                type="text"
                placeholder="Product Name"
                value={editName}
                onChange={e => setEditName(e.target.value)}
              />

              <label>Price:</label>
              <input
                type="number"
                placeholder="Price"
                value={editPrice}
                onChange={e => setEditPrice(e.target.value)}
              />

              <label>Stock Quantity:</label>
              <input
                type="number"
                placeholder="Stock Quantity"
                value={editQty}
                onChange={e => setEditQty(e.target.value)}
              />

              <label>Change Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={e => setEditImage(e.target.files[0])}
              />
            </div>

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
                onClick={saveEdit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Products;