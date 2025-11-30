import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import axios from "../api/axios";
import { removeToken } from "../utils/storage";
import { NavigationProp } from "../types/navigation";

type UserProfile = { email: string };

type Props = { navigation: NavigationProp };

export default function ProfileScreen({ navigation }: Props) {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("/auth/me");
      setProfile(res.data);
    } catch (err: any) {
      console.log("Fetch profile error:", err.response?.data || err.message);
    }
  };

  const logout = async () => {
    await removeToken();
    navigation.replace("Login");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) return <Text>Loading profile...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text>Email: {profile.email}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
});
