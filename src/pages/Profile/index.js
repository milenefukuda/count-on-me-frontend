import { api } from "../../api/api.js";
import { LoggedInNavBar } from "../../components/LoggedInNavBar/index.js";
import { Footer } from "../../components/Footer";
import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext.js";
import { EventCard } from "../../components/EventCard/index.js";

export function Profile() {
  const { setLoggedInUser } = useContext(AuthContext);
  const [user, setUser] = useState({
    name: "",
  });
  const [userEvents, setUserEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const response = await api.get("/user/profile");
      setUser(response.data);
    }
    async function fetchUserEvents() {
      const response = await api.get("/event/my-events");
      setUserEvents(response.data);
    }
    fetchUser();
    fetchUserEvents();
  }, []);

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
          <div className="col-md-6 d-flex align-items-center justify-content-center flex-column">
            <h1 style={{ color: "#000000", fontSize: "24px" }}>
              Hello, {user.name}
            </h1>
            <button className="btn btn-primary mt-2" onClick={handleLogOut}>
              Log Out
            </button>
            <Link to="/event/create" className="btn btn-primary mt-2">
              Create Event
            </Link>
            {userEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <div className="col-md-6">
            <img
              src="https://res.cloudinary.com/dieqaoy0n/image/upload/v1686140455/mundo_desktop_hvwx73.png"
              alt="Imagem"
              className="img-fluid"
              style={{ maxWidth: "100%" }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
