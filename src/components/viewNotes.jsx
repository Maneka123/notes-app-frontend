// src/components/ViewNotes.jsx
import { useEffect, useState } from "react";

export default function ViewNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchNotes() {
      try {
        const res = await fetch("http://localhost:5000/api/notes", {
          method: "GET",
          credentials: "include", // send JWT cookie
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

    fetchNotes();
  }, []);

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
              <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
              <p className="text-gray-700 mb-2">{note.content}</p>
              <p className="text-sm text-gray-500">
                Permission: {note.permission}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}