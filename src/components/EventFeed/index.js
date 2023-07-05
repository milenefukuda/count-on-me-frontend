import { api } from "../../api/api.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function EventFeed(props) {
  const { search } = props;
  const [eventFeed, setEventFeed] = useState([]),
    [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getAllEvents() {
      try {
        const response = await api.get(
          "http://localhost:4000/event/all-events"
        );
        setEventFeed(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getAllEvents();
  }, []);

  console.log(EventFeed);

  return (
    <>
      <div className="event-feed">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h1
              style={{
                color: "#000000",
                fontSize: "24px",
                margin: "0",
                marginBottom: "10px",
              }}
              className="my-auto"
            >
              Highlights Events
            </h1>
            <div
              className="row event-container"
              style={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {eventFeed.map((event) => (
                <div
                  className="event-item col-6 col-md-3 mb-4"
                  key={event._id}
                  style={{
                    flex: "0 0 calc(33.33% - 20px)",
                    margin: "10px",
                    backgroundColor: event.secondaryColor,
                    color: event.primaryColor,
                  }}
                >
                  <Link to={`/event/view/${event._id}`}>
                    <h2>{event.eventName}</h2>
                  </Link>
                  <p>Date: {event.date}</p>
                  <p>Location: {event.local}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
