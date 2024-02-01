import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

function Navbar() {
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogOut = () => {
    setUser(null);
    navigate("/");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  return (
    <div className="navbar">
      <div className="logo-container">
        <img src="/images/notes_logo.png" alt="logo of Notes application" />
      </div>
      <div className="links-container">
        <NavLink to="/home">Mes notes</NavLink>
        <NavLink to="add-a-note">Ajouter une nouvelle note</NavLink>
        <p onClick={handleLogOut} role="presentation">
          Déconnexion
        </p>
      </div>
    </div>
  );
}

export default Navbar;
