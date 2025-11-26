import React from "react";
import CreatePost from "../components/CreatePost";
import PostFeed from "../components/PostFeed";

export default function Home({ searchText, category }) {
  return (
    <div className="container mt-4">
      <div className="row">

        {/* Center Feed */}
        <div className="col-lg-8 col-md-8 col-sm-12">
          <PostFeed selectedCategory={category} searchText={searchText} />
        </div>

        {/* Right: Create Post Box */}
        <div className="col-lg-4 col-md-4 col-sm-12">
          <CreatePost onPostCreated={() => window.location.reload()} />
        </div>

      </div>
    </div>
  );
}