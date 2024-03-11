import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminHeader from "../Admin/AdminHeader";
import UpdatePost from "../Blog/UpdatePost";

const UserDashboard = ({ searchQuery }) => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [deletedBlogId, setDeletedBlogId] = useState(null);
  const [updatePost, setUpdatePost] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    fetchBlog();
  }, [deletedBlogId]);

  const filteredBlogs = allBlogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchBlog = async () => {
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    };
    let response = await fetch("http://localhost:3001/blog", {
      method: "GET",
      headers: headersList,
    });
    let data = await response.json();
    console.log("data", data);
    if (data && data.blog && data.blog.length > 0) {
      setAllBlogs(data.blog);
    }
  };

  const openUpdateform = (blog) => {
    setSelectedBlog(blog);
    setUpdatePost(true);
  };

  const closeUpdateform = () => {
    setUpdatePost(false);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div>
      <ToastContainer />
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredBlogs.map((e) => (
              <div
                key={e.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={
                    e.imageUrl
                      ? e.imageUrl
                      : "https://images.unsplash.com/photo-1502472584811-0a2f2feb8968?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  // alt="https://www.aimsindia.com/wp-content/uploads/2022/06/world-environment-1024x683.png"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex ">
                    <div className="text-xs text-gray-500  px-3 py-1.5">
                      {formatDate(e.createdAt)}
                    </div>

                    <div className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-200">
                      {e.category ? e.category : "General"}
                    </div>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900">
                    {e.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600 line-clamp-3">
                    {e.descrption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {updatePost && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-md w-full">
            <UpdatePost
              closeUpdateform={closeUpdateform}
              selectedBlog={selectedBlog}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
