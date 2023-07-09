import { api } from "../../api/api.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { categoryIcons } from "../Icons/index.js";

export function EventFeed(props) {
  const { search } = props;
  const [eventFeed, setEventFeed] = useState([]),
    [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getAllEvents() {
      try {
        const response = await api.get(
          "http://localhost:4000/event/all-events",
          {
            params: { search: search },
          }
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
                margin: "30px",
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
                  className="card"
                  style={{
                    width: "18rem",
                    margin: "10px",
                    backgroundColor: event.secondaryColor,
                    color: event.primaryColor,
                  }}
                  key={event._id}
                >
                  <img
                    src={categoryIcons[event.categories][event.primaryColor]}
                    className="card-img-top"
                    alt="Category Icon"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{event.eventName}</h5>
                    <p className="card-text">Date: {event.date}</p>
                    <p className="card-text">Location: {event.local}</p>
                    <p className="card-text">Supporters: {event.supporters}</p>
                    <Link
                      to={`/event/view/${event._id}`}
                      className="btn btn-primary"
                    >
                      {event.local}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
