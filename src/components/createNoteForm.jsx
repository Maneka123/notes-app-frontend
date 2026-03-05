// src/components/CreateNoteForm.jsx
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreateNoteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [permission, setPermission] = useState("edit");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // handle empty content (Quill outputs "<p><br></p>" for empty)
    if (!content || content === "<p><br></p>") {
      setMessage("Content is required!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // important for cookies
        body: JSON.stringify({ title, content, permission }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Something went wrong");
      } else {
        setMessage("Note created successfully!");
        setTitle("");
        setContent("");
        setPermission("edit");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create a Note</h2>
      {message && <p className="mb-4 text-sm text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Content with Quill */}
        <div>
          <label className="block font-semibold mb-1">Content</label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            className="w-full border rounded"
            style={{ minHeight: "150px" }} // mimic textarea height
          />
        </div>

        {/* Permission */}
        <div>
          <label className="block font-semibold mb-1">Permission</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={permission}
            onChange={(e) => setPermission(e.target.value)}
          >
            <option value="edit">Edit</option>
            <option value="view">View</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Create Note
        </button>
      </form>
    </div>
  );
}