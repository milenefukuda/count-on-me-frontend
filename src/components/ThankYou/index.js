import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/api.js";

export function ThankYouMessage(eventId) {
  const params = useParams();
  const [form, setForm] = useState({
    name: "",
    userMessage: "",
  });
  const [messages, setMessages] = useState([]);

  async function getMessages() {
    try {
      const response = await api.get(`/message/thankYouWall/${params.id}`);
      setMessages(response.data);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getMessages();
  }, [params.id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const clone = { ...form, eventId: params.id };
    try {
      const response = await api.post(`/message/thankYou/${params.id}`, {
        ...clone,
      });
      setForm({
        name: "",
        userMessage: "",
      });
      getMessages();
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <textarea
            name="userMessage"
            placeholder="Message"
            value={form.userMessage}
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          className="btn btn-secondary"
          type="submit"
          style={{ marginBottom: "10px" }}
        >
          Submit
        </button>
      </form>
      <div>
        {messages.map((message) => (
          <div
            key={message._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p>{message.userMessage}</p>
            <p>by: {message.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}
