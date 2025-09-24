import React, { useEffect, useState } from "react";
import api from "../lib/api";



type Profile = {
  firstname: string;
  lastname: string;
  email: string;
};

const UserProfile: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/registrations/");

        
        if (res.status === 200) {
          console.log("Profile fetched:", res.data);

          const data = res.data;
          setProfile({
            firstname: data[0].student_first_name,
            lastname: data[0].student_last_name,
            email: data[0].email,
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="flex flex-col items-center w-full bg-purple-100 shadow-md rounded-xl py-2  px-6">
      <img
        src=""
        alt=""
        className="w-18 h-18 rounded-full border-4 border-gray-200 object-cover"
      />

    
      <h2 className="mt-4 text-lg font-semibold text-gray-800">
        {profile ? profile.firstname : "Loading..."}{" "}
        {profile ? profile.lastname : "Loading..."}
      </h2>
      <p className="text-sm text-gray-400">{profile ? profile.email : ""}</p>

      
      <button className="mt-4 px-4 py-2 text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 rounded-lg transition">
        Learner
      </button>
    </div>
  );
};

export default UserProfile;
