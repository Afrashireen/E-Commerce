import React, { useState, useEffect } from "react";
import { FaSearch, FaFilter, FaMoon, FaSun } from "react-icons/fa";

export default function Navbar({ onSearch, onCategorySelect }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [dark]);

  const categories = ["All", "Art", "Travel", "Food", "Music", "Coding", "Sports", "Photography"];

  return (
    <nav
      className="navbar shadow-sm sticky-top px-3 d-flex justify-content-between align-items-center"
      style={{ background: "#6f42c1" }}
    >
      {/* Website Title */}
      <h3
        className="m-0 fw-bold"
        style={{
          color: "white",
          fontWeight: 700,
          letterSpacing: "1px",
          fontFamily: "Poppins"
        }}
      >
        HobbyHive
      </h3>

      {/* Search + Category Filter */}
      <div className="d-flex align-items-center gap-2">

        {/* SEARCH BOX */}
        <div className="input-group" style={{ width: "250px" }}>
          <span className="input-group-text" style={{ background: "white" }}>
            <FaSearch color="#6f42c1" />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search hobbies..."
            style={{ background: "white" }}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {/* CATEGORY FILTER */}
        <div className="dropdown">
          <button
            className="btn dropdown-toggle"
            style={{
              color: "#f7f5faff",
              background: "#6A0DAD",
              border: "1px solid #6A0DAD",
              fontWeight: 500
            }}
            data-bs-toggle="dropdown"
          >
            <FaFilter /> 
          </button>

          <ul className="dropdown-menu">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  className="dropdown-item"
                  onClick={() => onCategorySelect(cat === "All" ? "" : cat)}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* DARK / LIGHT MODE */}
        <button
          className="btn"
          style={{ color: "white" }}
          onClick={() => setDark(!dark)}
        >
          {dark ? <FaSun size={22} /> : <FaMoon size={22} />}
        </button>

      </div>
    </nav>
  );
}