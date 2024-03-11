import React, { useState } from "react";
import CreatePost from "../Blog/CreatePost";
import { useNavigate } from "react-router-dom";

const AdminHeader = ({ setSearchQuery }) => {
  const navigate = useNavigate();
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);


  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const openCreateform = () => {
    setShowCreatePostModal(true);
  };

  const closeCreateform = () => {
    setShowCreatePostModal(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="bg-gray-800 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search"
          className="rounded-l-lg py-1 px-2 focus:outline-none focus:ring focus:border-blue-300"
          onChange={handleSearch}
        />
        <button className="bg-blue-500 text-white rounded-r-lg py-1 px-2 ml-1" onClick={() => setSearchQuery("")}>
          Clear
        </button>
      </div>
      <div className="flex items-center">
        <button
          className="bg-green-500 text-white border-4xl mr-4 px-2 py-1 rounded-lg"
          onClick={openCreateform}
        >
          Create Post
        </button>
        <button
          className=" bg-red-500 text-white px-2 rounded-lg py-1"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      {showCreatePostModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-md w-full">
            <CreatePost closeCreateform={closeCreateform} />
          </div>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;
