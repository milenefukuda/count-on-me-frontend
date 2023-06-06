import { Routes, Route } from "react-router-dom";
import { Signup } from "./pages/Signup/index.js";
import { Home } from "./pages/Home/index.js";
import { About } from "./pages/About.js";
import { Login } from "./pages/Login.js";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
