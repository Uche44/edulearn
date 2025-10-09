import api from "@/lib/api";
import { toast } from "sonner";


interface Lesson {
  lesson: string;
}

interface FormState {
  lessons: Lesson[];
}

interface Errors {
  [key: string]: string;
}

type ValidateFn = () => boolean;
type SetLoadingFn = (loading: boolean) => void;
type SetFormFn = (form: FormState) => void;
type SetErrorsFn = (errors: Errors) => void;

export const handleSubmit = async (
  validate: ValidateFn,
  setLoading: SetLoadingFn,
  form: FormState,
  setForm: SetFormFn,
  setErrors: SetErrorsFn
) => {
  if (validate()) {
    try {
      setLoading(true);
      for (const l of form.lessons) {
        const payload = {
          lesson: parseInt(l.lesson),
        };

        const res = await api.post("/api/registrations/", payload);

        if (res.status === 201) {
          console.log("Class registered successfully:", res.data);
          toast("Class registration successful!");
        
          return res.data;
        }
      }

      setForm({
        lessons: [{ lesson: "" }],
      });
      setErrors({});
    } catch (err: any) {
      setLoading(false);
      console.error(
        "Error submitting form:",
        err.response?.data || err.message
      );
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }
};
