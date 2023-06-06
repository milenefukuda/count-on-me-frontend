import { useState } from "react";
import { api } from "../../api/api.js";
import { Link } from "react-router-dom";
import { NavBar } from "../../components/NavBar/index.js";

export function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post("/sign-up", form);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <NavBar />
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-email">Email:</label>
        <input
          id="input-email"
          type="email"
          value={form.email}
          name="email"
          onChange={handleChange}
        />
        <label htmlFor="input-password">Password:</label>
        <input
          id="input-password"
          type="password"
          value={form.password}
          name="password"
          onChange={handleChange}
        />
        <label htmlFor="input-repeatPassword">Repeat password:</label>
        <input
          id="input-repeatPassword"
          type="repeatPassword"
          value={form.repeatPassword}
          name="repeatPassword"
          onChange={handleChange}
        />
        <button>Sign Up</button>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </form>
    </>
  );
}
