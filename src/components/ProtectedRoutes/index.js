import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ProtectedRoute(props) {
  const { component: Component } = props;
  const navigate = useNavigate;
  const loggedInUser = localStorage.getItem("loggedInUser");
  const parsedUser = JSON.parse(loggedInUser || '""');
  useEffect(() => {
    try {
      if (!parsedUser) navigate("/login");
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  }, []);
  return <Component />;
}
