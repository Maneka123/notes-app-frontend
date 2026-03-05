import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between items-center bg-white shadow p-4">
      <div className="text-2xl font-bold text-purple-600">Notes Dashboard</div>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search"
          className="px-2 py-1 border rounded"
        />
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png"
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;