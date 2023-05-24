import { Link } from "react-router-dom";

export function Home() {
  return (
    <>
      <div>
        <div>
          <Link to="/login">
            <button>LOGIN - ícone no menu superior</button>
          </Link>
          <h1>Manifest the change you want to see in the world</h1>
          <Link to="about">
            <button>LET'S START - ícone de seta em box</button>
          </Link>
        </div>
      </div>
    </>
  );
}
