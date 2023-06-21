import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api.js";
import { NavBar } from "../../components/NavBar.index.js";
import { Footer } from "../../components/Footer.index.js";

export function CreateEvent() {
  const navigate = useNavigate;
  const [form, setForm] = useState({
    eventName: "",
    date: "",
    local: "",
    categories: "",
    picture: "",
    description: "",
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
      navigate("/event/:id");
    } catch (err) {
      console.log(err);
    }
  }
}

return (
  <>
    <NavBar />
    <Footer />
  </>
);
