import { FaSearch } from "react-icons/fa";
const Input: React.FC = () => {
  return (
    <div className="w-[80%] md:w-[60%] h-[2.4rem] md:h-[3rem] mt-2 rounded-[0.5rem] overflow bg-white flex">
      <button className="h-full w-[2.5rem] md:w-[3rem] cursor-pointer hover:brightness-110 bg-gray-300 rounded-[0.5rem] grid place-content-center">
        <FaSearch className="text-purple-800" />
      </button>

      <input
        type="text"
        placeholder="Search"
        className="text-gray-600 px-4 w-full border-none outline-none"
      />
    </div>
  );
};

export default Input;
