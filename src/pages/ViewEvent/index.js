import { LoggedInNavBar } from "../../components/LoggedInNavBar";
import { Footer } from "../../components/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../api/api.js";

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
              </div>
            </div>
          </div>
          <div className="col-md-6">
            {/* Aqui você pode adicionar qualquer conteúdo adicional no lado direito */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
