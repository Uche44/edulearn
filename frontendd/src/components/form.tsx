import React, { useState } from "react";
import api from "../lib/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../lib/constants";
import type { FormDataType, ErrorType, FormProps } from "../types";
import { useNavigate } from "react-router-dom";

const Form: React.FC<FormProps> = ({ route, method }) => {
  const [formData, setFormData] = useState<FormDataType>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<ErrorType>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: ErrorType = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await api.post(route, formData);
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      setErrors({ general: "Login failed. Please check your credentials." });
    } finally {
      setLoading(false);
    }
  };
  const name = method === "login" ? "Login" : "Register";

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
    
      <div className="absolute hidden md:block md:w-[500px] md:h-[500px] bg-violet-400/30 rounded-full animate-float top-10 left-10"></div>
      <div className="absolute hidden md:block md:w-[300px] md:h-[300px] bg-violet-500/20 rounded-full animate-float top-40 right-20"></div>
      <div className="absolute hidden md:block md:w-[200px] md:h-[200px] bg-violet-300/30 rounded-full animate-float bottom-20 left-40"></div>

      
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-violet-glass p-8 rounded-2xl shadow-lg backdrop-blur-lg w-[90%] max-w-md"
      >
        <h2 className="text-3xl font-semibold text-white text-center mb-6">
          {name}
        </h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-300"
          />
          {errors.username && (
            <p className="text-red-400 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-300"
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">{errors.password}</p>
          )}
          {/* <div className="h-full w-20"></div> */}
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-violet-500 text-white font-semibold hover:bg-violet-600 transition-colors cursor-pointer"
          disabled={loading}
        >
          {method === "login" ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Form;
