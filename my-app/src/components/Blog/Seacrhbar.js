import React from "react";

const Seacrhbar = ({ setSearchQuery }) => {
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  return (
    <header className="py-4 px-6 flex items-center justify-center mt-8">
      <div className="flex items-center space-x-4 max-w-xl w-full border border-blue-500 rounded">
        <input
          type="text"
          placeholder="Search blogs..."
          className="rounded-l-lg py-2 px-4 w-full focus:outline-none focus:ring focus:border-blue-300"
          onChange={handleSearch}
        />
      </div>
    </header>
  );
};

export default Seacrhbar;
