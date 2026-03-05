import { useState, useEffect } from "react";
import SearchNotes from "./SearchNotes";

export default function SearchNotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all notes once on mount
  const fetchAllNotes = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/notes", {
        credentials: "include",
      });
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllNotes();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Search Notes</h2>

      {/* Search bar */}
      <SearchNotes onResults={(results) => setNotes(results)} onReset={fetchAllNotes} />

      {/* Error message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Loading indicator */}
      {loading && <p className="text-gray-500 mb-4">Loading notes...</p>}

      {/* Notes grid */}
      {notes.length === 0 && !loading && (
        <p className="text-gray-500">No notes found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {notes.map((note) => (
          <div
            key={note._id}
            className="p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl border bg-blue-50"
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-700">{note.title}</h3>
            <div className="text-gray-700 mb-2">{note.content}</div>
            <p className="text-sm text-gray-500 mb-1">Permission: {note.permission}</p>
          </div>
        ))}
      </div>
    </div>
  );
}