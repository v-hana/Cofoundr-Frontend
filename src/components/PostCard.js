import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePost, sendInterest } from "../redux/postSlice"; // Actions for Redux
import { removeSavedPost } from "../redux/postSlice";

const PostCard = ({ postId, name, date, content, image, profileImage }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token); // Get token from Redux store
  const savedPosts = useSelector((state) => state.posts.savedPosts);

  const [saved, setSaved] = useState(false);
  const [interestSent, setInterestSent] = useState(false);

  useEffect(() => {
    setSaved(savedPosts.includes(postId));
  }, [savedPosts, postId]);


  // Handle Save Post
  const handleSavePost = () => {
    if (!postId) {
      console.error("Error: postId is undefined");
      return;
    }
    if (saved) {
      dispatch(removeSavedPost({ postId, token }));
    } else {
      dispatch(savePost({ postId, token }));
    }
    setSaved(!saved);
  };


  // Handle Send Interest
  const handleSendInterest = () => {
    if (!interestSent) {
      dispatch(sendInterest({ postId, token }));
      setInterestSent(true);
    }
  };

  return (
    <div className="relative bg-[#fdfdfd] p-6 md:p-10 border rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={profileImage || "https://via.placeholder.com/40"} // Default profile pic
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="text-lg md:text-xl font-bold text-[#010101]">{name}</h3>
          <p className="text-sm font-semibold text-gray-600">{date}</p>
        </div>
      </div>

      {/* Content */}
      <p className="mb-4 font-semibold text-sm md:text-base text-[#010101]">
        {content}
      </p>

      {/* Image */}
      {image && (
        <img
          src={image}
          alt="Post"
          className="w-full h-48 md:h-80 shadow rounded-lg object-cover"
        />
      )}

      {/* Buttons */}
      <div className="flex justify-between items-center mt-4 pt-3">
        <button
          onClick={handleSavePost}
          className={`${saved ? "text-purple-500 font-bold" : "text-[#010101b8] hover:text-purple-500"
            } text-sm md:text-base flex items-center`}
        >
          <i className="far fa-bookmark mr-2"></i> {saved ? "Saved" : "Save"}
        </button>

        <button
          onClick={handleSendInterest}
          className={`${interestSent ? "text-green-500 font-bold" : "text-[#010101b8] hover:text-purple-500"
            } text-sm md:text-base flex items-center`}
        >
          <i className="far fa-paper-plane mr-2"></i> {interestSent ? "Interest Sent" : "Send Interest"}
        </button>
      </div>
    </div>
  );
};

export default PostCard;
