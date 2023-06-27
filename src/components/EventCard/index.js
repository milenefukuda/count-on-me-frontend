import { Link } from "react-router-dom";

export function EventCard({ event }) {
  return (
    <div className="event-card">
      <h3 className="event-card__title">
        <Link to={`/event/${event.id}`}>{event.title}</Link>
      </h3>
      <p className="event-card__description">{event.description}</p>
      <p className="event-card__date">Date: {event.date}</p>
    </div>
  );
}
