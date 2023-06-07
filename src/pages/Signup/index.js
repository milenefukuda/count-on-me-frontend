import { useState } from "react";
import { api } from "../../api/api.js";
import { Link } from "react-router-dom";
import { NavBar } from "../../components/NavBar/index.js";
import { Footer } from "../../components/Footer/index.js";

export function Signup() {
  const [form, setForm] = useState({
    name: "",
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
      const response = await api.post("/signup", form);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <NavBar />
      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Register</h5>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label"></label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label"></label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label"></label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      value={form.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="repeatPassword"
                      className="form-label"
                    ></label>
                    <input
                      type="repeatPassword"
                      className="form-control"
                      id="repeatPassword"
                      placeholder="Repeat Password"
                      value={form.repeatPassword}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">
                      Sign Up
                    </button>
                  </div>
                </form>
                <p className="text-muted mt-2">
                  Already have an account? <a href="/login">Sign In</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
