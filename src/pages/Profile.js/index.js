import { api } from "../../api/api.js";
import { NavBar } from "../../components/NavBar";
import { Footer } from "../../components/Footer";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext.js";

export function Profile() {
  const [form, setForm] = useState({
    name: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { setLoggedInUser } = useContext(AuthContext);
  let dataUserLogin = JSON.parse(localStorage.getItem("loggedInUser"));

  console.log(localStorage.getItem("loggedInUser"));
  const token = dataUserLogin.token;
  useEffect(() => {
    async function fetchForm() {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await api.get("http://localhost:4000/user/profile", {
          headers,
        });

        let nameValue = response.data.name;
        setForm({ ...form, ["name"]: nameValue });
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    console.log(form.name);
    fetchForm();
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
            <h1>{`Hello, ${form.name}`}</h1>
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
