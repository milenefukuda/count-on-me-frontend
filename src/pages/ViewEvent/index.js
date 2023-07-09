import { LoggedInNavBar } from "../../components/LoggedInNavBar";
import { Footer } from "../../components/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../api/api.js";
import { categoryIcons } from "../../components/Icons/index.js";
import { ThankYouMessage } from "../../components/ThankYou/index.js";

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
            className="col-md-6"
            style={{ display: "flex", flexDirection: "column" }}
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
                    className="bi bi-info-circle"
                    viewBox="0 0 16 16"
                  >
                    {/* ...código do ícone... */}
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
                    className="bi bi-pin-map-fill"
                    viewBox="0 0 16 16"
                    style={{ color: "black" }}
                  >
                    {/* ...código do ícone... */}
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
                    className="bi bi-chat-heart"
                    viewBox="0 0 16 16"
                  >
                    {/* ...código do ícone... */}
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
                  <p>{event.date}</p>

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
                  <button className="btn btn-primary" onClick={handleCountOnMe}>
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
                <p>{event.local}</p>
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
