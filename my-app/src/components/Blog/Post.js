import React, { useEffect, useState } from "react";
import Header from "../Header";
import { EditorState, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

const Post = () => {
  const postID = localStorage.getItem("postID");

  const [blogdata, setBlogData] = useState([]);

  const getBlog = async () => {
    let headersList = {
      Accept: "*/*",
    };

    let response = await fetch(`http://localhost:3001/blog/${postID}`, {
      method: "GET",
      headers: headersList,
    });

    let data = await response.json();
    if (response.ok) {
      if (data && data.blog && data.blog.length > 0) {
        setBlogData(data.blog);
      }
    } else {
      alert("No Blog");
    }
  };


  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    getBlog();
  }, []);

  const renderContent = (content) => {
    try {
      const parsedContent = JSON.parse(content);
      const contentState = convertFromRaw(parsedContent);
      const editorState = EditorState.createWithContent(contentState);
      return <Editor editorState={editorState} readOnly toolbarHidden />;
    } catch (error) {
      console.error("Error parsing content:", error);
      return <p>{content}</p>;
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto py-8">
        {blogdata.map((e) => {
          return (
            <div key={e._id} className="mb-8">
              <img
                src={e.imageUrl}
                alt="Blog Post Image"
                className="w-full h-[500px]"
              />
              <div className="flex mt-4">
                <div className="text-sm text-gray-500 px-3 py-1.5">
                  {formatDate(e.createdAt)}
                </div>
                <div className="rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-200">
                  {e.category ? e.category : "General"}
                </div>
              </div>
              <div className="prose lg:prose-lg">
                {renderContent(e.content)}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Post;
