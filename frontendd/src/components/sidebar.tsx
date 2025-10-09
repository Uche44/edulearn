import { NavLink, useLocation } from "react-router-dom";
import {
  FaHome,
  FaChalkboardTeacher,
  FaVideo,
  FaPlayCircle,
  FaFolderOpen,
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  const sidebarItems = [
    { icon: <FaHome />, text: "Dashboard", path: "/" },
    { icon: <FaChalkboardTeacher />, text: "Classroom", path: "/classroom" },
    { icon: <FaVideo />, text: "Live Lessons", path: "/live" },
    { icon: <FaPlayCircle />, text: "Recorded Lessons", path: "/recorded" },
    { icon: <FaFolderOpen />, text: "Video Library", path: "/library" },
  ];

  return (
    <aside className="bg-white z-100 absolute py-10 w-[70%] md:w-[23%] h-screen flex flex-col items-center shadow-lg">
      {/* Logo / Branding */}
      <div className="mb-10 flex items-center">
        <img
          src="images/logo.png"
          alt="Learnthru Logo"
          className="w-16 h-16"
        />
        <h1 className="font-bold text-2xl text-gray-600">Learnthru</h1>
      </div>

      {/* Sidebar Menu */}
      <nav className="flex flex-col gap-2 w-full px-6">
        {sidebarItems.map((item, index) => {
          // Custom "active" logic for Classroom
          const isClassActive =
            item.path === "/classroom" &&
            (location.pathname.startsWith("/classroom") ||
              location.pathname.startsWith("/register-class"));

          return (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 cursor-pointer text-lg px-4 py-2 rounded-md transition ${
                  isActive || isClassActive
                    ? "bg-purple-200 text-purple-600 font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.text}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
