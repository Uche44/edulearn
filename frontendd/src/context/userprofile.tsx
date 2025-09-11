import React, { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";

type Profile = {
  firstname: string;
  lastname: string;
  email: string;
};


type UserProfileContextType = {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
};


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
