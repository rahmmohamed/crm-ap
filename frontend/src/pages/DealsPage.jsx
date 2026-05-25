import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeals, addDeal } from "../features/deals/dealsSlice.js";
import { fetchCustomers } from "../features/customers/customersSlice.js";
import { fetchProducts } from "../features/products/productsSlice.js";

function DealsPage() {
  const dispatch = useDispatch();
  const deals = useSelector((state) => state.deals.items);
  const customers = useSelector((state) => state.customers.items);
  const products = useSelector((state) => state.products.items);
  const dealStatus = useSelector((state) => state.deals.status);
  const [form, setForm] = useState({ customer_id: "", product_id: "", title: "", value: "" });

  useEffect(() => {
    if (dealStatus === "idle") {
      dispatch(fetchDeals());
    }
    if (customers.length === 0) {
      dispatch(fetchCustomers());
    }
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, dealStatus, customers.length, products.length]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      addDeal({
        customer_id: Number(form.customer_id),
        product_id: Number(form.product_id),
        title: form.title,
        value: Number(form.value),
      })
    ).unwrap();
    setForm({ customer_id: "", product_id: "", title: "", value: "" });
  };

  return (
    <section className="resource-page">
      <div className="resource-form">
        <h2>Create Deal</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Customer
            <select name="customer_id" value={form.customer_id} onChange={handleChange} required>
              <option value="">Choose one</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Product
            <select name="product_id" value={form.product_id} onChange={handleChange} required>
              <option value="">Choose one</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Title
            <input name="title" value={form.title} onChange={handleChange} required />
          </label>
          <label>
            Value
            <input name="value" type="number" value={form.value} onChange={handleChange} required />
          </label>
          <button type="submit">Add Deal</button>
        </form>
      </div>

      <div className="resource-list">
        <h2>Deals</h2>
        {dealStatus === "loading" && <p>Loading...</p>}
        <ul>
          {deals.map((deal) => (
            <li key={deal.id}>
              <strong>{deal.title}</strong>
              <span>Value: ${deal.value}</span>
              <span>Customer ID: {deal.customer_id}</span>
              <span>Product ID: {deal.product_id}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default DealsPage;
