import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api.js";
import { NavBar } from "../../components/NavBar/index.js";
import { Footer } from "../../components/Footer/index.js";

export function CreateEvent() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    eventName: "",
    date: "",
    time: "",
    local: "",
    categories: "",
    picture: "",
    description: "",
    associatedLinks: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const clone = { ...form };

    try {
      const response = await api.post("/event/create", { ...clone });
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      navigate("/event/view");
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
                <h5 className="card-title">Create your event</h5>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="eventName" className="form-label"></label>
                    <input
                      type="text"
                      className="form-control"
                      id="formEventName"
                      placeholder="Event name"
                      name="eventName"
                      value={form.eventName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="date" className="form-label"></label>
                    <input
                      type="text"
                      className="form-control"
                      id="formDate"
                      placeholder="DD/MM/YYYY"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="time" className="form-label"></label>
                    <input
                      type="text"
                      className="form-control"
                      id="formTime"
                      placeholder="00:00:00"
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="local" className="form-label"></label>
                    <input
                      type="text"
                      className="form-control"
                      id="formLocal"
                      placeholder="Start location"
                      name="local"
                      value={form.local}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="categories" className="form-label"></label>
                    <input
                      type="text"
                      className="form-control"
                      id="formCategories"
                      placeholder="Category"
                      name="categories"
                      value={form.categories}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label"></label>
                    <input
                      type="text"
                      className="form-control"
                      id="formDescription"
                      placeholder="Description"
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="associatedLinks"
                      className="form-label"
                    ></label>
                    <input
                      type="text"
                      className="form-control"
                      id="formAssociatedLinks"
                      placeholder="Associated Links"
                      name="associatedLinks"
                      value={form.associatedLinks}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">
                      Create
                    </button>
                  </div>
                </form>
                <p className="text-muted mt-2">
                  <a href="/user/login">Save as draft</a>
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
