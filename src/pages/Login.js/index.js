import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../api/api.js";
import { AuthContext } from "../../contexts/authContext.js";

export function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setLoggedInUser } = useContext(AuthContext);
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post("/login", form);
      setLoggedInUser({ ...response.data });
      console.log(response);
      localStorage.setItem("loggedInUser", JSON.stringify(response.data)),
        navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div>
        <h1>LOGIN HERE</h1>
        <form onSubmit={handleSubmit}>
          <label>EMAIL</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="email"
          />
          <label>PASSWORD</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="email"
          />
          <div>
            <button>Login!</button>
            <Link to="/signup">
              <button>Sign up!</button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
