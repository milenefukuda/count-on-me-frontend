import { useState } from "react";

export function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  function handleChange() {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <form>
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
      <label htmlFor="input-repeat-password">Repeat password:</label>
      <input
        id="input-repeat-password"
        type="repeat-password"
        value={form.repeatPassword}
        name="repeat-password"
        onChange={handleChange}
      />
    </form>
  );
}
