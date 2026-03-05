// src/components/Homepage.jsx
import { Link } from "react-router-dom";
//import HeroImage from "../assets/image.png"; // put a hero image in src/assets

export default function Homepage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 p-6">
      
      {/* Header with Hero Image */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Welcome to My Notes App</h1>
        <p className="text-lg text-gray-600 mb-6">
          Organize, collaborate, and share your notes effortlessly
        </p>
       
      </header>

      {/* Buttons with Icons */}
      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md justify-center">
        <Link
          to="/login"
          className="flex items-center justify-center gap-3 flex-1 px-6 py-4 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition text-xl font-semibold"
        >
          <span className="text-2xl">🔑</span>
          Login
        </Link>

        <Link
          to="/register"
          className="flex items-center justify-center gap-3 flex-1 px-6 py-4 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition text-xl font-semibold"
        >
          <span className="text-2xl">📝</span>
          Register
        </Link>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} My Notes App. All rights reserved.
      </footer>
    </div>
  );
}