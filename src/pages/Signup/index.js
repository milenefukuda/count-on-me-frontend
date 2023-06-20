import { useState } from "react";
import { api } from "../../api/api.js";
import { NavBar } from "../../components/NavBar/index.js";
import { Footer } from "../../components/Footer/index.js";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  function handleChange(e) {
    //console.log("handleChange", e.target.name, e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("handleSubmit", form);
    const clone = { ...form };

    try {
      const response = await api.post("/user/signup", {
        ...clone,
      });
      localStorage.removeItem("loggedInUser");
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      navigate("/user/login");
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
                      id="formName"
                      placeholder="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label"></label>
                    <input
                      type="email"
                      className="form-control"
                      id="formEmail"
                      placeholder="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label"></label>
                    <input
                      type="password"
                      className="form-control"
                      id="formPassword"
                      placeholder="password"
                      name="password"
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
                      type="password"
                      className="form-control"
                      id="formPassword"
                      placeholder="password"
                      name="repeatPassword"
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
                  Already have an account? <a href="/user/login">Sign In</a>
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
