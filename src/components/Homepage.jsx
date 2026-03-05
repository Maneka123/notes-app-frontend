// Homepage.jsx
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to My Notes App</h1>

      <div className="flex gap-6">
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-lg"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="px-6 py-3 bg-purple-500 text-white rounded hover:bg-purple-600 transition text-lg"
        >
          Register
        </Link>
      </div>
    </div>
  );
}