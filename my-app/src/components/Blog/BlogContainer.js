import React, { useState } from "react";
import Seacrhbar from "./Seacrhbar";
import Blogpost from "./Blogpost";
import Header from "../Header";

const BlogContainer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div>
      <Header />
      <Seacrhbar setSearchQuery={setSearchQuery} />
      <Blogpost searchQuery={searchQuery} />
    </div>
  );
};

export default BlogContainer;
