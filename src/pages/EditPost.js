import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, editPost } from "../redux/postSlice";

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const post = posts.find((p) => p._id === postId);
  const [formData, setFormData] = useState({ content: "", category: "", image: "" });
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    dispatch(fetchPosts(postId));
  }, [dispatch, postId]);


  useEffect(() => {
    if (!post) {
      dispatch(fetchPosts()); // Fetch posts if not loaded
    }
  }, [dispatch, post]);

  useEffect(() => {
    if (post) {
      setFormData({
        content: post.content || "",
        category: post.category || "",
        image: post.image || null,
      });
    }
  }, [post]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setSelectedImage(URL.createObjectURL(file));
      setFileName(file.name);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setFileName("");
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    console.log("🔹 Form Data Before Sending:");
    console.log("Content:", formData.content);
    console.log("Category:", formData.category);
    console.log("Image:", formData.image);

    // if (!formData.content || !formData.category) {
    //   console.error("🚨 Error: Missing content or category");
    //   return;
    // }

    const updatedData = new FormData();
    updatedData.append("content", formData.content.trim()); // Ensure string values
    updatedData.append("category", formData.category.trim());

    if (formData.image) {
      updatedData.append("image", formData.image);
    }

    console.log("🔹 Sending FormData:");
    for (let pair of updatedData.entries()) {
      console.log(pair[0] + ": " + pair[1]); // Debugging: Check if FormData contains values
    }

    dispatch(editPost({ postId, content: formData.content, category: formData.category, image: formData.image, token }))
      .then((res) => {
        if (!res.error) {
          navigate("/user-profile"); // Redirect after success
        }
      });
  };


  return (
    <div className="min-h-screen w-full bg-[#f6f6f6] p-6 rounded-xl shadow-lg text-white">
      <h2 className="text-2xl font-semibold mb-4 text-[#010101]">Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="flex items-center border p-6 rounded-lg bg-[#fdfdfd]">
            <div className="w-full md:w-[30%] text-center mb-2 md:mb-0">
              <p className="text-sm font-semibold mb-2 text-[#010101]">CONTENT</p>
            </div>
            <textarea
              name="content"
              className="w-full bg-[#f6f6f6] border p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="4"
              placeholder="Write your content here..."
              value={formData.content}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="flex items-center border p-4 rounded-lg bg-[#fdfdfd]">
            <div className="w-full md:w-[30%] text-center mb-2 md:mb-0">
              <p className="text-sm font-semibold mb-2 text-[#010101]">CATEGORY</p>
            </div>
            <input
              type="text"
              name="category"
              className="w-full bg-[#f6f6f6] border p-3 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter category"
              value={formData.category}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center border p-4 rounded-lg w-full bg-[#fdfdfd]">
            <div className="w-full md:w-[30%] text-center mb-2 md:mb-0">
              <p className="text-sm font-semibold text-[#010101]">IMAGE</p>
            </div>

            <div className="flex flex-col md:flex-row items-center w-full">
              {!selectedImage ? (
                <label className="cursor-pointer bg-[#f6f6f6] sm:px-4 py-2 px-3 rounded-lg text-gray-300 font-semibold hover:bg-[#7e012d] transition">
                  Upload Image
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              ) : (
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full">
                  <div className="w-full md:w-[30%] rounded-lg overflow-hidden">
                    <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <p className="text-black sm:text-xs md:text-sm break-all">{fileName}</p>
                    <button
                      type="button"
                      className="border text-black p-1 rounded-full hover:border-[#7e012d] transition"
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
            UPDATE
          </button>
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="border border-[#7e012d] sm:px-6 py-2 px-3 rounded-full text-[#7e012d] font-semibold hover:bg-gray-500 transition"
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
