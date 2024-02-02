import { useContext, useState } from "react";
import axios from "axios";
import { useRevalidator } from "react-router-dom";
import UserContext from "../context/UserContext";

function AddANote() {
  const { user } = useContext(UserContext);

  const revalidator = useRevalidator();

  const [validationMessage, setValidationMessage] = useState("");

  // function to post a new note
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newNote = {
      title: event.target.submittedTitle.value,
      description: event.target.submittedDescription.value,
      category: event.target.cat.value,
      userId: user && user.id,
    };
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/notes`,
        newNote,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      // eslint-disable-next-line no-param-reassign
      event.target.submittedTitle.value = "";
      // eslint-disable-next-line no-param-reassign
      event.target.submittedDescription.value = "";
      revalidator.revalidate();
      setValidationMessage("Nouvelle note enregistrée !");
    } catch (e) {
      console.info(e);
    }
  };

  return (
    <div className="addANote">
      <form onSubmit={handleSubmit}>
        <label htmlFor="cat">Thème de la note :</label>

        <select name="cat" id="cat">
          <option value="">Choisir une catégorie</option>
          <option value="travail">Travail</option>
          <option value="personnel">Personnel</option>
          <option value="finances">Finances</option>
          <option value="education">Education</option>
          <option value="loisirs">Loisirs</option>
          <option value="voyages">Voyages</option>
          <option value="alimentation">Alimentation</option>
          <option value="projets">Projets</option>
        </select>

        <div className="inputs">
          <label htmlFor="title">Titre de la note</label>
          <input
            type="text"
            id="title"
            name="submittedTitle"
            maxLength="100"
            required
          />
        </div>
        <div className="textareas">
          <label htmlFor="description">Contenu de la note</label>
          <textarea
            name="submittedDescription"
            id="description"
            cols="30"
            rows="10"
            required
          />
        </div>
        <button type="submit">Enregistrer</button>
      </form>
      <p>{validationMessage}</p>
    </div>
  );
}

export default AddANote;
