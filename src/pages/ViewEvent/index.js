import { NavBar } from "../../components/NavBar";
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

  useEffect(() => {
    async function getEvent() {
      try {
        const response = await api.get(`/event/view/${params._id}`);
        console.log(response.data);
        setEvent(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getEvent();
  }, [reload]);

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
      await api.delete(`/event/delete/:eventId/${params._id}`);
      navigate("/user/profile");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <NavBar />
      <div>
        <h1>{event.eventName}</h1>
        <h1>{event.date}</h1>
        <h1>{event.time}</h1>
        <h1>{event.local}</h1>
        <h1>{event.categories}</h1>
        <h1>{event.description}</h1>
        <h1>{event.associatedLinks}</h1>
      </div>
      <Footer />
    </>
  );
}
