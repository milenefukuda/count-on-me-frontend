import { NavBar } from "../../components/NavBar/index.js";
import { Footer } from "../../components/Footer/index.js";
import { EventFeed } from "../../components/EventFeed/index.js";
import { useState } from "react";

export function Home() {
  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="col-md-6 d-flex align-items-center justify-content-start">
            <h1>Manifest for the change you want to see in the world</h1>
          </div>
          <div className="col-md-6 d-flex align-items-center justify-content-end">
            <img
              src="https://res.cloudinary.com/dieqaoy0n/image/upload/v1686140455/mundo_desktop_hvwx73.png"
              alt="Imagem"
              className="img-fluid"
              style={{ maxWidth: "100%" }}
            />
          </div>
        </div>
      </div>
      <div style={{ marginBottom: "100px" }}>
        <EventFeed />
      </div>
      <Footer />
    </>
  );
}
