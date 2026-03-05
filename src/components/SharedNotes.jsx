// SharedNotes.jsx
import { useEffect, useState } from "react";

export default function SharedNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
              <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
              <p className="text-gray-700 mb-2">{note.content}</p>
              <p className="text-sm text-gray-500">
                Shared by: {note.owner?.name || "Unknown"}
              </p>
              <p className="text-sm text-gray-500">
                Your permission: {note.permission}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}