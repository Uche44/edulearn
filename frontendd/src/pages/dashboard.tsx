import { useState } from "react";
import Sidebar from "../components/sidebar";
import { BiX, BiMenu } from "react-icons/bi";
import UserProfile from "./profilepage";
import { Outlet, useLocation } from "react-router-dom";
import ClassCalendar from "../components/calendar";

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const location = useLocation();

  const showProfileButton = location.pathname === "/";

  const showProfile = () => {
    setIsProfileOpen(true);
    console.log("profile button clicked!");
  };

  return (
    <div className="flex max-w-[1270px]">
      {/*  visible on large screens */}
      <div className="hidden md:block w-64 bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Sidebar overlay for mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          {/* Sidebar drawer */}
          <div className="w-64 bg-white shadow-lg">
            <Sidebar />
          </div>

          {/* Backdrop */}
          <div
            className="flex-1 bg-black/40"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>
      )}

      {/* profile display and overlay for desktop */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-110 flex">
          {/* Backdrop */}
          <div className="flex-1 bg-black/50" />

          {/* profile drawer */}
          <div className="w-[80%] md:w-[28%] px-6 md:px-4 py-18 md:py-14 bg-white shadow-lg relative">
            <button
              onClick={() => setIsProfileOpen(false)}
              className="absolute top-4 cursor-pointer right-2 z-50 p-2 text-3xl text-purple-900 rounded md:block"
            >
              <BiX />
            </button>

            <UserProfile />
            <ClassCalendar />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 relative">
        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="absolute top-7 right-4 z-50 p-2 text-3xl text-purple-900 rounded md:hidden"
        >
          {isSidebarOpen ? <BiX /> : <BiMenu />}
        </button>

        {/* open profile button */}
        {showProfileButton && (
          <button
            type="button"
            onClick={showProfile}
            className="absolute top-[17.5rem] md:top-[19rem] z-10 right-14 outline-none px-3 py-2 bg-green-500 rounded-4xl mt-4 cursor-pointer hover:brightness-125 text-white"
          >
            View Profile
          </button>
        )}

        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
