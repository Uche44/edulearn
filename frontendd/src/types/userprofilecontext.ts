export type Profile = {
  username?: string;
  id?: string;
};


export type UserProfileContextType = {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
};