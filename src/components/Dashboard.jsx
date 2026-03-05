// src/components/Dashboard.jsx
import { useState, useEffect } from "react";
import Nav from "./Nav";
import Header from "./Header";
import CreateNoteForm from "./createNoteForm";
import ViewNotes from "./viewNotes";
import SharedNotes from "./SharedNotes";
import AddCollaborators from "./AddCollaborators";

export default function Dashboard() {
  const [page, setPage] = useState("view-notes");
  const [user, setUser] = useState(null);

  // Fetch logged-in user info
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

  // Logout function
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
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Nav
        setPage={(p) => {
          if (p === "logout") handleLogout();
          else setPage(p);
        }}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header
          title={`Welcome, ${user?.name || "User"}`}
          onLogout={handleLogout}
        />

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto bg-gray-100">
          <div className="max-w-7xl mx-auto">
            {page === "create-note" && (
              <div className="bg-white shadow-md rounded-lg p-6">
                <CreateNoteForm />
              </div>
            )}
            {page === "view-notes" && (
              <div className="bg-white shadow-md rounded-lg p-6">
                <ViewNotes />
              </div>
            )}
            {page === "shared-with-me" && (
              <div className="bg-white shadow-md rounded-lg p-6">
                <SharedNotes />
              </div>
            )}
            {page === "add-collaborators" && (
              <div className="bg-white shadow-md rounded-lg p-6">
                <AddCollaborators />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}