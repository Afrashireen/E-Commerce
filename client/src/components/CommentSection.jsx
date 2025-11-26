import React, { useEffect, useState } from "react";
import axios from "axios";
import { API, DEFAULT_USER } from "../api"; // DEFAULT_USER can be { name: "Afra Shireen", profile_pic: "..." }

export default function CommentSection({ postId }) {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  const defaultUser = {
    name: "Afra Shireen",
    profile_pic: "https://images.unsplash.com/photo-1618599056968-4eefc008cef6?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  };

  const loadComments = async () => {
    try {
      const res = await axios.get(`${API}/comments/${postId}`);
      setComments(res.data);
    } catch (err) {
      console.error("Error loading comments:", err);
    }
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  const addComment = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await axios.post(`${API}/comments`, {
        post_id: postId,
        name: defaultUser.name,
        comment: text,
        profile_pic: defaultUser.profile_pic
      });

      setText("");
      loadComments();
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  return (
    <div className="mt-3">
      <form onSubmit={addComment} className="d-flex mb-2">
        <input
          className="form-control me-2"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button className="btn btn-purple" type="submit">
          Post
        </button>
      </form>

      <div className="mt-3">
        {comments.map((c) => (
          <div key={c.comment_id} className="d-flex mb-2">
            <img
              src={c.profile_pic || defaultUser.profile_pic}
              alt=""
              className="rounded-circle"
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
            />
            <div className="ms-2">
              <h6 className="fw-bold m-0">{c.name}</h6>
              <p className="m-0">{c.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
