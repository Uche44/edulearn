import React, { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";
// Define profile type
type Profile = {
  firstname: string;
  lastname: string;
  email: string;
};

// Define context shape
type UserProfileContextType = {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
};

// Create context
const UserProfileContext = createContext<UserProfileContextType | undefined>(
  undefined
);

// Provider component
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

// Custom hook for easy access
export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return context;
};
