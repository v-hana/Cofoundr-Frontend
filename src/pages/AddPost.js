import React, { useState } from "react";
import { X } from "lucide-react";

function AddPost() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setFileName(file.name);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setFileName("");
  };

  return (
    <div className="min-h-screen w-full bg-[#2D2638] p-6 rounded-xl shadow-lg text-white">
      <h2 className="text-2xl font-semibold mb-4">Add New Post</h2>
      
      <div className="space-y-6">
        <div className="flex items-center border p-10 rounded-lg">
          <div className="w-full md:w-[30%] text-center mb-2 md:mb-0">
            <p className="text-sm font-semibold mb-2">CONTENT</p>
          </div>
          <textarea 
            className="w-full bg-[#2D2638] border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows="4"
            placeholder="Write your content here..."
          ></textarea>
        </div>

        <div className="flex items-center border p-4 rounded-lg">
          <div className="w-full md:w-[30%] text-center mb-2 md:mb-0">
            <p className="text-sm font-semibold mb-2">CATEGORY</p>
          </div>
          <input 
            type="text" 
            className="w-full bg-[#2D2638] border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter category..."
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center border p-4 rounded-lg w-full">
  <div className="w-full md:w-[30%] text-center mb-2 md:mb-0">
    <p className="text-sm font-semibold">IMAGE</p>
  </div>

  <div className="flex flex-col md:flex-row items-center w-full">
    {!selectedImage ? (
      <label className="cursor-pointer bg-purple-600 px-4 py-2 rounded-lg text-white font-semibold hover:bg-purple-500 transition">
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
          <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <p className="sm:text-xs md:text-sm  break-all">{fileName}</p>
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
        <button className="bg-[#7A7685] border sm:px-6 py-2 px-3  rounded-full text-white font-semibold hover:bg-gray-500 transition">CREATE</button>
        <button className="bg-[#7A7685] border sm:px-6 py-2 px-3  rounded-full text-white font-semibold hover:bg-gray-500 transition">CANCEL</button>
      </div>
    </div>
  );
}

export default AddPost;