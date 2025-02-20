import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile, fetchUserProfile } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    profilePhoto: "",
    experience: "",
    location: "",
    preferences: "",
    skills: "",
    interests: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile());
    } else {
      setFormData({
        name: user.name || "",
        profilePhoto: user.profilePhoto || "",
        experience: user.experience || "",
        location: user.location || "",
        preferences: user.preferences ? user.preferences.join(", ") : "",
        skills: user.skills ? user.skills.join(", ") : "",
      });
    }
  }, [user, dispatch]);

  console.log(user, String);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const updatedData = {
      ...formData,
      skills: formData.skills.split(",").map((skill) => skill.trim()),
      preferences: formData.preferences.split(",").map((preference) => preference.trim()),
    };

    try {
      await dispatch(updateUserProfile(updatedData)).unwrap();
      setMessage("Profile updated successfully!");
      setTimeout(() => navigate("/user-profile"), 2000); // Redirect after 2 sec
    } catch (error) {
      setMessage(error.message || "Failed to update profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className=" flex h-full bg-cover bg-[#f6f6f6] bg-center items-center justify-center">

      <div className=" bg-[#fdfdfd] border p-10 mt-10 mb-10 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>

        {message && (
          <div
            className={`text-center p-2 mb-4 rounded ${message.includes("successfully") ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
              }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2  rounded-md bg-[#f6f6f6]"
            />
          </div>

          {/* Profile Photo */}
          <div>
            <label className="block text-gray-700">Profile Photo URL</label>
            <input
              type="text"
              name="profilePhoto"
              value={formData.profilePhoto}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-[#f6f6f6]"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-gray-700">Experience</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-4 py-2  rounded-md bg-[#f6f6f6]"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2  rounded-md bg-[#f6f6f6]"
            />
          </div>

          {/* Preferences */}
          <div>
            <label className="block text-gray-700">Preferences(comma separated)</label>
            <input
              type="text"
              name="preferences"
              value={formData.preferences}
              onChange={handleChange}
              className="w-full px-4 py-2  rounded-md bg-[#f6f6f6]"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-gray-700">Skills (comma separated)</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full px-4 py-2   rounded-md bg-[#f6f6f6]"
            />
          </div>



          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-md transition ${isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#7e012d] text-white hover:bg-blue-700"
                }`}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div >
  );
};

export default EditProfile;
