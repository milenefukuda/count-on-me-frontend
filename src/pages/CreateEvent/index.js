import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/api.js";
import { Footer } from "../../components/Footer/index.js";
import { LoggedInNavBar } from "../../components/LoggedInNavBar/index.js";

export function CreateEvent() {
  const [countdown, setCountdown] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const params = useParams();
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
    primaryColor: "",
    secundaryColor: "",
  });

  const calculateCountDown = () => {
    const eventDate = new Date(form.date + " " + form.time);
    const eventTime = eventDate.getTime();
    const now = new Date().getTime();
    const timeRemaining = eventTime - now;
    setCountdown(timeRemaining);

    if (timeRemaining <= 0) {
      clearInterval(intervalId);
    }
  };

  useEffect(() => {
    if (form.date && form.time && intervalId === null) {
      const id = setInterval(calculateCountDown, 1000);
      setIntervalId(id);
    }
  }, [form.date, form.time, intervalId]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const clone = { ...form };
    console.log(clone);

    try {
      const response = await api.post("/event/create", { ...clone });
      //   localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      navigate(`/event/view/${response.data._id}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <LoggedInNavBar />
      <div className="container my-4" style={{ paddingBottom: "100px" }}>
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
                      type="date"
                      className="form-control"
                      id="formDate"
                      placeholder="YYYY-MM-DD"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="time" className="form-label"></label>
                    <input
                      type="time"
                      className="form-control"
                      id="formTime"
                      placeholder="HH:MM"
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
                  <div className="mb-3">
                    <label
                      htmlFor="primaryColor"
                      className="form-label"
                    ></label>
                    <input
                      type="text"
                      className="form-control"
                      id="formPrimaryColor"
                      placeholder="Primary Color"
                      name="primaryColor"
                      value={form.primaryColor}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="secondaryColor"
                      className="form-label"
                    ></label>
                    <input
                      type="text"
                      className="form-control"
                      id="formSecondaryColor"
                      placeholder="Secondary Color"
                      name="secondaryColor"
                      value={form.secondaryColor}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-dark">
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
