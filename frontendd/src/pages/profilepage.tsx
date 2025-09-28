import React, { useState, useEffect } from "react";
import { fetchUserDetails } from "../utils/fetchUserDetails";
import type { Profile } from "../types/userprofilecontext";
import { FaUser } from "react-icons/fa";

const UserProfile: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchUserDetails();

        setProfile(data);

        // setUserName(name);
      } catch (error) {
        console.log(error);
      }
    };

    loadUser();
  }, []);

  return (
    <div className="flex flex-col items-center w-full bg-purple-100 shadow-md rounded-xl py-2  px-6 relative">

      <FaUser className="w-18 h-18 rounded-full mt-4 text-gray-600 border-4 border-gray-200 object-cover" />

      <h2 className="mt-2 text-lg font-bold text-gray-800">
        {profile ? profile.username : "Loading..."}
      </h2>
      <div className=" absolute top-4 right-4 bg-green-400 md:px-4 md:py-2 rounded-[5px] ">
        <p className="text-gray-600 text-xl font-semibold">
          {profile ? profile.id : "Loading..."}
        </p>
      </div>

      <button className="mt-2 px-4 py-2 text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 rounded-lg transition">
        Learner
      </button>
    </div>
  );
};

export default UserProfile;
