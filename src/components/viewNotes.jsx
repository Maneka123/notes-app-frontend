import { useEffect, useState } from "react";

export default function ViewNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/notes", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to fetch notes");
      }

      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Delete a note
  async function handleDelete(noteId) {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/notes/${noteId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete note");
      }

      setNotes(notes.filter((note) => note._id !== noteId));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  // Start editing
  function startEditing(note) {
    setEditingNoteId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  }

  // Cancel editing
  function cancelEditing() {
    setEditingNoteId(null);
    setEditTitle("");
    setEditContent("");
  }

  // Save edited note
  async function saveEdit(noteId) {
    try {
      const res = await fetch(`http://localhost:5000/api/notes/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ title: editTitle, content: editContent }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update note");
      }

      const updatedNote = await res.json();
      setNotes(notes.map((n) => (n._id === noteId ? updatedNote : n)));
      cancelEditing();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  if (loading) return <p className="text-center mt-10">Loading notes...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">My Notes</h2>
      {notes.length === 0 ? (
        <p className="text-gray-500">No notes found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notes.map((note) => (
            <div key={note._id} className="p-4 bg-white shadow-md rounded-lg">
              {editingNoteId === note._id ? (
                <>
                  <input
                    className="w-full border px-2 py-1 mb-2 rounded"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <textarea
                    className="w-full border px-2 py-1 mb-2 rounded"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(note._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
                  <p className="text-gray-700 mb-2">{note.content}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    Permission: {note.permission}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditing(note)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(note._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}