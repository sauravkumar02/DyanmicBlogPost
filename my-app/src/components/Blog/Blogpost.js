import React, { useEffect, useState } from "react";
import Header from "../Header";
import { useNavigate } from "react-router-dom";

const Blogpost = ({ searchQuery }) => {
  const navigate = useNavigate();
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    fetchBlog();
  }, []);

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

  const singlePost = (id) => {
    localStorage.setItem("postID", id);
    navigate("/blog");
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div>
      <div className="bg-white py-12 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredBlogs.map((e) => (
              <div
                key={e.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                onClick={() => singlePost(e._id)}
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
                  {/* <p className="mt-2 text-sm leading-6 text-gray-600 line-clamp-3">
                    {e.descrption}
                  </p> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogpost;
