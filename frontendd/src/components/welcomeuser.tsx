import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

type CourseDetailsType = {
  instructorName: string;
  description: string;
  instructorBio: string;
};

type WelcomeuserProps = {
  userName: string;
 
};

const Welcomeuser: React.FC<WelcomeuserProps> = ({
  userName,
  // setIsProfileOpen,
}) => {
  const [courseDetails, setCourseDetails] = useState<CourseDetailsType[]>([]);
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
  const [currentInstructorIndex, setCurrentInstructorIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseAdvertDetails = async () => {
      try {
        const res = await api.get("/api/courses/");
        console.log("course data", res.data);
        setCourseDetails(res.data); // ✅ save to state
      } catch (err: any) {
        console.error(
          "Failed to fetch user:",
          err.response?.data || err.message
        );
      }
    };

    fetchCourseAdvertDetails();
  }, []);

  useEffect(() => {
    if (courseDetails.length === 0) return;

    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        // pick random course
        const nextCourseIndex = Math.floor(
          Math.random() * courseDetails.length
        );

        // pick random instructor within that course
        const instructors = courseDetails[nextCourseIndex].instructors;
        const nextInstructorIndex = Math.floor(
          Math.random() * instructors.length
        );

        setCurrentCourseIndex(nextCourseIndex);
        setCurrentInstructorIndex(nextInstructorIndex);

        setFade(true);
      }, 400);
    }, 4000);

    return () => clearInterval(interval);
  }, [courseDetails]);

  const registerChosenCourse = async () => {
    const chosenCourse = courseDetails[currentCourseIndex];
    const chosenInstructor = chosenCourse.instructors[currentInstructorIndex];

    navigate("/register-class", {
      state: {
        course: chosenCourse,
        instructor: chosenInstructor,
      },
    });
  };

  return (
    <div className="w-full h-fit bg-white rounded-[1rem] mt-14 flex relative">
      <div className="h-fit overflow-hidden px-6 py-8">
        <h2 className="font-bold text-2xl mb-2">Welcome back, {userName}!</h2>

        <p
          className="text-gray-700 text-[1rem] mt-4 transition-opacity duration-500"
          style={{ opacity: fade ? 1 : 0 }}
        >
          {courseDetails.length > 0 && (
            <p
              className="text-gray-700 text-[1rem] mt-4 transition-opacity duration-500"
              style={{ opacity: fade ? 1 : 0 }}
            >
              <span className="block font-semibold">
                {courseDetails[currentCourseIndex].description}
              </span>
              <span className="block italic">
                by{" "}
                {
                  courseDetails[currentCourseIndex].instructors[
                    currentInstructorIndex
                  ].name
                }
                ,
              </span>
              <span className="block">
                {
                  courseDetails[currentCourseIndex].instructors[
                    currentInstructorIndex
                  ].bio
                }
              </span>
            </p>
          )}
        </p>

        <button
          onClick={registerChosenCourse}
          className="outline-none px-7 py-3 bg-purple-700 rounded-3xl mt-4 cursor-pointer hover:brightness-125 text-white"
        >
          Sign Up Now
        </button>
      </div>

      <img
        src="images/books.png"
        alt=""
        className="hidden md:block absolute h-[14rem] -top-10 right-8"
      />
    </div>
  );
};

export default Welcomeuser;
