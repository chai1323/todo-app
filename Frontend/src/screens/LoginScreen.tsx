import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "../api/axios";
import { saveToken } from "../utils/storage";
import { NavigationProp } from "../types/navigation";

type Props = {
  navigation: NavigationProp;
};

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("/auth/login", { email, password });
      await saveToken(res.data.token);
      navigation.replace("Dashboard");
    } catch (error: unknown) {
      Alert.alert("Login failed", "Invalid credentials");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={handleLogin} />

      <Text style={styles.link} onPress={() => navigation.navigate("Signup")}>
        Create an account
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 26, textAlign: "center", marginBottom: 20 },
  input: { borderWidth: 1, padding: 12, borderRadius: 8, marginBottom: 10 },
  link: { color: "blue", marginTop: 20, textAlign: "center" },
});
