function NoteForm({
  title,
  setTitle,
  content,
  setContent,
  handleSubmit,
  editId,
  cancelEdit,
}) {
  return (
    <section className="note-panel">
      <form onSubmit={handleSubmit} className="note-form">
        <div className="input-group">
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Content</label>
          <textarea
            placeholder="Write your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button className="primary-btn" type="submit">
          {editId ? "Update Note" : "Add Note"}
        </button>

        {editId && (
          <button type="button" className="cancel-btn" onClick={cancelEdit}>
            Cancel Edit
          </button>
        )}
      </form>
    </section>
  );
}

export default NoteForm;