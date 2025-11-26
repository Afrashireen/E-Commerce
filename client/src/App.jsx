import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");

  return (
    <>
      <Navbar
        onSearch={(text) => setSearchText(text)}
        onCategorySelect={(cat) => setCategory(cat)}
      />
      <Home searchText={searchText} category={category} />
    </>
  );
}