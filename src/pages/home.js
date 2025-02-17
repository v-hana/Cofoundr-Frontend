import React from "react";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";

const Home = () => {
  const posts = [
    {
      name: "John Anderson",
      date: "1/2/2034",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec arcu quam, placerat sed sollicitudin...",
      image: "https://i.ibb.co/7nYvTwx/medium-shot-man-wearing-vr-glasses.jpg",
    },
    {
      name: "Jane Doe",
      date: "3/5/2034",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec arcu quam, placerat sed sollicitudin...",
      image: "https://i.ibb.co/7nYvTwx/medium-shot-man-wearing-vr-glasses.jpg",
    },
  ];

  return (
    <div className="bg-[#f6f6f6] min-h-screen">
      {/* Navbar */}
      <Navbar />
      <hr className="border-y border-[#e2e2e2] h-px" />

      {/* Posts */}
      <div className="px-6 md:px-20 mx-auto space-y-6 mt-6">
        {posts.map((post, index) => (
          <PostCard
            key={index}
            name={post.name}
            date={post.date}
            content={post.content}
            image={post.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;