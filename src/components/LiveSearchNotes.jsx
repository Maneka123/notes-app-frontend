// src/components/LiveSearchNotes.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import DOMPurify from "dompurify";

export default function LiveSearchNotes() {
  const [query, setQuery] = useState("");
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim() === "") {
      setNotes([]);
      setError(null);
      return;
    }

    // Debounce: only fetch after 300ms of inactivity
    const debounce = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/notes/search?q=${encodeURIComponent(query)}`,
          { withCredentials: true }
        );
        setNotes(response.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch search results");
        setNotes([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto mt-6 px-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search notes by title or content..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      {/* Status Messages */}
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {loading && <p className="text-gray-500 mb-2">Loading...</p>}
      {notes.length === 0 && query && !loading && (
        <p className="text-gray-500">No notes found.</p>
      )}

      {/* Notes List */}
      <ul className="space-y-4">
        {notes.map((note) => (
          <li
            key={note._id}
            className="p-4 border rounded shadow-sm bg-blue-50"
          >
            <h3 className="font-semibold text-lg">{note.title}</h3>

            {/* Render HTML content safely */}
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(note.content) }}
            ></div>

            <p className="text-sm text-gray-500 mt-2">
              Permission: {note.permission}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}