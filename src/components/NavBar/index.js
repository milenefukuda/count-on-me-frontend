import { Link } from "react-router-dom";

export function NavBar() {
  const NavBtnClass = "flex flex-row intems-center justifify-center";
  return (
    <>
      <nav className="h-16 text-lg border-b-2 border-indigo-400 flex flex-row items-center justify-evenly p-2 bg-indigo-700 mb-8 font-semibold text-indigo-100 shadow-xl">
        <Link to="/" className={NavBtnClass}>
          <button>HOME ÍCONE</button>
        </Link>
        <Link to="/about" className={NavBtnClass}>
          <button>ABOUT ÍCONE</button>
        </Link>
        <Link to="signup" className={NavBtnClass}>
          <button>SIGNUP ÍCONE</button>
        </Link>
      </nav>
    </>
  );
}
