import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { Routes, Route } from "react-router-dom";
import { AuthContextComponent } from "./contexts/authContext.js";
import { Signup } from "./pages/Signup/index.js";
import { Home } from "./pages/Home/index.js";
import { Login } from "./pages/Login/index.js";
import { Profile } from "./pages/Profile/index.js";

function App() {
  return (
    <>
      <div className="bg-sucess">
        <AuthContextComponent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/signup" element={<Signup />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/profile" element={<Profile />} />
          </Routes>
        </AuthContextComponent>
      </div>
    </>
  );
}

export default App;
