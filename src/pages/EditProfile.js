import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile, fetchUserProfile } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    profilePhoto: "",
    experience: "",
    location: "",
    preference: "",
    skills: "",
    interests: "",
  });

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile());
    } else {
      setFormData({
        name: user.name || "",
        profilePhoto: user.profilePhoto || "",
        experience: user.experience || "",
        location: user.location || "",
        preference: user.preference || "",
        skills: user.skills ? user.skills.join(", ") : "",
        interests: user.interests ? user.interests.join(", ") : "",
      });
    }
  }, [user, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      skills: formData.skills.split(",").map((skill) => skill.trim()),
      interests: formData.interests.split(",").map((interest) => interest.trim()),
    };
    dispatch(updateUserProfile(updatedData));
    navigate("/user-profile");
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
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
            className="w-full px-4 py-2 border rounded-md"
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
            className="w-full px-4 py-2 border rounded-md"
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
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Preferences */}
        <div>
          <label className="block text-gray-700">Preferences</label>
          <input
            type="text"
            name="preference"
            value={formData.preference}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
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
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Interests */}
        <div>
          <label className="block text-gray-700">Interests (comma separated)</label>
          <input
            type="text"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
