// App.js
import React, { useState } from "react";
import AdminHeader from "../Admin/AdminHeader";
import UserDashboard from "./UserDashboard";

const UserContainer = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <AdminHeader setSearchQuery={setSearchQuery} />
      <UserDashboard searchQuery={searchQuery} />
    </div>
  );
};

export default UserContainer;
