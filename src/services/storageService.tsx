import AsyncStorage from "@react-native-async-storage/async-storage";
import { Profile } from "../types/profile";

export const StorageService = {
  async storeData(key: string, value: Profile) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      console.log("Data Stored Successfully: ", key);
    } catch (error) {
      console.error("Error storing data: ", error);
      throw error;
    }
  },

  async getData(key: string) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue != null) {
        const parsedJson = JSON.parse(jsonValue);
        console.log("Data retrieved successfully: ", key, parsedJson);
        return parsedJson;
      }
      return null;
    } catch (error) {
      console.error("Error retrieving data: ", error);
      throw error;
    }
  },

  async removeData(key: string) {
    try {
      await AsyncStorage.removeItem(key);
      console.log("Data removed successfully: ", key);
    } catch (error) {
      console.error("Error removing data: ", error);
      throw error;
    }
  },

  async clearStorage() {
    try {
      await AsyncStorage.clear();
      console.log("Storage cleared successfully");
    } catch (error) {
      console.error("Error clearing storage: ", error);
      throw error;
    }
  },

  async getAllKeys() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return keys;
    } catch (error) {
      console.error("Error getting all keys", error);
      throw error;
    }
  },
};
