import { useState, useEffect } from "react";
import Input from "../components/input";
import Welcomeuser from "../components/welcomeuser";
import Classes from "../components/classes";
import { fetchUserDetails } from "../utils/fetchUserDetails";
const Dashboardindex: React.FC = () => {
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
    <section className="p-6 min-h-screen w-full md:w-[95%] md:ml-[5%]">
      <Input />
      {/* <DateComponent /> */}

     
      <Welcomeuser
        userName={userName}
        
      />

      <Classes />
    </section>
  );
};

export default Dashboardindex;
