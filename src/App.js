import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles/leaflet.css";
import { Routes, Route } from "react-router-dom";
import { AuthContextComponent } from "./contexts/authContext.js";
import { Signup } from "./pages/Signup/index.js";
import { Home } from "./pages/Home/index.js";
import { Login } from "./pages/Login/index.js";
import { Profile } from "./pages/Profile/index.js";
import { CreateEvent } from "./pages/CreateEvent/index.js";
import { ViewEvent } from "./pages/ViewEvent/index.js";
import { ProtectedRoute } from "./components/ProtectedRoutes/index.js";
import { ThankYouMessage } from "./components/ThankYou/index.js";
import MapComponent from "./components/MapComponent/index.js";

function App() {
  return (
    <>
      <div className="bg-sucess">
        <AuthContextComponent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/signup" element={<Signup />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/event/view/:id" element={<ViewEvent />} />
            <Route
              path="/message/thankYouWall/:id"
              element={<ThankYouMessage />}
            />
            <Route path="/event/map/:id" element={<MapComponent />} />
            <Route
              path="/user/profile"
              element={<ProtectedRoute component={Profile} />}
            />
            <Route
              path="/event/create"
              element={<ProtectedRoute component={CreateEvent} />}
            />
          </Routes>
        </AuthContextComponent>
      </div>
    </>
  );
}

export default App;
