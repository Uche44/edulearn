import React, { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";
import type { UserProfileContextType, Profile } from "../types/userprofilecontext";



const UserProfileContext = createContext<UserProfileContextType | undefined>(
  undefined
);


export const UserProfileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  return (
    <UserProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};


export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return context;
};
