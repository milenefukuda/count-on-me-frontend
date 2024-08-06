import { api } from "../../api/api.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { categoryIcons } from "../Icons/index.js";

export function EventFeed(props) {
  const { search } = props;
  const [eventFeed, setEventFeed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getAllEvents() {
      try {
        const response = await api.get(
          `${process.env.REACT_APP_API_URL}/event/all-events`,
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
                textDecoration: "none !important",
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
                    border: "0",
                    color: event.primaryColor,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  key={event._id}
                >
                  <Link
                    to={`/event/view/${event._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      className="card-body image-box"
                      style={{
                        backgroundColor: event.secondaryColor,
                        height: "125px", // Definindo uma altura fixa para a div da imagem
                        textDecoration: "none !important",
                      }}
                    >
                      <img
                        src={
                          categoryIcons[event.categories][event.primaryColor]
                        }
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
                      <p className="card-text">{event.city}</p>
                    </div>
                    <div
                      className="card-body title-box"
                      style={{
                        color: "black",
                        textDecoration: "none !important",
                        padding: "5px 0 0 0",
                      }}
                    >
                      <h5 className="card-title" style={{ margin: "0" }}>
                        {event.eventName}
                      </h5>
                    </div>
                    <div
                      className="card-body supporters-box"
                      style={{
                        color: "black",
                        textDecoration: "none !important",
                        padding: "0 0 5px 0",
                      }}
                    >
                      <p className="card-text" style={{ fontSize: "16px" }}>
                        {event.supporters} Participants
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
