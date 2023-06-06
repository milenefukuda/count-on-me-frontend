import { Link } from "react-router-dom";
import { NavBar } from "../../components/NavBar/index.js";
import { Footer } from "../../components/Footer/index.js";

export function Home() {
  return (
    <>
      <div>
        <div>
          <NavBar />
          <h1>Manifest the change you want to see in the world</h1>
          <Link to="/about">
            <button>LET'S START - ícone de seta em box</button>
          </Link>
          <Footer />
        </div>
      </div>
    </>
  );
}
