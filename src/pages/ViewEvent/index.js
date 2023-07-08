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
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div
                className="card-body"
                style={{ backgroundColor: event.secondaryColor }}
              >
                <h2
                  className="card-title"
                  style={{
                    backgroundColor: event.primaryColor,
                    color: "white",
                  }}
                >
                  {event.eventName}
                </h2>
                <p className="card-text">{event.local}</p>
                <p className="card-text">{event.date}</p>
                <button className="btn btn-dark" onClick={handleCountOnMe}>
                  Count on me!
                </button>
                <p>
                  Countdown: {days} days, {hours} hours, {minutes} minutes
                </p>
                <p className="card-text">{supporters} supporters</p>
                {event.categories && (
                  <img
                    src={categoryIcons[event.categories][event.primaryColor]}
                    alt="Category Icon"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="col-md-6">
              <div className="vertical-menu">
                <button
                  className={menuContent === "description" ? "active" : ""}
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
                  </svg>{" "}
                </button>
                <button
                  className={menuContent === "location" ? "active" : ""}
                  onClick={() => setMenuContent("location")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-pin-map-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"
                    />
                  </svg>{" "}
                </button>
                <button
                  className={menuContent === "messages" ? "active" : ""}
                  onClick={() => setMenuContent("messages")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-chat-heart"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.965 12.695a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2Zm-.8 3.108.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125ZM8 5.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"
                    />
                  </svg>{" "}
                </button>
              </div>
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
      </div>
      <Footer />
    </>
  );
}
