import "bootstrap/dist/css/bootstrap.min.css";
import { SearchBar } from "../SearchBar";
import { useState } from "react";

export function NavBar() {
  const [search, setSearch] = useState("");
  function changeSearch(text) {
    setSearch(text);
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="https://res.cloudinary.com/dieqaoy0n/image/upload/v1686141967/Icon_bwb14d.png"
              alt="Logo"
              style={{ width: "25px", height: "auto", marginRight: "10px" }}
            />
            You count on me!
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item" style={{ marginRight: "10px" }}>
                <SearchBar changeSearch={changeSearch} />
              </li>
              <li className="nav-item">
                <img
                  src="https://res.cloudinary.com/dieqaoy0n/image/upload/v1686321175/Vector_xzi709.svg"
                  alt="Link"
                  style={{ width: "25px", height: "auto", marginRight: "10px" }}
                />
              </li>

              <li className="nav-item">
                <a href="/signup">
                  <img
                    src="https://res.cloudinary.com/dieqaoy0n/image/upload/v1686323510/Group_afenmg.svg"
                    alt="Link"
                    style={{
                      width: "25px",
                      height: "auto",
                      marginRight: "10px",
                    }}
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
