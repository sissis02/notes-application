import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

function Login() {
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const submittedEmail = e.target.submittedEmail.value;
      const submittedPassword = e.target.submittedPassword.value;
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        {
          submittedEmail,
          submittedPassword,
        }
      );
      if (response.status === 200) {
        setUser(response.data);
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="login">
      <div className="login-header">
        <div className="logo-container">
          <img src="/images/notes_logo.png" alt="logo of Notes application" />
        </div>
        <div className="paragraphs-header">
          <p>Bienvenue sur Notes !</p>
          <p>
            Ne laisse pas tes idées s'envoler dans l'oubli ! Connecte-toi
            maintenant et commence à donner vie à tes pensées
          </p>
          <p>
            Viens découvrir un univers où chaque note que tu prends devient une
            étape vers la réalisation de tes rêves et où ta prochaine grande
            idée n'attend que toi !
          </p>
        </div>
      </div>
      <form onSubmit={handleLogin}>
        <h2>Connexion</h2>
        <div className="inputs">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="submittedEmail" required />
        </div>
        <div className="inputs">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="submittedPassword"
            required
          />
        </div>

        <button type="submit">Se connecter</button>
      </form>
      <p className="error-message">{errorMessage}</p>
      <p className="paragraph-subscribe">
        Vous n'avez pas de compte ?
        <em>
          <Link to="/registration"> S'inscrire</Link>
        </em>
      </p>
    </div>
  );
}

export default Login;
