import React from "react";

const Nav = ({ setPage }) => {
  const navItems = [
    { name: "Create Note", page: "create-note", icon: "✏️" },
    { name: "View Notes", page: "view-notes", icon: "📒" },
    { name: "Shared With Me", page: "shared-with-me", icon: "🔗" },
    { name: "Logout", page: "logout", icon: "🚪" },
  ];

  return (
    <aside className="bg-gray-900 text-white w-64 h-screen flex flex-col justify-between py-6">
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
    </aside>
  );
};

export default Nav;