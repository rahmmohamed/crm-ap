import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, register } from "../features/auth/authSlice.js";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: "", password: "", name: "", role: "user" });
  const [isRegister, setIsRegister] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await dispatch(register(form)).unwrap();
        setIsRegister(false);
        navigate("/dashboard");
      } else {
        await dispatch(login(form)).unwrap();
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h2>{isRegister ? "Register" : "Login"}</h2>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <label>
              Name
              <input name="name" value={form.name} onChange={handleChange} required />
            </label>
          )}
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            Password
            <input name="password" type="password" value={form.password} onChange={handleChange} required />
          </label>
          {isRegister && (
            <label>
              Role
              <select name="role" value={form.role} onChange={handleChange}>
                <option value="user">User</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </label>
          )}

          <button type="submit" disabled={auth.status === "loading"}>
            {auth.status === "loading" ? "Saving..." : isRegister ? "Register" : "Login"}
          </button>
        </form>

        {auth.error && <div className="error">{auth.error}</div>}
        <button className="link-button" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Already have an account? Login" : "Create a new account"}
        </button>
      </div>
    </section>
  );
}

export default LoginPage;
