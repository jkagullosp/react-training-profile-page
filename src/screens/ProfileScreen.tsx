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
  Pressable,
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
    name: "Musang Kartel",
    email: "jkyleagullo@gmail.com",
    username: "@jkyleagullo",
    bio: "Software Engineer @StratpointTechnologies",
    location: "Caloocan City",
    phone: "+63 951 639 5613",
    dateJoined: "26 Aug 2025",
    avatar:
      "https://i.pinimg.com/564x/bb/c3/73/bbc373a32cbcf5984d611391134d17a9.jpg",
    coverPhoto:
      "https://static.basicinvite.com/media/bi/34788/painted-peonies-wallpaper-l-grey.jpg?q=1746745859",
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
    <View style={styles.container}>
      {/* Main View Container */}

      {/* Cover Photo Container */}
      <View style={styles.coverPhotoContainer}>
        <Image source={{ uri: profile.coverPhoto }} style={styles.coverPhoto} />
        <Image source={{ uri: profile.avatar }} style={styles.avatar} />
      </View>

      {/* Username Container */}
      <View style={styles.usernameContainer}>
        <Text style={styles.username}>{profile.username}</Text>
        <Text style={styles.name}>{profile.name}</Text>

        <View style={styles.locDateContainer}>
          {/* Location and Date Joined Container */}
          <Text style={styles.location}>{profile.location}</Text>
          <Text style={styles.location}>|</Text>
          <Text style={styles.dateJoined}>{profile.dateJoined}</Text>
        </View>
      </View>
      <View>
        {/* Buttons Container */}
        <Pressable></Pressable>
      </View>

      <View style={styles.bioContainer}>
        {/* Bio Container */}
        <Text style={styles.bio}>{profile.bio}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAEAEA",
  },
  content: {
    flex: 1,
  },
  coverPhotoContainer: {
    alignItems: "center",
    height: 150,
    width: "100%",
    position: "relative",
  },
  coverPhoto: {
    width: "100%",
    height: "100%",
  },
  avatar: {
    borderRadius: 50,
    height: 100,
    width: 100,
    position: "absolute",
    bottom: -50,
  },
  usernameContainer: {
    marginTop: 60,
    alignItems: "center",
  },
  username: {
    fontSize: 14,
    color: "#6F6F6F",
  },
  name: {
    fontSize: 20,
    color: "#000",
    fontWeight: 500,
    marginTop: 4,
  },
  locDateContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginTop: 12,
    gap: 5,
  },
  location: {
    fontSize: 14,
    color: "#A570FF",
  },
  dateJoined: {
    fontSize: 14,
  },
  bioContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  bio: {
    fontSize: 14,
  },
});

export default ProfileScreen;
