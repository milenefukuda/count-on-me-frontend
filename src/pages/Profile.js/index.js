import { api } from "../../api/api.js";
import { NavBar } from "../../components/NavBar";
import { Footer } from "../../components/Footer";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext.js";

export function Profile() {
  const { setLoggedInUser } = useContext(AuthContext);
  const [user, setUser] = useState({
    name: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const response = await api.get("/user/profile");
      setUser(response.data);
    }
    fetchUser();
  }, []);

  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    navigate("/");
  }

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="col-md-6 d-flex align-items-center justify-content-start">
            <h1>{`Hello, ${user.name}`}</h1>
          </div>
          <img
            src="https://res.cloudinary.com/dieqaoy0n/image/upload/v1686140455/mundo_desktop_hvwx73.png"
            alt="Imagem"
            className="img-fluid"
            style={{ maxWidth: "100%" }}
          />
        </div>
      </div>
      <button onClick={handleLogOut}>Log Out</button>
      <Footer />
    </>
  );
}
