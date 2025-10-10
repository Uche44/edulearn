import Classes from "../components/classes";
import { NavLink } from "react-router-dom";
const Classroom = () => {
  return (
    <section className="w-full px-4 pt-16  md:ml-7 md:px-12 py-8 relative">
      
      <NavLink
        to="/register-class"
        className="absolute right-4 top-18 md:right-12 md:top-4 px-4 py-2 rounded-[10px] bg-purple-600 text-white"
      >
        Add Course +
      </NavLink>
      <Classes />
    </section>
  );
};

export default Classroom;
