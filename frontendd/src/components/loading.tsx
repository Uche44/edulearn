import { FaSpinner } from "react-icons/fa";

const Loading: React.FC = () => {
  return (
    <section className="fixed top-0 left-0 z-999 bg-gray-50 w-full h-screen flex items-center justify-center">
      <FaSpinner className="animate-spin text-2xl md:text-3xl text-purple-600" />
    </section>
  );
};

export default Loading;
