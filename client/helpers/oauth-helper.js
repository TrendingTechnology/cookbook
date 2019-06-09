import { AsyncStorage } from "react-native";

export const getAccessToken = () => AsyncStorage.getItem("token");
export const setAccessToken = token => AsyncStorage.setItem("token", token);
export const removeAccessToken = () => AsyncStorage.removeItem("token");
