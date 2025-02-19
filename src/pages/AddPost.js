import React, { useState } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../redux/postSlice";
import { useNavigate } from "react-router-dom";

function AddPost() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user token from Redux or localStorage
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId"); // or from Redux

  // Handle image change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file); // ✅ Store actual file
      setSelectedImage(URL.createObjectURL(file)); // Keep preview for UI
      setFileName(file.name);
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setFileName("");
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content || !category) {
      alert("Content and Category are required.");
      return;
    }

    // Dispatch the addPost action
    dispatch(addPost({ userId, content, category, image: selectedFile, token }))
      .then(() => {
        navigate("/home"); // Redirect after post creation
      })
      .catch((error) => {
        console.log("Error adding post:", error);
      });
  };

  return (
    <div className="min-h-screen w-full bg-[#f6f6f6] p-6 rounded-xl shadow-lg text-white">
      <hr className="border-y border-[#e2e2e2] h-px" />
      <h2 className="text-2xl font-semibold mb-4 text-[#010101]">Add New Post</h2>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="flex items-center border p-6 rounded-lg bg-[#fdfdfd]">
            <div className="w-full md:w-[30%] text-center mb-2 md:mb-0">
              <p className="text-sm font-semibold mb-2 text-[#010101]">CONTENT</p>
            </div>
            <textarea
              className="w-full bg-[#f6f6f6] border p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="4"
              placeholder="Write your content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <div className="flex items-center border p-4 rounded-lg bg-[#fdfdfd]">
            <div className="w-full md:w-[30%] text-center mb-2 md:mb-0">
              <p className="text-sm font-semibold mb-2 text-[#010101]">CATEGORY</p>
            </div>
            <input
              type="text"
              className="w-full bg-[#f6f6f6] border p-3 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter category..."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center border p-4 rounded-lg w-full bg-[#fdfdfd]">
            <div className="w-full md:w-[30%] text-center mb-2 md:mb-0">
              <p className="text-sm font-semibold text-[#010101]">IMAGE</p>
            </div>

            <div className="flex flex-col md:flex-row items-center w-full">
              {!selectedImage ? (
                <label className="cursor-pointer bg-[#f6f6f6] sm:px-4 py-2 px-3 rounded-lg text-gray-300 font-semibold hover:bg-purple-500 transition">
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              ) : (
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full">
                  <div className="w-full md:w-[30%] rounded-lg overflow-hidden">
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <p className="sm:text-xs md:text-sm break-all">{fileName}</p>
                    <button
                      className="border text-white p-1 rounded-full hover:border-purple-500 transition"
                      onClick={handleRemoveImage}
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex sm:justify-end justify-center space-x-2">
          <button type="submit" className="bg-[#7e012d] border sm:px-6 py-2 px-3 rounded-full text-black hover:bg-gray-500 transition">
            CREATE
          </button>
          <button type="button" className="border border-[#7e012d] sm:px-6 py-2 px-3 rounded-full text-[#7e012d] font-semibold hover:bg-gray-500 transition">
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPost;
