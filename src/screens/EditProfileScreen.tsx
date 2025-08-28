// src/screens/EditProfileScreen.tsx
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";

type EditProfileRouteProp = RouteProp<RootStackParamList, "EditProfile">;

type Props = {
  route: EditProfileRouteProp;
};

const EditProfileScreen = ({ route }: Props) => {
  const { profile, onSave } = route.params;

  return (
    <View style={styles.container}>
      <Text>Edit Profile for {profile.name}</Text>
      <Button
        title="Save Changes"
        onPress={() => {
          const updatedProfile = { ...profile, name: "Updated Name" }; // example
          onSave(updatedProfile);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default EditProfileScreen;
