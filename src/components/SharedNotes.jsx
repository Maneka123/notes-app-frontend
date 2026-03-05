import { useEffect, useState } from "react";

export default function SharedNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null); // <-- track which note is being edited
  const [editForm, setEditForm] = useState({ title: "", content: "" });

  useEffect(() => {
    fetchSharedNotes();
  }, []);

  async function fetchSharedNotes() {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/notes/shared", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to fetch shared notes");
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

  function handleEditClick(note) {
    setEditingNoteId(note._id);
    setEditForm({ title: note.title, content: note.content });
  }

  function handleCancel() {
    setEditingNoteId(null);
    setEditForm({ title: "", content: "" });
  }

  async function handleSave(noteId) {
    try {
      const res = await fetch(`http://localhost:5000/api/notes/${noteId}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update note");
      }

      const updatedNote = await res.json();
      setNotes((prev) =>
        prev.map((n) => (n._id === noteId ? { ...n, ...updatedNote } : n))
      );
      handleCancel();
    } catch (err) {
      console.error(err);
      alert("Error updating note: " + err.message);
    }
  }

  if (loading) return <p className="text-center mt-10">Loading shared notes...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Notes Shared With Me</h2>
      {notes.length === 0 ? (
        <p className="text-gray-500">No notes have been shared with you.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notes.map((note) => (
            <div key={note._id} className="p-4 bg-white shadow-md rounded-lg">
              {editingNoteId === note._id ? (
                // --- Edit form ---
                <div>
                  <input
                    className="border p-2 w-full mb-2 rounded"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  />
                  <textarea
                    className="border p-2 w-full mb-2 rounded"
                    value={editForm.content}
                    onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSave(note._id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // --- Display note ---
                <div>
                  <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
                  <p className="text-gray-700 mb-2">{note.content}</p>
                  <p className="text-sm text-gray-500">
                    Shared by: {note.sharedBy?.name || note.sharedBy?.username || "Unknown"}
                  </p>
                  <p className="text-sm text-gray-500">Your permission: {note.permission}</p>
                  {note.permission === "edit" && (
                    <button
                      onClick={() => handleEditClick(note)}
                      className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}