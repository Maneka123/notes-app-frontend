import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateNoteForm from "./components/createNoteForm";
import ViewNotes from "./components/viewNotes";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md p-4 flex justify-center gap-4">
          <Link to="/register" className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition">Register</Link>
          <Link to="/login" className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">Login</Link>
          <Link to="/create" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Create Note</Link>
          <Link to="/view" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">View Notes</Link>
        </nav>

        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/create" element={<CreateNoteForm />} />
          <Route path="/view" element={<ViewNotes />} />
          <Route path="*" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;