// src/components/ViewNotes.jsx
import { useEffect, useState } from "react";

// ----- Collaborator Form -----
function AddCollaboratorForm({ noteId, onCollaboratorAdded }) {
  const [userId, setUserId] = useState("");
  const [permission, setPermission] = useState("view");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all available users
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("http://localhost:5000/api/users", {
          credentials: "include",
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to fetch users");
        }
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchUsers();
  }, []);

  async function handleAddCollaborator(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `http://localhost:5000/api/notes/${noteId}/collaborators`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ userId, permission }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to add collaborator");
      }

      const updatedNote = await res.json();
      onCollaboratorAdded(updatedNote);
      setUserId("");
      setPermission("view");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleAddCollaborator}
      className="mt-4 p-3 border-t border-gray-300 flex flex-col gap-2"
    >
      <h4 className="font-semibold mb-2">Add Collaborator</h4>
      {error && <p className="text-red-500">{error}</p>}

      <select
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="border p-2 rounded w-full"
        required
      >
        <option value="">Select a user</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name} ({user.email})
          </option>
        ))}
      </select>

      <select
        value={permission}
        onChange={(e) => setPermission(e.target.value)}
        className="border p-2 rounded w-full"
      >
        <option value="view">View</option>
        <option value="edit">Edit</option>
      </select>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Collaborator"}
      </button>
    </form>
  );
}

// ----- Main ViewNotes Component -----
export default function ViewNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const noteColors = [
    "bg-pink-100",
    "bg-green-100",
    "bg-blue-100",
    "bg-yellow-100",
    "bg-purple-100",
    "bg-indigo-100",
  ];

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

  function startEditing(note) {
    setEditingNoteId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  }

  function cancelEditing() {
    setEditingNoteId(null);
    setEditTitle("");
    setEditContent("");
  }

  async function saveEdit(noteId) {
    try {
      const res = await fetch(`http://localhost:5000/api/notes/${noteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
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

  function handleCollaboratorAdded(updatedNote) {
    setNotes(notes.map((n) => (n._id === updatedNote._id ? updatedNote : n)));
  }

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading notes...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">My Notes</h2>
      {notes.length === 0 ? (
        <p className="text-gray-500">No notes found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note, index) => (
            <div
              key={note._id}
              className={`p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl border ${noteColors[index % noteColors.length]}`}
            >
              {editingNoteId === note._id ? (
                <>
                  <input
                    className="w-full border px-3 py-2 mb-3 rounded"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <textarea
                    className="w-full border px-3 py-2 mb-3 rounded"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={() => saveEdit(note._id)}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mb-2 text-gray-700">{note.title}</h3>
                  <p className="text-gray-700 mb-2">{note.content}</p>
                  <p className="text-sm text-gray-500 mb-3">Permission: {note.permission}</p>
                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={() => startEditing(note)}
                      className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(note._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}

              <AddCollaboratorForm
                noteId={note._id}
                onCollaboratorAdded={handleCollaboratorAdded}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}