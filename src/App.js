import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { AuthContextComponent } from "./contexts/authContext.js";
import { Signup } from "./pages/Signup/index.js";
import { Home } from "./pages/Home/index.js";
import { About } from "./pages/About.js";
import { Login } from "./pages/Login.js";

function App() {
  return (
    <>
      <div>
        <AuthContextComponent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </AuthContextComponent>
      </div>
    </>
  );
}

export default App;
