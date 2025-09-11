import Classes from "../components/classes";
import { NavLink } from "react-router-dom";
const Classroom = () => {
  return (
    <section className="w-full ml-7 px-12 py-8 relative">
      <NavLink
        to="/register-class"
        className="absolute right-12 top-4 px-4 py-2 rounded-[10px] bg-purple-600 text-white"
      >
        Register Class
      </NavLink>
      <Classes />
    </section>
  );
};

export default Classroom;
