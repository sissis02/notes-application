import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Note({ note, loadData }) {
  const navigate = useNavigate();
  const [carte, setCarte] = useState(note);
  const [modify, setModify] = useState(true);

  // function to change the current state of Modify
  const handleShowModify = () => {
    setModify((current) => !current);
  };

  // function to change note informations
  const handleEditNote = async (e) => {
    e.preventDefault();
    const noteToUpdate = {
      title: e.target.edittedTitle.value,
      description: e.target.edittedDescription.value,
    };
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/notes/${note.id}`,
        noteToUpdate,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setCarte(noteToUpdate);
      loadData();
      setModify((current) => !current);
    } catch (err) {
      console.info(err);
    }
  };

  // function to delete the note
  const handleDeleteNote = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/notes/${note.id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      loadData();
      setModify((current) => !current);
      navigate("/home");
    } catch (err) {
      console.info(err);
    }
  };

  return modify ? (
    <div className="note">
      <h3>{carte.title}</h3>
      <p>{carte.description}</p>
      <button type="button" onClick={handleShowModify}>
        Modifier
      </button>
      {/* <button type="button">Supprimer</button> */}
    </div>
  ) : (
    <form className="note" onSubmit={handleEditNote}>
      <div
        className="cross-container"
        onClick={handleShowModify}
        role="presentation"
      >
        <img src="/images/croix.png" alt="cross to quite" />
      </div>
      <input type="text" name="edittedTitle" defaultValue={carte.title} />
      <textarea
        name="edittedDescription"
        defaultValue={carte.description}
        cols="30"
        rows="10"
      />
      <button type="submit" className="modify">
        Enregistrer
      </button>
      <button type="button" className="modify" onClick={handleDeleteNote}>
        Supprimer la note
      </button>
    </form>
  );
}

Note.propTypes = {
  note: PropTypes.shape.isRequired,
  loadData: PropTypes.func.isRequired,
};

export default Note;
