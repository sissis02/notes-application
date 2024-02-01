import { useContext } from "react";
import axios from "axios";
import { useRevalidator } from "react-router-dom";
import UserContext from "../context/UserContext";

function AddANote() {
  const { user } = useContext(UserContext);

  const revalidator = useRevalidator();

  // function to post a new note
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newNote = {
      title: event.target.submittedTitle.value,
      description: event.target.submittedDescription.value,
      userId: user.id,
    };
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/notes`,
        newNote
      );
      // eslint-disable-next-line no-param-reassign
      event.target.submittedTitle.value = "";
      // eslint-disable-next-line no-param-reassign
      event.target.submittedDescription.value = "";
      revalidator.revalidate();
    } catch (e) {
      console.info(e);
    }
  };

  return (
    <div className="addANote">
      <form onSubmit={handleSubmit}>
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
    </div>
  );
}

export default AddANote;
