import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { StorageService } from "../services/storageService";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import { Profile } from "../types/profile";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";

// Define the navigation prop type for ProfileScreen
type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Profile"
>;

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [profile, setProfile] = useState<Profile>({
    name: "Jkyle Agullo",
    email: "jkyleagullo@gmail.com",
    username: "@jkyleagullo",
    bio: "Software Engineer | React Native",
    location: "Caloocan City, Philippines",
    phone: "+63 951 639 5613",
    avatar: "https://images.alphacoders.com/136/1363137.png",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const savedProfile = await StorageService.getData("profile");
      if (savedProfile) {
        setProfile(savedProfile);
      }
    } catch (error) {
      console.error("Error loading profile: ", error);
    }
  };

  const handleEditProfile = () => {
    navigation.navigate("EditProfile", {
      profile,
      onSave: saveProfile,
    });
  };

  const saveProfile = async (updatedProfile: Profile) => {
    try {
      await StorageService.storeData("profile", updatedProfile);
      setProfile(updatedProfile);
    } catch (error) {}
  };

  return (
    <>
      <View style={styles.coverPhoto}>
        <Image source={{ uri: profile.avatar }} style={styles.image} />
      </View>
      <View>
        <TouchableOpacity onPress={handleEditProfile}>
          <Text>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#eeeeee",
  },
  content: {
    flex: 1,
  },
  coverPhoto: {
    alignItems: "center",
    height: 150,
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ProfileScreen;
