import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import api from "../lib/api";
import { FaUserTie, FaClock, FaBook } from "react-icons/fa";
import type { Registration } from "../types/coursereg";
import { useUserProfile } from "../context/userprofile";

const Classes: React.FC = () => {
  const [courses, setCourses] = useState<Registration[]>([]);
  const { profile } = useUserProfile();
  const userId = profile?.id;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get(`/api/registrations/?user_id=${userId}`);
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
        <div className=" gap-4 md:grid grid-cols-4 md:pt-11 relative">
          <h3 className="text-[1.6rem] md:absolute font-semibold md:text-[1.3rem] text-gray-500 tracking-wider">
            Your Classes
          </h3>
          {courses.map((cls, index) => (
            <div
              key={cls.id}
              className="group relative cursor-pointer mb-4 bg-purple-700 backdrop-blur-lg rounded-xl p-6 
               border border-white/10 shadow-lg transform-gpu transition-all duration-300 ease-in-out
               hover:scale-[1.02] hover:shadow-2xl hover:border-white/20"
              style={{
                animation: `fadeInUp 0.5s ${index * 0.1}s ease-out forwards`,
                opacity: 0,
              }}
            >
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

              <div className="relative z-10 flex flex-col gap-4">
                {/* 📘 Course Title */}
                <div className="flex items-center gap-3">
                  <div className="bg-white/60 p-2 rounded-lg">
                    <FaBook className="text-purple-600 text-2xl" />
                  </div>
                  <h2 className="text-white font-bold text-xl tracking-wide">
                    {cls.lesson.course.title}
                  </h2>
                </div>

                {/* 👤 Instructor Info */}
                {cls.lesson.course.instructor && (
                  <div className="flex items-center gap-3 text-slate-300">
                    <FaUserTie className="text-slate-400 text-xl" />
                    <p className="text-slate-200 text-base">
                      {cls.lesson.course.instructor.name}
                    </p>
                  </div>
                )}

                {/* ⏰ Time Info */}
                <div className="flex items-center gap-3 text-slate-300">
                  <FaClock className="text-slate-400 text-xl" />
                  <p className="text-slate-200 text-base">
                    {cls.lesson.day_of_week}, {cls.lesson.time.slice(0, 5)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Classes;
