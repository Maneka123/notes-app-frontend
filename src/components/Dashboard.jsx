// src/components/Dashboard.jsx
import { useState } from "react";
import Nav from "./Nav";
import CreateNoteForm from "./createNoteForm";
import ViewNotes from "./viewNotes";
import SharedNotes from "./SharedNotes";
import AddCollaborators from "./AddCollaboratorForm";
// AddCollaborators can just reuse AddCollaboratorForm


export default function Dashboard() {
  const [page, setPage] = useState("view-notes"); // default page

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) window.location.href = "/"; // redirect to homepage
    } catch (err) {
      console.error(err);
      alert("Logout failed");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Nav setPage={(p) => {
        if (p === "logout") handleLogout();
        else setPage(p);
      }} />

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        {page === "create-note" && <CreateNoteForm />}
        {page === "view-notes" && <ViewNotes />}
        
        {page === "shared-with-me" && <SharedNotes />}
      </main>
    </div>
  );
}