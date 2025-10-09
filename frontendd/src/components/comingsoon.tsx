
import { Clock, Sparkles } from "lucide-react";

interface ComingSoonProps {
  featureName?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ featureName }) => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white text-center px-6 overflow-hidden">
      {/* Floating purple glow accent */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      {/* Icon */}
      <div className="z-10 flex items-center justify-center mb-5 w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-2xl shadow-lg animate-bounce">
        <Clock className="w-10 h-10" />
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-3 animate-fade-in">
        Coming Soon 🚀
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 max-w-md mx-auto mb-6 animate-fade-in">
        {featureName
          ? `We’re working hard to bring ${featureName} to life. Stay tuned!`
          : "Something exciting is on the way. We can’t wait to share it with you."}
      </p>

      {/* Button */}
      <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-purple-700 transition duration-300 transform hover:-translate-y-1">
        Notify Me
      </button>

      {/* Footer */}
      <div className="mt-10 flex justify-center items-center gap-2 text-sm text-gray-400">
        <Sparkles className="w-4 h-4 text-purple-400 animate-spin-slow" />
        <span>Great things take time ✨</span>
      </div>
    </div>
  );
};

export default ComingSoon;
