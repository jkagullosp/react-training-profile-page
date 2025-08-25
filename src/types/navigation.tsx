import { Profile } from "./profile";

export type RootStackParamList = {
  Profile: undefined;
  EditProfile: {
    profile: Profile;
    onSave: (updatedProfile: Profile) => void;
  };
};
