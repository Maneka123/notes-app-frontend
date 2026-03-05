import React, { useState, useEffect } from "react";

// View Notes Component
const ViewNotes = ({ notes }) => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Your Notes</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <div key={note._id} className="bg-white p-4 rounded shadow">
          <h2 className="font-bold text-lg">{note.title}</h2>
          <p className="text-gray-700 mt-2">{note.content}</p>
          {note.collaborators && (
            <p className="text-sm text-gray-500 mt-2">
              Collaborators: {note.collaborators.join(", ")}
            </p>
          )}
        </div>
      ))}
    </div>
  </div>
);

// Create Note Component
const CreateNote = ({ addNote }) => {
  const [note, setNote] = useState({ title: "", content: "", permission: "edit" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ send httpOnly cookie automatically
        body: JSON.stringify(note),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Note created successfully!");
        addNote(data); // update parent notes
        setNote({ title: "", content: "", permission: "edit" });
      } else {
        setMessage(data.error || "❌ Failed to create note");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Server error");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create Note</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Title"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Content"
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
          className="w-full p-2 border rounded h-32"
          required
        />
        <select
          value={note.permission}
          onChange={(e) => setNote({ ...note, permission: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="edit">Edit</option>
          <option value="view">View</option>
        </select>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create
        </button>
      </form>

      {message && <p className="mt-4 text-green-600 font-medium">{message}</p>}
    </div>
  );
};

// Add Collaborators Component
const AddCollaborators = () => {
  const [collab, setCollab] = useState({ noteId: "", name: "" });
  const [message, setMessage] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:5000/api/notes/${collab.noteId}/collaborators`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ userId: collab.name }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage(`✅ Added ${collab.name} successfully!`);
        setCollab({ noteId: "", name: "" });
      } else {
        setMessage(data.error || "❌ Failed to add collaborator");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Server error");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Collaborators</h1>
      <form onSubmit={handleAdd} className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Note ID"
          value={collab.noteId}
          onChange={(e) => setCollab({ ...collab, noteId: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Collaborator Name"
          value={collab.name}
          onChange={(e) => setCollab({ ...collab, name: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add
        </button>
      </form>
      {message && <p className="mt-4 text-green-600 font-medium">{message}</p>}
    </div>
  );
};

// Notes Shared With Me Component
const SharedWithMe = ({ notes }) => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Notes Shared With Me</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <div key={note._id} className="bg-white p-4 rounded shadow">
          <h2 className="font-bold text-lg">{note.title}</h2>
          <p className="text-gray-700 mt-2">{note.content}</p>
          {note.collaborators && (
            <p className="text-sm text-gray-500 mt-2">
              Collaborators: {note.collaborators.join(", ")}
            </p>
          )}
        </div>
      ))}
    </div>
  </div>
);

// Main Component
const Main = ({ page }) => {
  const [notes, setNotes] = useState([]);

  // Fetch notes on load
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/notes", {
          credentials: "include", // ✅ send httpOnly cookie
        });
        if (res.ok) {
          const data = await res.json();
          setNotes(data);
        }
      } catch (err) {
        console.error("Failed to fetch notes:", err);
      }
    };
    fetchNotes();
  }, []);

  const addNote = (note) => {
    setNotes((prev) => [...prev, note]);
  };

  switch (page) {
    case "create-note":
      return <CreateNote addNote={addNote} />;
    case "view-notes":
      return <ViewNotes notes={notes} />;
    case "add-collaborators":
      return <AddCollaborators />;
    case "shared-with-me":
      return <SharedWithMe notes={notes} />;
    default:
      return <ViewNotes notes={notes} />;
  }
};

export default Main;