import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/postSlice";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get posts and loading state from Redux store
  const { posts, loading, error } = useSelector((state) => state.posts);

  // Get the token (assuming it's stored in localStorage or Redux)
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(fetchPosts(token)); // Fetch posts from backend on mount
    } else {
      navigate("/login"); // Redirect to login if no token
    }
  }, [dispatch, token, navigate]);

  // Show loading or error messages
  if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-[#f6f6f6] min-h-screen">
      {/* Navbar */}
      <Navbar />
      <hr className="border-y border-[#e2e2e2] h-px" />
      <div>Error: {error}</div>;
      {/* Posts */}
      <div className="px-6 md:px-20 mx-auto space-y-6 mt-6">
        {posts.length === 0 ? (
          <p>No posts available</p>
        ) : (
          posts.map((post, index) => (
            <PostCard
              key={index}
              profileImage={post.userId?.profilePhoto || "/default-profile.png"}
              name={post.userId?.name || "Unknown User"}
              date={post.createdAt}
              content={post.content}
              image={post.image}
            />
          ))
        )}
      </div>
    </div>
  );
};
export default Home;
