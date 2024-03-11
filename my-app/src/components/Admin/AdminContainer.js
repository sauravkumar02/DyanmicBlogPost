// App.js
import React, { useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminDashboard from "./AdminDashboard";

const AdminContainer = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <AdminHeader setSearchQuery={setSearchQuery} />
      <AdminDashboard searchQuery={searchQuery} />
    </div>
  );
};

export default AdminContainer;
