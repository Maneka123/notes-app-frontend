import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateNoteForm from "./components/createNoteForm";
import ViewNotes from "./components/viewNotes";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";
import SharedNotes from "./components/SharedNotes";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />

        {/* Dashboard & Notes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateNoteForm />} />
        <Route path="/view" element={<ViewNotes />} />
        <Route path="/shared" element={<SharedNotes />} />

        {/* Fallback */}
        <Route path="*" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;