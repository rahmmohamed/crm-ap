import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../features/customers/customersSlice.js";
import { fetchProducts } from "../features/products/productsSlice.js";
import { fetchDeals } from "../features/deals/dealsSlice.js";
import { logout } from "../features/auth/authSlice.js";

function DashboardPage() {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers.items);
  const products = useSelector((state) => state.products.items);
  const deals = useSelector((state) => state.deals.items);

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchProducts());
    dispatch(fetchDeals());
  }, [dispatch]);

  return (
    <section className="dashboard-page">
      <div className="dashboard-header">
        <h2>Welcome to your CRM</h2>
        <button className="danger" onClick={() => dispatch(logout())}>
          Logout
        </button>
      </div>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Customers</h3>
          <p>{customers.length}</p>
        </div>
        <div className="dashboard-card">
          <h3>Products</h3>
          <p>{products.length}</p>
        </div>
        <div className="dashboard-card">
          <h3>Deals</h3>
          <p>{deals.length}</p>
        </div>
      </div>
    </section>
  );
}

export default DashboardPage;
