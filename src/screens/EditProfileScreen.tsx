import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { StorageService } from "../services/storageService"; // If you use AsyncStorage

type EditProfileRouteProp = RouteProp<RootStackParamList, "EditProfile">;
type Props = {
  route: EditProfileRouteProp;
};

const EditProfileScreen = ({ route }: Props) => {
  const navigation = useNavigation();
  const { profile } = route.params;
  const [editedProfile, setEditedProfile] = useState({ ...profile });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!editedProfile.name.trim()) {
      newErrors.name = "Name is required!";
    }
    if (!editedProfile.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(editedProfile.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!editedProfile.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      Alert.alert("Validation error: Please fix the errors and try again.");
      return;
    }
    // Save to storage or context
    try {
      await StorageService.storeData("profile", editedProfile);
      Alert.alert("Profile updated Successfully!");
    } catch (error) {
      Alert.alert("Error updating profile");
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>Edit Profile for {profile.name}</Text>
      {/* Add TextInputs for editing profile fields */}
      <TextInput
        value={editedProfile.name}
        onChangeText={(text) =>
          setEditedProfile({ ...editedProfile, name: text })
        }
        placeholder="Name"
        style={{ borderWidth: 1, marginBottom: 8, width: 200 }}
      />
      {errors.name && <Text style={{ color: "red" }}>{errors.name}</Text>}
      <TextInput
        value={editedProfile.email}
        onChangeText={(text) =>
          setEditedProfile({ ...editedProfile, email: text })
        }
        placeholder="Email"
        style={{ borderWidth: 1, marginBottom: 8, width: 200 }}
      />
      {errors.email && <Text style={{ color: "red" }}>{errors.email}</Text>}
      <TextInput
        value={editedProfile.phone}
        onChangeText={(text) =>
          setEditedProfile({ ...editedProfile, phone: text })
        }
        placeholder="Phone"
        style={{ borderWidth: 1, marginBottom: 8, width: 200 }}
      />
      {errors.phone && <Text style={{ color: "red" }}>{errors.phone}</Text>}
      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
});

export default EditProfileScreen;
