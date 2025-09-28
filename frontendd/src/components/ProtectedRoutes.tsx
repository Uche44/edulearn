import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../lib/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../lib/constants";

const ProtectedRoutes: React.FC<React.PropsWithChildren<object>> = ({
  children,
}) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  });

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("api/token/refresh", {
        refresh: refreshToken,
      });

      if (res.status === 200) {
        const newAccessToken = res.data.access;
        localStorage.setItem(ACCESS_TOKEN, newAccessToken);

        const decoded: any = jwtDecode(newAccessToken);
        console.log("New token info:", decoded);

        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    const decoded: any = jwtDecode(token);

    console.log("Decoded token Info:", decoded);

    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (typeof tokenExpiration !== "number") {
      setIsAuthorized(false);
      return;
    }

    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;
