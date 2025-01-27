import React from "react";

const ProfileCard = ({ title }) => {
  return (
    <div className="bg-purple-900 text-white rounded-2xl shadow-lg p-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-500" />
        <div>
          <h2 className="text-xl font-semibold">John Anderson</h2>
          <p className="text-sm">Software Developer | Photographer</p>
        </div>
      </div>
      <img
        src="https://via.placeholder.com/300x150"
        alt="Profile banner"
        className="w-full rounded-lg my-4"
      />
      <p className="text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.
      </p>
      <div className="grid grid-cols-4 gap-2 mt-4">
        {[...Array(4)].map((_, i) => (
          <img
            key={i}
            src="https://via.placeholder.com/100"
            alt={`Thumbnail ${i + 1}`}
            className="rounded-lg"
          />
        ))}
      </div>
      <button className="bg-blue-600 mt-4 px-4 py-2 rounded-lg hover:bg-blue-700 transition">
        See more
      </button>
    </div>
  );
};

const ProfileGrid = () => {
  const sections = [
    "Profiles based on preferences",
    "Profiles based on skills",
    "Profiles based on experience",
  ];

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <div className="max-w-7xl mx-auto">
        {sections.map((section, index) => (
          <div key={index} className="mb-12">
            <h1 className="text-2xl font-bold mb-6">{section}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(2)].map((_, i) => (
                <ProfileCard key={i} title={section} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileGrid;
