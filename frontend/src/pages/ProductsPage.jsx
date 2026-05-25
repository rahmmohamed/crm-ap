import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addProduct } from "../features/products/productsSlice.js";

function ProductsPage() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  const [form, setForm] = useState({ name: "", price: "", stock: "" });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addProduct({
      name: form.name,
      price: Number(form.price),
      stock: Number(form.stock),
    })).unwrap();
    setForm({ name: "", price: "", stock: "" });
  };

  return (
    <section className="resource-page">
      <div className="resource-form">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Price
            <input name="price" type="number" value={form.price} onChange={handleChange} required />
          </label>
          <label>
            Stock
            <input name="stock" type="number" value={form.stock} onChange={handleChange} required />
          </label>
          <button type="submit">Add Product</button>
        </form>
      </div>

      <div className="resource-list">
        <h2>Products</h2>
        {status === "loading" && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        <ul>
          {items.map((product) => (
            <li key={product.id}>
              <strong>{product.name}</strong>
              <span>${product.price}</span>
              <span>Stock: {product.stock}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ProductsPage;
