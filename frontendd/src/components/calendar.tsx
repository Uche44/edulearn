import { useState, useEffect } from "react";
import api from "../lib/api";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import type { Registration } from "../types/coursereg";

// Helper: Convert class days to numbers (0 = Sunday, 1 = Monday...)
const dayMap: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

const ClassCalendar = () => {
  const [value, setValue] = useState(new Date());
  const [classes, setClasses] = useState<Registration[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/api/registrations/");
        if (res.status === 200) {
          console.log("Courses fetched successfully:", res.data);

          // assuming res.data is an array of registrations
          setClasses(res.data);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, []);

  // Function to add highlight class to specific days
  const tileClassName = ({ date }: { date: Date }) => {
    const day = date.getDay(); // 0-6
    const hasClass = classes.some((c) => dayMap[c.lesson.day_of_week] === day);
    return hasClass ? "highlight-day" : "";
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">
        Class Schedule
      </h2>
      <div className="rounded-2xl shadow-lg bg-white p-4">
        <Calendar
          onChange={setValue}
          value={value}
          tileClassName={tileClassName}
          showNavigation={false}
          className="modern-calendar"
        />
      </div>
    </div>
  );
};

export default ClassCalendar;
