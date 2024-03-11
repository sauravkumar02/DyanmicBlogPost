import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

const CreatePost = ({ closeCreateform }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    category: "",
    mainContent: EditorState.createEmpty(),
  });

  const handleChange = (e) => {
    console.log("eee", e.target);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    const rawContentState = convertToRaw(
      formData.mainContent.getCurrentContent()
    );

    console.log("djfhdjfdsf",rawContentState);
    const bodyContent = JSON.stringify({
      title: formData.title,
      description: formData.description,
      imageUrl: formData.imageUrl,
      category: formData.category,
      content: JSON.stringify(rawContentState),
    });

    let response = await fetch("http://localhost:3001/blog", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    let data = await response.json();
    if (response.ok) {
      toast.success("Post Saved Sucessfully");
      closeCreateform();
    } else {
      toast.error(" Failed");
    }
  };

  const handleEditorChange = (editorState) => {
    setFormData({
      ...formData,
      mainContent: editorState,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-800 bg-opacity-50 ">
      <div className=" mx-auto mt-2 mr-2 ml-2 p-4 bg-white shadow-lg rounded-lg ">
        <ToastContainer />
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Create Post
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description (max 80 words)
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              maxLength={80}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700"
            >
              Image URL
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a category</option>
              <option value="technology">Technology</option>
              <option value="travel">Travel</option>
              <option value="food">Food</option>
              <option value="fashion">Fashion</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="mainContent"
              className="block text-sm font-medium text-gray-700"
            >
              Main Content
            </label>
            {/* <textarea
            id="mainContent"
            name="mainContent"
            value={formData.mainContent}
            onChange={handleChange}
            rows={6}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          /> */}
            <Editor
              editorState={formData.mainContent}
              onEditorStateChange={handleEditorChange}
              wrapperClassName="mt-1 flex block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              toolbarClassName="border border-gray-300 inline-block  mr-2"
              editorClassName="p-2"
            />
          </div>
          <button
            type="Cancel"
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 mr-4"
            onClick={closeCreateform}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
