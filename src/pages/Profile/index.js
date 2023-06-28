import { api } from "../../api/api.js";
import { LoggedInNavBar } from "../../components/LoggedInNavBar/index.js";
import { Footer } from "../../components/Footer";
import { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext.js";
import { EventCard } from "../../components/EventCard/index.js";

export function Profile() {
  const { setLoggedInUser } = useContext(AuthContext);
  const params = useParams();
  const [reload, setReload] = useState(false);
  const [user, setUser] = useState({
    name: "",
    id: "",
  });
  const [userEvents, setUserEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const response = await api.get("/user/profile");
      setUser(response.data);
      fetchUserEvents();
    }
    async function fetchUserEvents() {
      const response = await api.get(`/event/my-events/${params.id}`);
      setUserEvents(response.data);
    }
    fetchUser();
    fetchUserEvents();
  }, [reload]);

  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    navigate("/");
  }

  return (
    <>
      <LoggedInNavBar />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="d-flex align-items-center justify-content-center h-100">
              <div className="d-flex flex-column align-items-start">
                <h1
                  style={{
                    color: "#000000",
                    fontSize: "24px",
                    margin: "0",
                  }}
                  className="my-auto"
                >
                  Hello, {user.name}
                </h1>
                <button className="btn btn-dark mt-2" onClick={handleLogOut}>
                  Log Out
                </button>
                <Link to="/event/create" className="btn btn-dark mt-2">
                  Create Event
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex align-items-center justify-content h-100">
              <img
                src="https://res.cloudinary.com/dieqaoy0n/image/upload/v1686140455/mundo_desktop_hvwx73.png"
                alt="Imagem"
                className="img-fluid"
                style={{ maxWidth: "100%" }}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 d-flex justify-content">
            <h1
              style={{
                color: "#000000",
                fontSize: "24px",
                margin: "0",
                marginBottom: "10px",
              }}
              className="my-auto"
            >
              Created by you
            </h1>
          </div>
        </div>
        <div className="row event-container">
          {userEvents.map((event) => (
            <div key={event.id} className="col-6 col-md-3 mb-4">
              <div className="mb-4">
                <EventCard event={event} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
