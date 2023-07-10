import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../api/api.js";
import { categoryIcons } from "../Icons/index.js";

export function EventCard({ event }) {
  const [events, setEvents] = useState([]);
  const params = useParams();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function getMyEvents() {
      try {
        const response = await api.get("/event/my-events");
        setEvents(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getMyEvents();
  }, []);

  return (
    <div
      className="card"
      style={{
        width: "18rem",
        margin: "10px",
        border: "0",
        color: event.primaryColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      key={event._id}
    >
      <Link to={`/event/view/${event._id}`} style={{ textDecoration: "none" }}>
        <div
          className="card-body"
          style={{
            backgroundColor: event.secondaryColor,
            textDecoration: "none !important",
          }}
        >
          <img
            src={categoryIcons[event.categories][event.primaryColor]}
            className="card-img-top"
            alt="Category Icon"
            style={{ height: "100%", width: "100px" }}
          />
        </div>
        <div
          className="card-body location-box"
          style={{
            backgroundColor: "black",
            color: "white",
            textDecoration: "none !important",
          }}
        >
          <p className="card-text">Location: {event.city}</p>
        </div>
        <div
          className="card-body title-box"
          style={{
            color: "black",
            textDecoration: "none !important",
            padding: "5px 0 0 0",
          }}
        >
          <h5 className="card-title">{event.eventName}</h5>
        </div>
        <div
          className="card-body supporters-box"
          style={{
            color: "black",
            textDecoration: "none !important",
            padding: "0 0 5px 0",
          }}
        >
          <p className="card-text">Participants: {event.supporters}</p>
        </div>
      </Link>
      <div
        className="card-body"
        style={{ marginLeft: "10px", marginBottom: "0" }}
      ></div>
    </div>
  );
}
