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
  const [supporters, setSupporters] = useState(0);

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
  }, [params._id]);

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
                style={{ backgroundColor: event.primaryColor }}
              >
                <h2
                  className="card-title"
                  style={{ backgroundColor: event.secondaryColor }}
                >
                  {event.eventName}
                </h2>
                <p className="card-text">{event.local}</p>
                <p className="card-text">{event.date}</p>
                <button className="btn btn-primary" onClick={handleCountOnMe}>
                  Count on me
                </button>
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
