import { useRef } from "react";
import axios from "axios";
import { useNavigate, useRevalidator, Link } from "react-router-dom";

function Register() {
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const revalidator = useRevalidator();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const firstname = firstnameRef.current.value;
    const lastname = lastnameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
        firstname,
        lastname,
        email,
        password,
      });
      revalidator.revalidate();
      navigate("/");
    } catch (e) {
      console.info(e);
    }
  };

  return (
    <div className="register">
      <div className="register-header">
        <div className="logo-container">
          <img src="/images/notes_logo.png" alt="logo of Notes application" />
        </div>
        <div className="paragraphs-container">
          <p>
            Rejoindre l'application Notes est simple et totalement gratuit !
          </p>
          <p>
            As-tu déjà eu une idée brillante, une inspiration soudaine ou
            simplement besoin de noter quelque chose de rapide avant de
            l'oublier ? Avec Notes, tu peux sauvegarder ces moments précieux en
            un instant et les garder en sécurité pour toujours.
          </p>
          <p>
            Rejoins-nous dès aujourd'hui et commence à capturer chaque pensée,
            chaque moment d'inspiration et chaque idée géniale !
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <h2>Inscription</h2>
        <div className="inputs">
          <label htmlFor="firstname">Nom</label>
          <input type="text" id="firstname" ref={firstnameRef} required />
        </div>
        <div className="inputs">
          <label htmlFor="lastname">Prenom</label>
          <input type="text" id="lastname" ref={lastnameRef} required />
        </div>
        <div className="inputs">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailRef} required />
        </div>
        <div className="inputs">
          <label htmlFor="password">Mot de passe</label>
          <input type="password" id="password" ref={passwordRef} required />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
      <p className="paragraph-returnHome">
        <Link to="/">Revenir à la page d'accueil</Link>
      </p>
    </div>
  );
}

export default Register;
