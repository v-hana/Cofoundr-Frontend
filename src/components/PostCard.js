import React from "react";

const PostCard = ({ name, date, content, image }) => (
  <div className="relative bg-[#fdfdfd] text-white p-6 md:p-10 border rounded-lg shadow-[rgba(149,157,165,0.2)_0px_8px_24px]

">
    {/* Header */}
    <div className="flex items-center space-x-4 mb-4">
      <img
        src="https://via.placeholder.com/40"
        alt="Profile"
        className="w-12 h-12 rounded-full"
      />
      <div>
        <h3 className="text-lg md:text-xl font-bold text-[#010101]">{name}</h3>
        <p className="text-sm font-semibold text-[#010101b8]">{date}</p>
      </div>
    </div>

    {/* Content */}
    <p className="mb-4 font-semibold text-sm md:text-base text-[#010101]">{content}</p>

    {/* Image */}
    <img
      src={image}
      alt="Post"
      className="w-full h-48 md:h-80 shadow shadow-gray-900 rounded-lg object-cover"
    />

    {/* Buttons at the Bottom */}
    <div className="flex justify-between items-center mt-4  pt-3">
      <button className="text-[#010101b8] hover:text-white text-sm md:text-base flex items-center">
        <i className="far fa-bookmark mr-2"></i> Save
      </button>
      <button className="text-[#010101b8] hover:text-white text-sm md:text-base flex items-center">
        <i className="far fa-paper-plane mr-2"></i> Send Interest
      </button>
    </div>
  </div>
);

export default PostCard;
