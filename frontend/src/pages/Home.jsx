import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import Note from "../components/Note";

function Home() {
  const { user } = useContext(UserContext);

  const [notesData, setNotesData] = useState([]);

  async function loadData() {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/notes-by-user/${
          user && user.id
        }`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setNotesData(res.data);
    } catch (e) {
      console.info(e);
    }
  }

  useEffect(() => {
    if (user) loadData();
  }, [user]);

  return (
    <div className="home">
      {notesData.map((note) => {
        return (
          <Note
            key={note.id}
            note={note}
            className="note"
            // eslint-disable-next-line react/jsx-no-bind
            loadData={loadData}
          />
        );
      })}
    </div>
  );
}

export default Home;
