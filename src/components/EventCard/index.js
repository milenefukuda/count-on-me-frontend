import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../api/api.js";

export function EventCard({ event }) {
  const [events, setEvents] = useState([]);
  const params = useParams();

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
        <Link
          to={`/event/view/${event._id}`}
          style={{ textDecoration: "none" }}
        >
          <h3 className="card-title">{event.eventName}</h3>
        </Link>
        <p className="card-text">{event.local}</p>
        <p className="card-text">Supporters: {event.supporters}</p>
      </div>
    </div>
  );
}
