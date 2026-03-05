// src/components/AddCollaborators.jsx
import { useState } from "react";
import AddCollaboratorForm from "./AddCollaborators";

export default function AddCollaborators() {
  const [noteId, setNoteId] = useState("");

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Collaborators</h2>
      <input
        type="text"
        placeholder="Enter Note ID"
        value={noteId}
        onChange={(e) => setNoteId(e.target.value)}
        className="border px-3 py-2 rounded w-full mb-4"
      />
      {noteId && <AddCollaboratorForm noteId={noteId} onCollaboratorAdded={() => {}} />}
    </div>
  );
}