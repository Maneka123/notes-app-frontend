import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import CreateNoteForm from "./components/createNoteForm";
import ViewNotes from "./components/viewNotes";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import SharedNotes from "./components/SharedNotes"; 

// --- Logout Button Component ---
function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call the logout API
      await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include",
      });

      // Redirect to login page
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Failed to logout");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
}

// --- Main App ---
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md p-4 flex justify-center gap-4">
          <Link to="/register" className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition">
            Register
          </Link>
          <Link to="/login" className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">
            Login
          </Link>
          <Link to="/create" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Create Note
          </Link>
          <Link to="/view" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
            View Notes
          </Link>
          <Link to="/shared" className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition">
            Shared Notes
          </Link>
          <LogoutButton /> {/* <-- Logout button */}
        </nav>

        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/create" element={<CreateNoteForm />} />
          <Route path="/view" element={<ViewNotes />} />
          <Route path="/shared" element={<SharedNotes />} />
          <Route path="*" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;