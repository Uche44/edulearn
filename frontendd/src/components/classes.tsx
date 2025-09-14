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
  // time: string;
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
        <div className="gap-4 md:grid grid-cols-4 pt-11 relative">
          <h3 className="absolute font-semibold text-[1.3rem] text-gray-500 tracking-wider">
            Your Classes
          </h3>
          {courses.map((cls, index) => (
            <div
              key={cls.id}
              // 👇 Core container styling
              className="group relative cursor-pointer bg-purple-700 backdrop-blur-lg rounded-xl p-6 
               border border-white/10 shadow-lg
               transform-gpu transition-all duration-300 ease-in-out
               hover:scale-[1.02] hover:shadow-2xl hover:border-white/20"
              // 👇 Staggered animation for when the list loads
              style={{
                animation: `fadeInUp 0.5s ${index * 0.1}s ease-out forwards`,
                opacity: 0,
              }}
            >
              {/* ✨ Animated Gradient Border on Hover */}
              <div
                className="absolute inset-0 rounded-xl border-2 border-transparent 
                 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(120deg, #845EC2, #D65DB1, #FF6F91, #FF9671, #FFC75F, #F9F871) border-box",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "destination-out",
                  maskComposite: "exclude",
                }}
              ></div>

              {/* Ensure content is on top of the border element */}
              <div className="relative z-10 flex flex-col gap-4">
                {/* 👨‍🏫 Course Title */}
                <div className="flex items-center gap-3">
                  <div className="bg-white/60 p-2 rounded-lg">
                    <FaBook className="text-purple-600 text-2xl" />
                  </div>
                  <h2 className="text-white font-bold text-xl tracking-wide">
                    {cls.course_title}
                  </h2>
                </div>

                {/* 👤 Instructor Info */}
                <div className="flex items-center gap-3 text-slate-300">
                  <FaUserTie className="text-slate-400 text-xl" />
                  <p className="text-slate-200 text-base">
                    {cls.instructor_name}
                  </p>
                </div>

                {/* ⏰ Time Info */}
                <div className="flex items-center gap-3 text-slate-300">
                  <FaClock className="text-slate-400 text-xl" />
                  <p className="text-slate-200 text-base">
                    {/* {cls.time.slice(0, 5)} */}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* {courses.map((cls) => (
            <div
              key={cls.id}
              className="bg-purple-800 shadow-md rounded-lg p-4 flex flex-col gap-2 mb-4"
            >
              <div className="flex items-center gap-2 text-lg font-semibold"> */}
          {/* <FaBook className="text-white text-2xl" />
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
               
              </div>
            </div>
          ))} */}
        </div>
      )}
    </section>
  );
};

export default Classes;
