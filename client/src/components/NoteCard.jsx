function NoteCard({ note, handleEdit, handleDelete, handleToggleComplete }) {
  return (
    <article className={`note-card ${note.completed ? "completed-note" : ""}`}>
      {note.completed && (
        <div className="diwali-burst">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}

      <h3 className="animated-title">{note.title}</h3>
      <p className="animated-content">{note.content}</p>

      <div className="card-actions">
        <button
          onClick={() => handleToggleComplete(note)}
          className="done-btn"
        >
          {note.completed ? "Undo" : "Done ✨"}
        </button>

        <button onClick={() => handleEdit(note)} className="edit-btn">
          Edit
        </button>

        <button onClick={() => handleDelete(note._id)} className="delete-btn">
          Delete
        </button>
      </div>
    </article>
  );
}

export default NoteCard;