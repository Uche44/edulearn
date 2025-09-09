import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import api from "../lib/api";
import { FaBook } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { FaClock } from "react-icons/fa";

type Registration = {
  id: number;
  course: { id: number; title: string };
  instructor: { id: number; name: string };
  time: string;
};

const Classes: React.FC = () => {
  const [courses, setCourses] = useState<Registration[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/api/registrations/");
        if (res.status === 200) {
          console.log("Course fetched successfully:", res.data);
          setCourses(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className="w-full h-fit mt-6 ">
      {/* no class display */}
      {courses.length === 0 ? (
        <div className="w-full h-fit py-6 grid place-content-center">
          <p className="text-gray-600 font-medium text-2xl">No Classes yet</p>
          <NavLink
            to="/register-class"
            className="py-2 px-6 bg-purple-700 grid place-content-center text-white rounded-[10px] mt-4 cursor-pointer hover:brightness-125"
          >
            Register
          </NavLink>
        </div>
      ) : (
        <div className="gap-4 md:grid grid-cols-4">
          {courses.map((cls) => (
            <div
              key={cls.id}
              className="bg-purple-800 shadow-md rounded-lg p-4 flex flex-col gap-2 mb-4"
            >
              <div className="flex items-center gap-2 text-lg font-semibold">
                <FaBook className="text-white text-2xl" />
                <p className="text-white text-[1.1rem]">{cls.course_title}</p>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <FaUserTie className="mt-2 text-white text-2xl" />
                <p className="text-white text-[1.1rem]">
                  {cls.instructor_name}
                </p>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <FaClock className="text-white text-[1.1rem]" />
                <p className="text-white text-[1.1rem]">
                  {cls.time.slice(0, 5)}
                </p>{" "}
                {/* show only HH:MM */}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Classes;
