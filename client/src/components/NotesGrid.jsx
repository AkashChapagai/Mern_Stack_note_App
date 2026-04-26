import NoteCard from "./NoteCard";

function NotesGrid({ notes, handleEdit, handleDelete, handleToggleComplete }) {
  return (
    <section className="notes-section">
      <div className="section-header">
        <h2>My Notes</h2>
        <span>{notes.length} notes</span>
      </div>

      {notes.length === 0 ? (
        <div className="empty-box">
          <h3>No notes yet</h3>
          <p>Start by creating your first note 🚀</p>
        </div>
      ) : (
        <div className="notes-grid">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleToggleComplete={handleToggleComplete}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default NotesGrid;