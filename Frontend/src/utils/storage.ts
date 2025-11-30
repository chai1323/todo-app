import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToken = async (token: string) =>
  AsyncStorage.setItem("token", token);

export const getToken = async () =>
  AsyncStorage.getItem("token");

export const removeToken = async () =>
  AsyncStorage.removeItem("token");
