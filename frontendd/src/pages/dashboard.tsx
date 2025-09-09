import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { BiX, BiMenu } from "react-icons/bi";
import Input from "../components/input";
import DateComponent from "../components/date";
import Classes from "../components/classes";
import Welcomeuser from "../components/welcomeuser";
import UserProfile from "./profilepage";
import { fetchUserDetails } from "../utils/fetchUserDetails";

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchUserDetails();
        const name = data.username;

        setUserName(name);
      } catch (error) {
        console.log(error);
      }
    };

    loadUser();
  }, []);

  return (
    <div className="flex">
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
        <div className="fixed inset-0 z-60 hidden md:flex">
          {/* Backdrop */}
          <div
            className="flex-1 bg-black/40"
            onClick={() => setIsSidebarOpen(false)}
          />

          {/* profile drawer */}
          <div className="w-[25%] px-4 py-14 bg-white shadow-lg relative">
            <button
              onClick={() => setIsProfileOpen(false)}
              className="absolute top-2 cursor-pointer right-2 z-50 p-2 text-3xl text-purple-900 rounded md:block hidden"
            >
              <BiX />
            </button>

            <UserProfile />
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

        <section className="p-6 min-h-screen w-full md:w-[95%] md:ml-[5%]">
          <Input />
          <DateComponent />

          {/* welcome user */}
          <Welcomeuser
            userName={userName}
            setIsProfileOpen={setIsProfileOpen}
          />

          <Classes />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
