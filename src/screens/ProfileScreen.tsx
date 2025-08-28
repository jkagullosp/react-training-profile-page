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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
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
    name: "Jhan Kyle Agullo",
    email: "jkyleagullo@gmail.com",
    username: "@jkyleagullo",
    bio: "Software Engineer @ StratpointTechnologies",
    location: "Caloocan City",
    phone: "+63 951 639 5613",
    dateJoined: "26 Aug 2025",
    website: "www.jkyle.com",
    tags: [
      "Software Engineer",
      "React Native Developer",
      "Typescript",
      "Cat Lover",
      "Dog Lover",
      "Pogi",
    ],
    avatar:
      "https://i.pinimg.com/564x/bb/c3/73/bbc373a32cbcf5984d611391134d17a9.jpg",
    coverPhoto:
      "https://static.basicinvite.com/media/bi/34788/painted-peonies-wallpaper-l-grey.jpg?q=1746745859",
  });

  useFocusEffect(
    React.useCallback(() => {
      loadProfile();
    }, [])
  );

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
    } catch (error) {
      console.error("Error saving profile: ", error);
    }
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

        {/* Location and Date Joined Container */}
        <View style={styles.locDateContainer}>
          <Text style={styles.location}>{profile.location}</Text>
          <Text style={styles.location}>|</Text>
          <Text style={styles.dateJoined}>{profile.dateJoined}</Text>
        </View>
      </View>

      {/* Buttons Container */}
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button}>
          <Icon name="person-outline" size={16} />
          <Text>Follow</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Icon name="mail-outline" size={16} />
          <Text>Message</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Icon name="ellipsis-horizontal-outline" size={16} />
          <Text>More</Text>
        </Pressable>
      </View>

      {/* Bio Container */}
      <View style={styles.bioContainer}>
        <Text style={styles.bio}>{profile.bio}</Text>
      </View>

      {/* Information Container */}
      <View style={styles.informationContainer}>
        <Text style={styles.informationHeader}>Information</Text>
        {/* Table Container */}
        <View style={styles.table}>
          {/* Table Row */}
          <View style={styles.tableRow}>
            <View style={styles.tableCellIcon}>
              <Icon name="globe-outline" size={18} />
            </View>
            <View style={styles.tableCellLabel}>
              <Text style={styles.tableLabel}>Website</Text>
            </View>
            <View style={styles.tableCellValue}>
              <Text style={styles.tableValue}>{profile.website}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCellIcon}>
              <Icon name="mail-outline" size={18} />
            </View>
            <View style={styles.tableCellLabel}>
              <Text style={styles.tableLabel}>Email</Text>
            </View>
            <View style={styles.tableCellValue}>
              <Text style={styles.tableValue}>{profile.email}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCellIcon}>
              <Icon name="call-outline" size={18} />
            </View>
            <View style={styles.tableCellLabel}>
              <Text style={styles.tableLabel}>Phone</Text>
            </View>
            <View style={styles.tableCellValue}>
              <Text style={styles.tableValue}>{profile.phone}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCellIcon}>
              <Icon name="calendar-outline" size={18} />
            </View>
            <View style={styles.tableCellLabel}>
              <Text style={styles.tableLabel}>Joined</Text>
            </View>
            <View style={styles.tableCellValue}>
              <Text style={styles.tableValue}>{profile.dateJoined}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Tags Container */}
      <View style={styles.tagsContainer}>
        {profile.tags.map((tag, idx) => (
          <View key={idx} style={styles.tags}>
            <Text>{tag}</Text>
          </View>
        ))}
      </View>

      {/* Footer Container */}
      <View style={styles.footerContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.editProfileButton,
            { backgroundColor: pressed ? "#ddd" : "#fff" },
          ]}
          onPress={handleEditProfile}
        >
          <Text>Edit Profile</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
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
    marginTop: 8,
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
    marginTop: 15,
  },
  bio: {
    fontSize: 14,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    marginTop: 20,
  },
  button: {
    flexDirection: "row",
    gap: 5,
    borderWidth: 1,
    borderColor: "#6F6F6F",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  informationContainer: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  informationHeader: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  },
  informationRowContainer: {
    flexDirection: "column",
    marginBottom: 10,
  },
  informationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  table: {
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#6F6F6F",
    borderRadius: 8,
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: "#eee",
  },
  tableCellIcon: {
    width: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  tableCellLabel: {
    width: 80,
    justifyContent: "center",
  },
  tableCellValue: {
    flex: 1,
    justifyContent: "center",
  },
  tableLabel: {
    fontSize: 14,
    color: "#333",
  },
  tableValue: {
    fontSize: 14,
    color: "#666",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 15,
    marginTop: 15,
    paddingHorizontal: 15,
  },
  tags: {
    flexDirection: "row",
    gap: 5,
    borderWidth: 1,
    borderColor: "#6F6F6F",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  footerContainer: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  editProfileButton: {
    borderWidth: 1,
    borderColor: "#6F6F6F",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEEEEE",
  },
});

export default ProfileScreen;
