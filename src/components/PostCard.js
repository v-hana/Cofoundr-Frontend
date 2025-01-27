import React from "react";

const PostCard = ({ name, date, content, image }) => (
  <div className="relative bg-[#BAA7FC2E] text-white p-6 md:p-10 border rounded-lg shadow-lg">
    {/* Buttons on the top-right */}
    <div className="flex justify-between items-center">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-4">
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="text-lg md:text-xl font-bold">{name}</h3>
          <p className="text-sm font-semibold text-gray-400">{date}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button>
          <i className="far fa-bookmark text-[#7A7685] text-xl md:text-2xl transition duration-300 hover:text-white"></i>
        </button>
        <button>
          <i className="far fa-paper-plane text-[#7A7685] text-xl md:text-2xl transition duration-300 hover:text-white"></i>
        </button>
      </div>
    </div>
    {/* Content */}
    <p className="mb-4 font-semibold text-sm md:text-base">{content}</p>

    {/* Image */}
    <img
      src={image}
      alt="Post"
      className="w-full h-48 md:h-80 shadow shadow-gray-900 rounded-lg object-cover"
    />
  </div>
);

export default PostCard;