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
          "http://localhost:4000/events/all-events"
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
      <div>
        <h1>MAP PARA RENDERIZAR TODOS OS EVENTOS</h1>
      </div>
    </>
  );
}
