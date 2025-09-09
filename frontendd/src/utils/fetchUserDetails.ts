
import api from "../lib/api";

export const fetchUserDetails = async () => {
  try {
    const res = await api.get("/api/user/"); 
    return res.data; 
  } catch (err: any) {
    console.error("Failed to fetch user:", err.response?.data || err.message);
    throw err; 
  }
};
