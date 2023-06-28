import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../api/api.js";

export function EventCard({ event }) {
  const [events, setEvents] = useState([]);

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
    <div className="card mb-4" style={{ minWidth: "300px", maxWidth: "400px" }}>
      <div
        className="card-header"
        style={{ backgroundColor: event.secondaryColor }}
      >
        {event.date}
      </div>
      <div className="card-body">
        <h3 className="card-title">{event.eventName}</h3>
        <p className="card-text">{event.local}</p>
        <p className="card-text">Supporters: {event.supporters}</p>
        <Link to={`/event/${event._id}`} className="btn btn-dark">
          View Details
        </Link>
      </div>
    </div>
  );
}
