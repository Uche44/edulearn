export type Profile = {
  username?: string;
  id?: string;
};


export type UserProfileContextType = {
  profile: Profile | null;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
};