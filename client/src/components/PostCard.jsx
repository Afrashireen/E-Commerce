import React, { useState, useEffect } from "react";
import axios from "axios";
import { API, DEFAULT_USER } from "../api";
import CommentSection from "./CommentSection";
import { FaHeart, FaRegCommentDots } from "react-icons/fa";

export default function PostCard({ post, reload }) {
  const [likes, setLikes] = useState(0);

  const loadLikes = async () => {
    const res = await axios.get(`${API}/likes/${post.post_id}`);
    setLikes(res.data.count);
  };

  const handleLike = async () => {
    await axios.post(`${API}/likes`, {
      post_id: post.post_id,
      user_id: DEFAULT_USER
    });
    loadLikes();
  };

  useEffect(() => {
    loadLikes();
  }, []);

  return (
    <div className="card shadow-sm p-3 mb-4">
      <div className="d-flex">
        <img
          src={post.profile_pic}
          alt=""
          className="rounded-circle"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
        <div className="ms-3">
          <h6 className="fw-bold text-purple m-0">{post.name}</h6>
          <small className="text-muted">{post.category}</small>
        </div>
      </div>

      <p className="mt-3">{post.description}</p>

      {post.image_url && (
        <img
          src={post.image_url}
          className="img-fluid rounded"
          alt=""
          style={{ maxHeight: "300px", objectFit: "cover" }}
        />
      )}

      <div className="d-flex gap-3 mt-3">
        <button className="btn btn-light d-flex align-items-center gap-1" onClick={handleLike}>
          <FaHeart className="text-danger" /> {likes}
        </button>

        <button className="btn btn-light d-flex align-items-center gap-1">
          <FaRegCommentDots className="text-purple" />
        </button>
      </div>

      <CommentSection postId={post.post_id} />
    </div>
  );
}