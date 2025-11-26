import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../api";
import PostCard from "./PostCard";

export default function PostFeed({ selectedCategory, searchText }) {
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const loadPosts = async () => {
    let url = `${API}/posts`;
    if (selectedCategory) url = `${API}/posts/category/${selectedCategory}`;
    const res = await axios.get(url);
    setPosts(res.data);
  };

  useEffect(() => { loadPosts(); }, [selectedCategory]);

  useEffect(() => {
    if (!searchText) setFiltered(posts);
    else
      setFiltered(
        posts.filter(
          (p) =>
            p.description.toLowerCase().includes(searchText.toLowerCase()) ||
            p.category?.toLowerCase().includes(searchText.toLowerCase())
        )
      );
  }, [searchText, posts]);

  return (
    <div className="mt-4">
      {filtered.length === 0 ? (
        <p className="text-muted">No posts found.</p>
      ) : (
        filtered.map((p) => <PostCard key={p.post_id} post={p} reload={loadPosts} />)
      )}
    </div>
  );
}