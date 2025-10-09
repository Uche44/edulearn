type Instructor = {
  id: number;
  name: string;
  bio: string;
};

type LessonForm = {
  lesson: string;
  id?: string;
  day_of_week_display?: string;
  time?: string;
};

type Course = {
  id: number;
  title: string;
  description: string;
  instructor: Instructor | null;

  lessons: LessonForm[];
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
