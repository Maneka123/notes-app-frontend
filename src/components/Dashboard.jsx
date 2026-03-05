// src/components/Dashboard.jsx
import { useState, useEffect } from "react";
import Nav from "./Nav";
import Header from "./Header";
import CreateNoteForm from "./createNoteForm";
import ViewNotes from "./viewNotes";
import SharedNotes from "./SharedNotes";
import AddCollaborators from "./AddCollaboratorForm";

export default function Dashboard() {
  const [page, setPage] = useState("view-notes");
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("http://localhost:5000/api/me", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    }
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Logout failed");
    }
  };

  return (
    <div className="flex h-screen">
      <Nav
        setPage={(p) => {
          if (p === "logout") handleLogout();
          else setPage(p);
        }}
      />
      <div className="flex-1 flex flex-col">
        <Header title={`Welcome, ${user?.name || "User"}`} onLogout={handleLogout} />
        <main className="flex-1 p-6 bg-gray-100 overflow-auto">
          {page === "create-note" && <CreateNoteForm />}
          {page === "view-notes" && <ViewNotes />}
          {page === "shared-with-me" && <SharedNotes />}
          {page === "add-collaborators" && <AddCollaborators />}
        </main>
      </div>
    </div>
  );
}