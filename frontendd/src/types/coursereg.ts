type Instructor = {
  id: number;
  name: string;
  bio: string;
};

type Course = {
  id: number;
  title: string;
  description: string;
  instructors: Instructor[];
};

type CourseForm = {
  course: string; // store course id as string
  instructor: string; // store instructor id as string
  time: string;
};

type FormValues = {
  studentFirstName: string;
  studentLastName: string;
  email: string;
  courses: CourseForm[];
};

export type {CourseForm, FormValues, Course, Instructor}