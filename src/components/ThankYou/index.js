import { useState, useEffect } from "react";
import { api } from "../../api/api.js";

export function ThankYouMessage({ eventId }) {
  const [form, setForm] = useState({
    name: "",
    userMessage: "",
  });
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await api.get(`/message/thankYouWall/${eventId}`);
        setMessages(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchMessages();
  }, []);

  async function handleSubmit() {
    try {
      const response = await api.post(`/message/thankYou/${eventId}`, form);
      setForm({
        name: "",
        userMessage: "",
      });
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
          className="btn btn-secondary"
          type="submit"
          style={{ marginBottom: "10px" }}
        >
          Submit
        </button>
      </form>
      <div>
        {messages.map((currentEvent) => (
          <div
            key={messages._id} // Use um identificador único para cada mensagem
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p>{messages.userMessage}</p>
            <p>by: {messages.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}
