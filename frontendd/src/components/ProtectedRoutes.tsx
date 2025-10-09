import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../lib/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../lib/constants";
import type { DecodedToken } from "../types/protectedRoutes";

const ProtectedRoutes: React.FC<React.PropsWithChildren<object>> = ({
  children,
}) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
          if (mounted) setIsAuthorized(false);
          console.log("auth error: invalid or no token");
          return;
        }

        const decoded: DecodedToken = jwtDecode(token);
        const now = Date.now() / 1000;

        if (typeof decoded.exp !== "number") {
          if (mounted) setIsAuthorized(false);
          return;
        }

        if (decoded.exp < now) {
          // refresh
          const refresh = localStorage.getItem(REFRESH_TOKEN);
          const res = await api.post("api/token/refresh", { refresh });
          if (res.status === 200) {
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            if (mounted) setIsAuthorized(true);
          } else {
            if (mounted) setIsAuthorized(false);
          }
        } else {
          if (mounted) setIsAuthorized(true);
        }
      } catch (err) {
        console.error(err);
        if (mounted) setIsAuthorized(false);
      }
    };

    checkAuth();

    return () => {
      mounted = false;
    };
  }, []);

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;
