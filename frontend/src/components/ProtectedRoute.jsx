import { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

// Creating a protected route component that uses UserContext
const ProtectedRoute = ({ children }) => {
  // Using the UserContext to get the current user
  const { setUser } = useContext(UserContext);
  // Using the useNavigate hook to get a function to navigate to different routes
  const navigate = useNavigate();

  // Using the useEffect hook to redirect to the home page if no user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/users-by-token`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch(() => navigate("/home"));
    } else {
      navigate("/");
    }
  }, []); // This effect runs whenever the user changes

  // Rendering the children if the user is logged in
  return children;
};

export default ProtectedRoute;
