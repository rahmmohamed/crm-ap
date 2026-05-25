import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers, addCustomer } from "../features/customers/customersSlice.js";

function CustomersPage() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.customers);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCustomers());
    }
  }, [dispatch, status]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addCustomer(form)).unwrap();
    setForm({ name: "", email: "", phone: "" });
  };

  return (
    <section className="resource-page">
      <div className="resource-form">
        <h2>Create Customer</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            Phone
            <input name="phone" value={form.phone} onChange={handleChange} required />
          </label>
          <button type="submit">Add Customer</button>
        </form>
      </div>

      <div className="resource-list">
        <h2>Customers</h2>
        {status === "loading" && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        <ul>
          {items.map((customer) => (
            <li key={customer.id}>
              <strong>{customer.name}</strong>
              <span>{customer.email}</span>
              <span>{customer.phone}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default CustomersPage;
