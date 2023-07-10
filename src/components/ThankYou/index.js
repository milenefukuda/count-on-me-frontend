import { useState, useEffect } from "react";
import { api } from "../../api/api.js";

export function ThankYouMessage() {
  const [form, setForm] = useState({
    name: "",
    userMessage: "",
  });
  const [messages, setMessages] = useState([]);

  async function fetchMessages() {
    try {
      const response = await api.get("/message/thankYouWall");
      setMessages(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const clone = { ...form };

    try {
      const response = await api.post("/message/thankYou", { ...clone });
      setForm({
        name: "",
        userMessage: "",
      });

      fetchMessages();
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
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <textarea
            name="userMessage"
            placeholder="Message"
            value={form.userMessage}
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
          ></textarea>
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          style={{ marginBottom: "10px" }}
        >
          Submit
        </button>
      </form>
      <div>
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p>Name: {message.name}</p>
            <p>Message: {message.userMessage}</p>
          </div>
        ))}
      </div>
    </>
  );
}
