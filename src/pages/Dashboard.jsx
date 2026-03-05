import { useState } from "react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
        <div className="flex items-center">
          <button
            className="mr-4 text-gray-700 md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {/* Hamburger icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-800">My Dashboard</h1>
        </div>
        <div>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`bg-white w-64 shadow-md p-6 space-y-6 transition-transform transform md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative absolute z-50 h-full`}
        >
          <nav className="space-y-3">
            <a
              href="#"
              className="block px-4 py-2 rounded hover:bg-purple-100 text-gray-700 font-medium"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="block px-4 py-2 rounded hover:bg-purple-100 text-gray-700 font-medium"
            >
              Users
            </a>
            <a
              href="#"
              className="block px-4 py-2 rounded hover:bg-purple-100 text-gray-700 font-medium"
            >
              Settings
            </a>
            <a
              href="#"
              className="block px-4 py-2 rounded hover:bg-purple-100 text-gray-700 font-medium"
            >
              Reports
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Example cards */}
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">Users</h2>
              <p className="text-gray-500">120 active users</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">Sales</h2>
              <p className="text-gray-500">$3,450 this month</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">Tasks</h2>
              <p className="text-gray-500">8 tasks pending</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <ul className="space-y-2 text-gray-700">
              <li>User John signed up</li>
              <li>Payment received from Jane</li>
              <li>New report generated</li>
            </ul>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white shadow-inner p-4 text-center text-gray-500">
        &copy; 2026 My Dashboard. All rights reserved.
      </footer>
    </div>
  );
}