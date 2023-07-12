import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/api.js";
import { Footer } from "../../components/Footer/index.js";
import { LoggedInNavBar } from "../../components/LoggedInNavBar/index.js";
import { categoryIcons } from "../../components/Icons/index.js";
import { PreviewCard } from "../../components/PreviewCard/index.js";

// Resto do código do componente Map

export function CreateEvent() {
  const [countdown, setCountdown] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const [previewCard, setPreviewCard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [previewColors, setPreviewColors] = useState({
    primaryColor: "",
    secondaryColor: "",
  });
  const [selectedIcon, setSelectedIcon] = useState(null);

  const [form, setForm] = useState({
    eventName: "",
    date: "",
    time: "",
    city: "",
    startLocation: "",
    endLocation: "",
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
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === "categories") {
      setSelectedCategory(value);
    } else if (name === "primaryColor" || name === "secondaryColor") {
      setPreviewColors({ ...previewColors, [name]: value });
    }
  }

  function updatePreviewCard(name, value) {
    if (
      name === "primaryColor" ||
      name === "secondaryColor" ||
      name === "category"
    ) {
      setPreviewCard({
        primaryColor: name === "primaryColor" ? value : form.primaryColor,
        secondaryColor: name === "secondaryColor" ? value : form.secondaryColor,
        category: name === "category" ? value : form.category,
      });
    }
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
                    <label htmlFor="city" className="form-label"></label>
                    <input
                      type="city"
                      className="form-control"
                      id="formCity"
                      placeholder="City name"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="startLocation"
                      className="form-label"
                    ></label>
                    <input
                      type="text"
                      className="form-control"
                      id="formStartLocation"
                      placeholder="Start location"
                      name="startLocation"
                      value={form.startLocation}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="endLocation" className="form-label"></label>
                    <input
                      type="text"
                      className="form-control"
                      id="formEndLocation"
                      placeholder="End location"
                      name="endLocation"
                      value={form.endLocation}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="categories" className="form-label"></label>
                    <select
                      className="form-control"
                      id="formCategories"
                      name="categories"
                      value={form.categories}
                      onChange={handleChange}
                      style={{ backgroundColor: "white" }}
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
                  <div
                    className="mb-3"
                    style={{ display: "flex", flexWrap: "wrap" }}
                  >
                    <label htmlFor="primaryColor" className="form-label">
                      Choose the main color
                    </label>
                    <div
                      className={`color-option ${
                        form.primaryColor === "#8344AD" ? "selected" : ""
                      }`}
                      style={{
                        backgroundColor: "#8344AD",
                        marginRight: "10px",
                      }}
                      onClick={() =>
                        handleChange({
                          target: { name: "primaryColor", value: "#8344AD" },
                        })
                      }
                    >
                      <label>
                        <span
                          style={{
                            backgroundColor: "#8344AD",
                            width: "20px",
                            height: "20px",
                            display: "inline-block",
                            marginRight: "5px",
                          }}
                        ></span>
                      </label>
                    </div>
                    <div
                      className={`color-option ${
                        form.primaryColor === "#DB4759" ? "selected" : ""
                      }`}
                      style={{
                        backgroundColor: "#DB4759",
                        marginRight: "10px",
                      }}
                      onClick={() =>
                        handleChange({
                          target: { name: "primaryColor", value: "#DB4759" },
                        })
                      }
                    >
                      <label>
                        <span
                          style={{
                            backgroundColor: " #DB4759",
                            width: "20px",
                            height: "20px",
                            display: "inline-block",
                            marginRight: "5px",
                          }}
                        ></span>
                      </label>
                    </div>
                    <div
                      className={`color-option ${
                        form.primaryColor === "#EA7238" ? "selected" : ""
                      }`}
                      style={{
                        backgroundColor: "#EA7238",
                        marginRight: "10px",
                      }}
                      onClick={() =>
                        handleChange({
                          target: { name: "primaryColor", value: "#EA7238" },
                        })
                      }
                    >
                      <label>
                        {" "}
                        <span
                          style={{
                            backgroundColor: " #EA7238",
                            width: "20px",
                            height: "20px",
                            display: "inline-block",
                            marginRight: "5px",
                          }}
                        ></span>
                      </label>
                    </div>
                    <div
                      className={`color-option ${
                        form.primaryColor === "#33658A" ? "selected" : ""
                      }`}
                      style={{
                        backgroundColor: "#33658A",
                        marginRight: "10px",
                      }}
                      onClick={() =>
                        handleChange({
                          target: { name: "primaryColor", value: "#33658A" },
                        })
                      }
                    >
                      <label>
                        {" "}
                        <span
                          style={{
                            backgroundColor: "#33658A",
                            width: "20px",
                            height: "20px",
                            display: "inline-block",
                            marginRight: "5px",
                          }}
                        ></span>
                      </label>
                    </div>
                    <div
                      className={`color-option ${
                        form.primaryColor === "#0A9396" ? "selected" : ""
                      }`}
                      style={{
                        backgroundColor: "#0A9396",
                        marginRight: "10px",
                      }}
                      onClick={() =>
                        handleChange({
                          target: { name: "primaryColor", value: "#0A9396" },
                        })
                      }
                    >
                      <label>
                        {" "}
                        <span
                          style={{
                            backgroundColor: " #0A9396",
                            width: "20px",
                            height: "20px",
                            display: "inline-block",
                            marginRight: "5px",
                          }}
                        ></span>
                      </label>
                    </div>
                    <div
                      className={`color-option ${
                        form.primaryColor === "#2D6A4F" ? "selected" : ""
                      }`}
                      style={{
                        backgroundColor: "#2D6A4F",
                        marginRight: "10px",
                      }}
                      onClick={() =>
                        handleChange({
                          target: { name: "primaryColor", value: "#2D6A4F" },
                        })
                      }
                    >
                      <label>
                        <span
                          style={{
                            backgroundColor: " #2D6A4F",
                            width: "20px",
                            height: "20px",
                            display: "inline-block",
                            marginRight: "5px",
                          }}
                        ></span>
                      </label>
                    </div>
                    <div
                      className={`color-option ${
                        form.primaryColor === "#626C3E" ? "selected" : ""
                      }`}
                      style={{
                        backgroundColor: "#626C3E",
                        marginRight: "10px",
                      }}
                      onClick={() =>
                        handleChange({
                          target: { name: "primaryColor", value: "#626C3E" },
                        })
                      }
                    >
                      <label>
                        <span
                          style={{
                            backgroundColor: "#626C3E",
                            width: "20px",
                            height: "20px",
                            display: "inline-block",
                            marginRight: "5px",
                          }}
                        ></span>
                      </label>
                    </div>
                  </div>
                  <div
                    className="mb-3"
                    style={{ display: "flex", flexWrap: "wrap" }}
                  >
                    <label htmlFor="secondaryColor" className="form-label">
                      Choose the second color
                    </label>
                    <div
                      className={`color-option ${
                        form.secondaryColorColor === "#DC75B3" ? "selected" : ""
                      }`}
                      style={{
                        backgroundColor: "#DC75B3",
                        marginRight: "10px",
                      }}
                      onClick={() =>
                        handleChange({
                          target: { name: "secondaryColor", value: "#DC75B3" },
                        })
                      }
                    >
                      <label>
                        <span
                          style={{
                            backgroundColor: " #DC75B3",
                            width: "20px",
                            height: "20px",
                            display: "inline-block",
                            marginRight: "5px",
                          }}
                        ></span>
                      </label>
                    </div>
                    <div
                      className={`color-option ${
                        form.secondaryColor === "#F997BC" ? "selected" : ""
                      }`}
                      style={{
                        backgroundColor: "#F997BC",
                        marginRight: "10px",
                      }}
                      onClick={() =>
                        handleChange({
                          target: { name: "secondaryColor", value: "#F997BC" },
                        })
                      }
                    >
                      <label>
                        <span
                          style={{
                            backgroundColor: "#F997BC",
                            width: "20px",
                            height: "20px",
                            display: "inline-block",
                            marginRight: "5px",
                          }}
                        ></span>
                      </label>
                    </div>
                    <div
                      className={`color-option ${
                        form.secondaryColorColor === "#FF9A6C" ? "selected" : ""
                      }`}
                      style={{
                        backgroundColor: "#FF9A6C",
                        marginRight: "10px",
                      }}
                      onClick={() =>
                        handleChange({
                          target: { name: "secondaryColor", value: "#FF9A6C" },
                        })
                      }
                    >
                      <label>
                        <span
                          style={{
                            backgroundColor: " #FF9A6C",
                            width: "20px",
                            height: "20px",
                            display: "inline-block",
                            marginRight: "5px",
                          }}
                        ></span>
                      </label>
                    </div>
                    <div
                      className={`color-option ${
                        form.secondaryColorColor === "#79C3E5" ? "selected" : ""
                      }`}
                      style={{
                        backgroundColor: "#79C3E5",
                        marginRight: "10px",
                      }}
                      onClick={() =>
                        handleChange({
                          target: { name: "secondaryColor", value: "#79C3E5" },
                        })
                      }
                    >
                      <label>
                        <span
                          style={{
                            backgroundColor: " #79C3E5",
                            width: "20px",
                            height: "20px",
                            display: "inline-block",
                            marginRight: "5px",
                          }}
                        ></span>
                      </label>
                    </div>
                    <div
                      className={`color-option ${
                        form.secondaryColorColor === "#CBF3F0" ? "selected" : ""
                      }`}
                      style={{
                        backgroundColor: "#CBF3F0",
                        marginRight: "10px",
                      }}
                      onClick={() =>
                        handleChange({
                          target: { name: "secondaryColor", value: "#CBF3F0" },
                        })
                      }
                    >
                      <label>
                        <span
                          style={{
                            backgroundColor: " #CBF3F0",
                            width: "20px",
                            height: "20px",
                            display: "inline-block",
                            marginRight: "5px",
                          }}
                        ></span>
                      </label>
                    </div>
                    <div
                      className={`color-option ${
                        form.secondaryColor === "#90BE6D" ? "selected" : ""
                      }`}
                      style={{
                        backgroundColor: "#90BE6D",
                        marginRight: "10px",
                      }}
                      onClick={() =>
                        handleChange({
                          target: { name: "secondaryColor", value: "#90BE6D" },
                        })
                      }
                    >
                      <label>
                        <span
                          style={{
                            backgroundColor: " #90BE6D",
                            width: "20px",
                            height: "20px",
                            display: "inline-block",
                            marginRight: "5px",
                          }}
                        ></span>
                      </label>
                    </div>
                    <div
                      className={`color-option ${
                        form.secondaryColor === "#FFBE0B" ? "selected" : ""
                      }`}
                      style={{
                        backgroundColor: "#FFBE0B",
                        marginRight: "10px",
                      }}
                      onClick={() =>
                        handleChange({
                          target: { name: "secondaryColor", value: "#FFBE0B" },
                        })
                      }
                    >
                      <label>
                        <span
                          style={{
                            backgroundColor: " #FFBE0B",
                            width: "20px",
                            height: "20px",
                            display: "inline-block",
                            marginRight: "5px",
                          }}
                        ></span>
                      </label>
                    </div>
                  </div>
                  <PreviewCard
                    primaryColor={previewColors.primaryColor}
                    secondaryColor={previewColors.secondaryColor}
                    category={selectedCategory}
                  />

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
