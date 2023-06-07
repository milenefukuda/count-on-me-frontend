import { Link } from "react-router-dom";
import { NavBar } from "../../components/NavBar/index.js";
import { Footer } from "../../components/Footer/index.js";

export function Home() {
  return (
    <>
      <NavBar />
      <div
        className="d-flex align-items-center justify-content-start"
        style={{
          backgroundImage: "url(../assets/mundo_desktop.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      >
        <h1 className="text-white">Seu texto curto</h1>
      </div>
      <Footer />
    </>
  );
}
