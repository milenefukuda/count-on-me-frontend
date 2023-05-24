import { Link } from "react-router-dom";

export function About() {
  return (
    <>
      <div>
        <Link to="/login">
          <button>LOGIN - ícone no menu superior</button>
        </Link>
        <Link to="/home">
          <button>HOME - ícone no menu superior</button>
        </Link>
        <Link to="/events">
          <button>EXPLORE</button>
        </Link>
        <h1>ABOUT THE INITIATIVE</h1>
      </div>
    </>
  );
}
