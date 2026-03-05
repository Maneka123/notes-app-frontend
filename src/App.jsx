import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateNoteForm from "./components/createNoteForm";
import ViewNotes from "./components/viewNotes";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";
import SharedNotes from "./components/SharedNotes"; // create this component

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md p-4 flex justify-center gap-4">
          
        </nav>

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/create" element={<CreateNoteForm />} />
          <Route path="/view" element={<ViewNotes />} />
          <Route path="*" element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/shared" element={<SharedNotes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;