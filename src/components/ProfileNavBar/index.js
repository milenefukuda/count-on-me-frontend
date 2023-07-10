import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ProfileNavBar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function changeSearch(text) {
    setSearch(text);
  }

  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/" style={{ color: "black" }}>
            <img
              src="https://res.cloudinary.com/dieqaoy0n/image/upload/v1686141967/Icon_bwb14d.png"
              alt="Logo"
              style={{ width: "25px", height: "auto", marginRight: "10px" }}
            />
            You count on me!
          </a>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item">
                <button
                  className="btn btn-link"
                  onClick={handleLogOut}
                  style={{
                    color: "black",
                    textDecoration: "none",
                    padding: 0,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    class="bi bi-power"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.5 1v7h1V1h-1z" />
                    <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
