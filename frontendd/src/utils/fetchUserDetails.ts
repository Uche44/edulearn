// lib/user.ts
import api from "../lib/api";

export const fetchUserDetails = async () => {
  try {
    const res = await api.get("/api/user/"); // adjust endpoint
    return res.data; // Axios already parses JSON
  } catch (err: any) {
    console.error("Failed to fetch user:", err.response?.data || err.message);
    throw err; // let caller decide what to do
  }
};
