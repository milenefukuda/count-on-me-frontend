import { Link } from "react-router-dom";
import { SearchBar } from "../SearchBar";
import { useState } from "react";
import { FaFistRaised, FaUserAlt, FaSearch } from "react-icons/fa";

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
            <FaFistRaised />
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
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <SearchBar changeSearch={changeSearch} />
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/login"
                >
                  <FaUserAlt />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
