import React, { useState } from "react";

const dummyNotes = [
  { id: 1, title: "Note 1", content: "This is note 1", collaborators: ["Alice"] },
  { id: 2, title: "Note 2", content: "This is note 2", collaborators: ["Bob"] },
];

const CreateNote = () => {
  const [note, setNote] = useState({ title: "", content: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Note created: ${note.title}`);
    setNote({ title: "", content: "" });
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
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create
        </button>
      </form>
    </div>
  );
};

const ViewNotes = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Your Notes</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {dummyNotes.map((note) => (
        <div key={note.id} className="bg-white p-4 rounded shadow">
          <h2 className="font-bold text-lg">{note.title}</h2>
          <p className="text-gray-700 mt-2">{note.content}</p>
          <p className="text-sm text-gray-500 mt-2">
            Collaborators: {note.collaborators.join(", ")}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const AddCollaborators = () => {
  const [collab, setCollab] = useState({ noteId: "", name: "" });

  const handleAdd = (e) => {
    e.preventDefault();
    alert(`Added ${collab.name} to Note ${collab.noteId}`);
    setCollab({ noteId: "", name: "" });
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
    </div>
  );
};

const SharedWithMe = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Notes Shared With Me</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {dummyNotes.map((note) => (
        <div key={note.id} className="bg-white p-4 rounded shadow">
          <h2 className="font-bold text-lg">{note.title}</h2>
          <p className="text-gray-700 mt-2">{note.content}</p>
          <p className="text-sm text-gray-500 mt-2">
            Collaborators: {note.collaborators.join(", ")}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const Main = ({ page }) => {
  switch (page) {
    case "create-note":
      return <CreateNote />;
    case "view-notes":
      return <ViewNotes />;
    case "add-collaborators":
      return <AddCollaborators />;
    case "shared-with-me":
      return <SharedWithMe />;
    default:
      return <ViewNotes />;
  }
};

export default Main;