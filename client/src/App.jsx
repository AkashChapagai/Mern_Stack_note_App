import { useEffect, useState } from "react";
import "./App.css";

import NoteForm from "./components/NoteForm";
import NotesGrid from "./components/NotesGrid";

import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "./services/notesApi";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getNotes();
      setNotes(data);
    } catch (err) {
      setError("Failed to load notes. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("Please fill in both title and content.");
      return;
    }

    try {
      setError("");

      if (editId) {
        const updatedNote = await updateNote(editId, { title, content });

        setNotes(
          notes.map((note) => (note._id === editId ? updatedNote : note))
        );

        setEditId(null);
      } else {
        const newNote = await createNote({ title, content });
        setNotes([newNote, ...notes]);
      }

      setTitle("");
      setContent("");
    } catch (err) {
      setError("Something went wrong while saving the note.");
    }
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note._id);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this note?");

  if (!confirmDelete) return;

  try {
    setError("");

    await deleteNote(id);
    setNotes(notes.filter((note) => note._id !== id));
  } catch (err) {
    setError("Failed to delete note.");
  }
};
  

  const cancelEdit = () => {
    setEditId(null);
    setTitle("");
    setContent("");
    setError("");
  };
  const handleToggleComplete = async (note) => {
  try {
    setError("");

    const updatedNote = await updateNote(note._id, {
      completed: !note.completed,
    });

    setNotes(
      notes.map((item) =>
        item._id === note._id ? updatedNote : item
      )
    );
  } catch (err) {
    setError("Failed to update note status.");
  }
};

  return (
    <main className="app">
      <section className="hero">
        <div className="badge">MERN Practice Project</div>
        <h1>Akash Notes App</h1>
        <p>Create, update, and manage your notes with a clean MERN interface.</p>
      </section>

      {error && <div className="error-message">{error}</div>}

      <NoteForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        handleSubmit={handleSubmit}
        editId={editId}
        cancelEdit={cancelEdit}
      />

      {loading ? (
        <div className="loading-box">
          <div className="spinner"></div>
          <p>Loading notes...</p>
        </div>
      ) : (
        <NotesGrid
  notes={notes}
  handleEdit={handleEdit}
  handleDelete={handleDelete}
  handleToggleComplete={handleToggleComplete}
/>
      )}
    </main>
  );
}

export default App;