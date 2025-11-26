import React, { useState } from "react";
import axios from "axios";
import { API, DEFAULT_USER } from "../api";
import { FaLink } from "react-icons/fa";

export default function CreatePost({ onPostCreated }) {
  const [description, setDescription] = useState("");
  const [image_url, setImageURL] = useState("");
  const [category, setCategory] = useState("");

  const submitPost = async (e) => {
    e.preventDefault();

    await axios.post(`${API}/posts`, {
      user_id: DEFAULT_USER,
      description,
      image_url,
      category
    });

    setDescription("");
    setImageURL("");
    setCategory("");
    onPostCreated();
  };

  return (
    <div 
      className="card shadow-sm p-3 mb-4"
      style={{ 
        borderRadius: "12px",
        borderTop: "4px solid #6a0dad" 
      }}
    >
      <h5 className="fw-bold mb-3" style={{ color: "#6a0dad" }}>
        What's on your mind?
      </h5>

      <form onSubmit={submitPost}>
        <textarea
          className="form-control"
          placeholder="Share your thoughts..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ minHeight: "80px" }}
        />

        <div className="input-group mt-3">
          <span 
            className="input-group-text" 
            style={{ background: "#6a0dad", color: "white" }}
          >
            <FaLink />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Image URL"
            value={image_url}
            onChange={(e) => setImageURL(e.target.value)}
          />
        </div>

        <input
          type="text"
          className="form-control mt-3"
          placeholder="Category (Art, Travel...)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button 
          className="btn w-100 mt-3" 
          style={{ backgroundColor: "#6a0dad", color: "white", fontWeight: 600 }}
        >
          Post
        </button>
      </form>
    </div>
  );
}