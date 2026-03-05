import React, { useState, useEffect } from "react";
import Header from "./Header";
import Nav from "./Nav";
import Main from "./Main";

const DashboardPage = () => {
  const [page, setPage] = useState("view-notes");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/login";
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Nav setPage={setPage} />
      <div className="flex-1 flex flex-col">
        <Header />
        <Main page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default DashboardPage;