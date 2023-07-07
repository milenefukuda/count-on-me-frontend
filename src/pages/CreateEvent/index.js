import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/api.js";
import { Footer } from "../../components/Footer/index.js";
import { LoggedInNavBar } from "../../components/LoggedInNavBar/index.js";
import { categoryIcons } from "../../components/Icons/index.js";

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
    secondaryColor: "",
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
                    <label htmlFor="categories" className="form-label">
                      Category
                    </label>
                    <select
                      className="form-control"
                      id="formCategories"
                      name="categories"
                      value={form.categories}
                      onChange={handleChange}
                    >
                      <option value="">Select a category</option>
                      {Object.keys(categoryIcons).map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
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
                    <label htmlFor="primaryColor" className="form-label">
                      Primary Color
                    </label>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="primaryColor"
                          value="#8344AD"
                          checked={form.primaryColor === "#8344AD"}
                          onChange={handleChange}
                        ></input>
                        #8344AD
                      </label>
                    </div>

                    <div>
                      <label>
                        <input
                          type="radio"
                          name="primaryColor"
                          value="#DB4759"
                          checked={form.primaryColor === "#DB4759"}
                          onChange={handleChange}
                        />{" "}
                        #DB4759
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="primaryColor"
                          value="#EA7238"
                          checked={form.primaryColor === "#EA7238"}
                          onChange={handleChange}
                        />{" "}
                        #EA7238
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="primaryColor"
                          value="#33658A"
                          checked={form.primaryColor === "#33658A"}
                          onChange={handleChange}
                        />{" "}
                        #33658A
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="primaryColor"
                          value="#0A9396"
                          checked={form.primaryColor === "#0A9396"}
                          onChange={handleChange}
                        />{" "}
                        #0A9396
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="primaryColor"
                          value="#2D6A4F"
                          checked={form.primaryColor === "#2D6A4F"}
                          onChange={handleChange}
                        />{" "}
                        #2D6A4F
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="primaryColor"
                          value="#626C3E"
                          checked={form.primaryColor === "#626C3E"}
                          onChange={handleChange}
                        />{" "}
                        #626C3E
                      </label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="secondaryColor" className="form-label">
                      Secondary Color
                    </label>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="secondaryColor"
                          value="#DC75B3"
                          checked={form.secondaryColor === "#DC75B3"}
                          onChange={handleChange}
                        />{" "}
                        #DC75B3
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="secondaryColor"
                          value="#F997BC"
                          checked={form.secondaryColor === "#F997BC"}
                          onChange={handleChange}
                        />{" "}
                        #F997BC
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="secondaryColor"
                          value="#FF9A6C"
                          checked={form.secondaryColor === "#FF9A6C"}
                          onChange={handleChange}
                        />{" "}
                        #FF9A6C
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="secondaryColor"
                          value="#79C3E5"
                          checked={form.secondaryColor === "#79C3E5"}
                          onChange={handleChange}
                        />{" "}
                        #79C3E5
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="secondaryColor"
                          value="#CBF3F0"
                          checked={form.secondaryColor === "#CBF3F0"}
                          onChange={handleChange}
                        />{" "}
                        #CBF3F0
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="secondaryColor"
                          value="#90BE6D"
                          checked={form.secondaryColor === "#90BE6D"}
                          onChange={handleChange}
                        />{" "}
                        #90BE6D
                      </label>
                    </div>
                    <div>
                      <label>
                        <input
                          type="radio"
                          name="secondaryColor"
                          value="#FFBE0B"
                          checked={form.secondaryColor === "#FFBE0B"}
                          onChange={handleChange}
                        />{" "}
                        #FFBE0B
                      </label>
                    </div>
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
