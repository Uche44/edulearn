import React, { useState, useEffect } from "react";
// import { useUserProfile } from "../context/userprofile";
import { useLocation } from "react-router-dom";
import api from "../lib/api";
import type { Instructor, Course, CourseForm, FormValues } from "../types/coursereg";



const RegisterClass: React.FC = () => {
  const [form, setForm] = useState<FormValues>({
    studentFirstName: "",
    studentLastName: "",
    email: "",
    courses: [{ course: "", instructor: "", time: "" }],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [prefilled, setPrefilled] = useState(false);
  // const { profile, setProfile } = useUserProfile();

  const location = useLocation();
  const { course, instructor } = location.state || {};

  useEffect(() => {
    if (course && instructor) {
      setForm((prev) => ({
        ...prev,
        courses: [
          {
            course: String(course.id),
            instructor: String(instructor.id),
            time: "",
          },
        ],
      }));
      setPrefilled(true);
    }
  }, [course, instructor]);

  // Fetch courses + instructors
  useEffect(() => {
    api
      .get<Course[]>("/api/courses/")
      .then((res) => setAvailableCourses(res.data))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.studentFirstName.trim())
      newErrors.studentFirstName = "First name is required";

    if (!form.studentLastName.trim())
      newErrors.studentLastName = "Last name is required";

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email";
    }

    if (form.courses.length === 0) {
      newErrors.courses = "At least one course is required";
    }

    form.courses.forEach((c, i) => {
      if (!c.course.trim())
        newErrors[`courses.${i}.course`] = "Course required";
      if (!c.instructor.trim())
        newErrors[`courses.${i}.instructor`] = "Instructor required";
      if (!c.time.trim()) newErrors[`courses.${i}.time`] = "Time required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof FormValues
  ) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleCourseChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    index: number,
    field: keyof CourseForm
  ) => {
    const updatedCourses = [...form.courses];
    updatedCourses[index][field] = e.target.value;

    // Reset instructor if course changes
    if (field === "course") {
      updatedCourses[index].instructor = "";
    }

    setForm({ ...form, courses: updatedCourses });
  };

  const addCourse = () => {
    if (form.courses.length < 5) {
      setForm({
        ...form,
        courses: [...form.courses, { course: "", instructor: "", time: "" }],
      });
    }
  };

  const removeCourse = (index: number) => {
    const updatedCourses = form.courses.filter((_, i) => i !== index);
    setForm({ ...form, courses: updatedCourses });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        for (const c of form.courses) {
          const payload = {
            student_first_name: form.studentFirstName,
            student_last_name: form.studentLastName,
            email: form.email,
            course: parseInt(c.course),
            instructor: parseInt(c.instructor),
            time: c.time + ":00",
          };

          const res = await api.post("/api/registrations/", payload);

          if (res.status === 201) {
            console.log("Course registered successfully:", res.data);
          }
        }

        alert("Class registration successful!");

        setForm({
          studentFirstName: "",
          studentLastName: "",
          email: "",
          courses: [{ course: "", instructor: "", time: "" }],
        });
        setErrors({});
      } catch (err: any) {
        console.error(
          "Error submitting form:",
          err.response?.data || err.message
        );
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg w-full max-w-4xl p-8">
        <h2 className="text-2xl font-semibold mb-6">Register for Classes</h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Student Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">First Name</label>
              <input
                value={form.studentFirstName}
                onChange={(e) => handleChange(e, "studentFirstName")}
                className="w-full border rounded p-2"
                placeholder="Enter first name"
              />
              <p className="text-red-500 text-sm">{errors.studentFirstName}</p>
            </div>

            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <input
                value={form.studentLastName}
                onChange={(e) => handleChange(e, "studentLastName")}
                className="w-full border rounded p-2"
                placeholder="Enter last name"
              />
              <p className="text-red-500 text-sm">{errors.studentLastName}</p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Email</label>
              <input
                value={form.email}
                onChange={(e) => handleChange(e, "email")}
                className="w-full border rounded p-2"
                placeholder="Enter email"
              />
              <p className="text-red-500 text-sm">{errors.email}</p>
            </div>
          </div>

          {/* Courses Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Courses</h3>

            {form.courses.map((course, index) => {
              const selectedCourse = availableCourses.find(
                (c) => String(c.id) === course.course
              );
              const isPrefilledRow = prefilled && index === 0;
              return (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 border rounded-md bg-gray-50 relative"
                >
                  {/* Course Select */}
                  <div>
                    <label className="block text-sm font-medium">Course</label>
                    <select
                      value={course.course}
                      onChange={(e) => handleCourseChange(e, index, "course")}
                      className="w-full border rounded p-2"
                      disabled={isPrefilledRow}
                    >
                      <option value="">-- Select a Course --</option>
                      {availableCourses.map((c) => (
                        <option
                          key={c.id}
                          value={c.id}
                        >
                          {c.title}
                        </option>
                      ))}
                    </select>
                    <p className="text-red-500 text-sm">
                      {errors[`courses.${index}.course`]}
                    </p>
                  </div>

                  {/* Instructor Select */}
                  <div>
                    <label className="block text-sm font-medium">
                      Instructor
                    </label>
                    <select
                      value={course.instructor}
                      onChange={(e) =>
                        handleCourseChange(e, index, "instructor")
                      }
                      className="w-full border rounded p-2"
                      disabled={isPrefilledRow || !selectedCourse}
                    >
                      <option value="">-- Select an Instructor --</option>
                      {selectedCourse?.instructors.map((instr) => (
                        <option
                          key={instr.id}
                          value={instr.id}
                        >
                          {instr.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-red-500 text-sm">
                      {errors[`courses.${index}.instructor`]}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Time</label>
                    <input
                      type="time"
                      value={course.time}
                      onChange={(e) => handleCourseChange(e, index, "time")}
                      className="w-full border rounded p-2"
                    />
                    <p className="text-red-500 text-sm">
                      {errors[`courses.${index}.time`]}
                    </p>
                  </div>

                  {form.courses.length > 1 && !isPrefilledRow && (
                    <button
                      type="button"
                      onClick={() => removeCourse(index)}
                      className="absolute top-2 right-2 text-red-500"
                    >
                      ✕
                    </button>
                  )}
                </div>
              );
            })}

            {form.courses.length < 5 && (
              <button
                type="button"
                onClick={addCourse}
                className="px-4 py-2 bg-purple-600 text-white rounded-md"
                disabled={prefilled}
              >
                + Add Course
              </button>
            )}
            <p className="text-red-500 text-sm">{errors.courses}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-md"
            >
              Save
            </button>
            <button
              type="reset"
              onClick={() =>
                setForm({
                  studentFirstName: "",
                  studentLastName: "",
                  email: "",
                  courses: [{ course: "", instructor: "", time: "" }],
                })
              }
              className="px-6 py-2 bg-gray-300 text-black rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterClass;
