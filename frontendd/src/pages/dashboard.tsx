import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { BiX, BiMenu } from "react-icons/bi";
import Input from "../components/input";
import DateComponent from "../components/date";
import Classes from "../components/classes";
import { fetchUserDetails } from "../utils/fetchUserDetails";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [userName, setUserName] = useState<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchUserDetails();
        const name = data.username;

        setUserName(name);
      } catch (error) {
        // handle errors (e.g., redirect to login if unauthorized)
        console.log(error);
      }
    };

    loadUser();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar - always visible on large screens */}
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

      {/* Main Content */}
      <div className="flex-1 relative">
        {/* Toggle button (only visible on mobile) */}
        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="absolute top-7 right-4 z-50 p-2 text-3xl text-blue-900 rounded md:hidden"
        >
          {isSidebarOpen ? <BiX /> : <BiMenu />}
        </button>

        <section className="p-6 min-h-screen w-full md:w-[95%] md:ml-[5%]">
          <Input />
          <DateComponent />

          {/* welcome user */}
          <div className="w-full h-fit bg-white rounded-[1rem] mt-14 flex relative">
            <div className="h-fit overflow-hidden px-4 py-8">
              <h2 className="font-bold text-2xl mb-2">
                Welcome back, {userName}!
              </h2>
              <p className="text-gray-600 text-[1.1rem]">
                New French Classes are available. For B1 and B2 levels!
              </p>

              <button className="outline-none px-7 py-3 bg-purple-700 rounded-3xl mt-4 hover:brightness-125 text-white">
                Buy Now
              </button>
            </div>
            <img
              src="images/books.png"
              alt=""
              className="hidden md:block absolute h-[14rem] -top-10 right-8"
            />
          </div>
          <Classes />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
