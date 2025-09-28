type Instructor = {
  id: number;
  name: string;
  bio: string;
};

type Course = {
  id: number;
  title: string;
  description: string;
  instructor: Instructor | null;
};

// type CourseForm = {
//   course: string; // store course id as string
//   instructor: string; // store instructor id as string
//   // time: string;
// };

// type FormValues = {
//   studentFirstName: string;
//   studentLastName: string;
//   email: string;
//   courses: CourseForm[];
// };

// Instead of tracking course + instructor, just track lesson
type LessonForm = {
  lesson: string; // store lesson id as string
};

type FormValues = {
  lessons: LessonForm[]; // array of lessons selected
};

type Registration = {
  id: number;
  student_first_name: string;
  student_last_name: string;
  email: string;
  lesson: {
    id: number;
    day_of_week: string;
    time: string;
    course: {
      id: number;
      title: string;
      description: string;
      instructor: Instructor | null;
    };
  };
};

export type { LessonForm, FormValues, Course, Instructor, Registration };
