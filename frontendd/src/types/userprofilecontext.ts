export type Profile = {
  firstname: string;
  lastname: string;
  email: string;
};


export type UserProfileContextType = {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
};