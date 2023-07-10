import { LoggedInNavBar } from "../../components/LoggedInNavBar";
import { Footer } from "../../components/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../api/api.js";
import { categoryIcons } from "../../components/Icons/index.js";
import { ThankYouMessage } from "../../components/ThankYou/index.js";
import MapComponent from "../../components/MapComponent/index.js";

export function ViewEvent() {
  const params = useParams();
  const [event, setEvent] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [reload, setReload] = useState(false);
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(0);
  const [supporters, setSupporters] = useState(0);
  const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
  const [menuContent, setMenuContent] = useState("description");

  useEffect(() => {
    async function getEvent() {
      try {
        const response = await api.get(`/event/view/${params.id}`);
        console.log(response.data);
        setEvent(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getEvent();
  }, [params.id]);

  useEffect(() => {
    setSupporters(event.supporters || 0);
  }, [event]);

  useEffect(() => {
    const insideSection = document.getElementById("insideSection");
    const outsideSection = document.getElementById("outsideSection");

    if (insideSection && outsideSection) {
      insideSection.style.display = "none";
      outsideSection.style.display = "none";
    }
  }, []);

  useEffect(() => {
    const calculateCountDown = () => {
      const eventDate = new Date(event.date);
      const eventTime = eventDate.getTime();
      const now = new Date().getTime();
      const timeRemaining = eventTime - now;
      setCountdown(timeRemaining);

      if (timeRemaining <= 0) {
        clearInterval(interval);
      }
    };

    const interval = setInterval(() => {
      calculateCountDown();
    }, 1000);

    calculateCountDown();

    return () => {
      clearInterval(interval);
    };
  }, [event.date]);

  async function handleCountOnMe() {
    try {
      await api.post(`/event/support/${params.id}`);
      setSupporters(supporters + 1);
    } catch (err) {
      console.log(err);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handleSubmit() {
    try {
      await api.put(`/event/edit/:eventId/${event._id}`, form);
      setShowForm(false);
      setReload(!reload);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete() {
    try {
      await api.delete(`/event/delete/:eventId/${params.id}`);
      navigate("/user/profile");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <LoggedInNavBar />
      <div
        className="container"
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minWidth: "100%",
        }}
      >
        <div className="row" style={{ flex: 1, marginBottom: "20px" }}>
          <div
            className="col-md-6 pl-0"
            style={{ display: "flex", flexDirection: "column", paddingLeft: 0 }}
          >
            {/* Conteúdo da Div 1 */}
            <div
              style={{
                backgroundColor: event.primaryColor,
                position: "relative",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "-20px",
              }}
            >
              <div className="card">
                <div
                  className="card-body"
                  style={{ backgroundColor: event.primaryColor }}
                >
                  <h2
                    className="card-title"
                    style={{
                      backgroundColor: event.primaryColor,
                      color: "white",
                      fontSize: "80px",
                      textAlign: "center",
                      marginBottom: "20px",
                    }}
                  >
                    {event.eventName}
                  </h2>
                </div>
              </div>
              {/* Botões de Menu */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  position: "absolute",
                  top: 0,
                  right: 0,
                  padding: "20px",
                }}
              >
                <button
                  className={`menuContent ${
                    menuContent === "description" ? "active" : ""
                  }`}
                  onClick={() => setMenuContent("description")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-info-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                  </svg>
                </button>
                <button
                  className={`menuContent ${
                    menuContent === "location" ? "active" : ""
                  }`}
                  onClick={() => setMenuContent("location")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-geo-alt"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                </button>
                <button
                  className={`menuContent ${
                    menuContent === "messages" ? "active" : ""
                  }`}
                  onClick={() => setMenuContent("messages")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-envelope-heart"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l3.235 1.94a2.76 2.76 0 0 0-.233 1.027L1 5.384v5.721l3.453-2.124c.146.277.329.556.55.835l-3.97 2.443A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741l-3.968-2.442c.22-.28.403-.56.55-.836L15 11.105V5.383l-3.002 1.801a2.76 2.76 0 0 0-.233-1.026L15 4.217V4a1 1 0 0 0-1-1H2Zm6 2.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div
              style={{
                backgroundColor: event.secondaryColor,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
                flex: 1,
              }}
            >
              {/* Conteúdo da Div 2 */}
              <div style={{ display: "flex", alignItems: "center" }}>
                {event.categories && (
                  <div style={{ marginRight: "20px" }}>
                    <img
                      src={categoryIcons[event.categories][event.primaryColor]}
                      alt="Category Icon"
                    />
                  </div>
                )}
                <div>
                  <p style={{ fontWeight: "bold", fontSize: "24px" }}>
                    {event.local}
                  </p>
                  <div>
                    <p style={{ fontWeight: "bold", fontSize: "24px" }}>
                      {event.local}
                    </p>
                    {event.date && <p>{event.date.substring(0, 10)}</p>}
                  </div>

                  <div style={{ marginTop: "10px" }}>
                    <p>
                      Countdown:{" "}
                      <span
                        style={{
                          border: `2px solid ${event.primaryColor}`,
                          borderRadius: "5px",
                          padding: "5px",
                          marginRight: "5px",
                        }}
                      >
                        {days} days
                      </span>
                      <span
                        style={{
                          border: `2px solid ${event.primaryColor}`,
                          borderRadius: "5px",
                          padding: "5px",
                          marginRight: "5px",
                        }}
                      >
                        {hours} hours
                      </span>
                      <span
                        style={{
                          border: `2px solid ${event.primaryColor}`,
                          borderRadius: "5px",
                          padding: "5px",
                        }}
                      >
                        {minutes} minutes
                      </span>
                    </p>
                  </div>
                  <p>{supporters} supporters</p>
                  <button className="btn btn-dark" onClick={handleCountOnMe}>
                    Count on me
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6" style={{ backgroundColor: "white" }}>
            {/* Conteúdo da Div 3 */}
            <p
              style={{
                color: "black",
                backgroundColor: "white",
                padding: "0px",
              }}
            ></p>
            {menuContent === "description" && (
              <div className="menu-content">
                <h3>About this event</h3>
                <p>{event.description}</p>
              </div>
            )}
            {menuContent === "location" && (
              <div className="menu-content">
                <h3>Event location</h3>

                <MapComponent />
              </div>
            )}
            {menuContent === "messages" && (
              <div className="menu-content">
                <h3>Thank you messages</h3>
                <ThankYouMessage />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
