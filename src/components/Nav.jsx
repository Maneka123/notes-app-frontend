import React from "react";

const Nav = ({ setPage }) => {
 const navItems = [
  { name: "Create Note", page: "create-note", icon: "✏️" },
  { name: "View Notes", page: "view-notes", icon: "📒" },
  { name: "Shared With Me", page: "shared-with-me", icon: "🔗" },
  { name: "Search Notes", page: "search", icon: "🔍" }, // ✅ page = "search"
  { name: "Logout", page: "logout", icon: "🚪" },
];

  return (
    <aside className="bg-gray-900 text-white w-64 h-screen flex flex-col justify-between">
      <div className="mt-6 space-y-4">
        {navItems.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-purple-700 transition-all duration-200"
            onClick={() => setPage(item.page)}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-lg font-medium">{item.name}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Nav; // ✅ Make sure this line exists