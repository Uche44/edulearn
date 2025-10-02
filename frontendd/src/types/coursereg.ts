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

type LessonForm = {
  lesson: string; 
};

type FormValues = {
  lessons: LessonForm[]; 
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
