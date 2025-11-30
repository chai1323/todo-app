import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "../api/axios";
import { NavigationProp } from "../types/navigation";
import { Alert } from "react-native";


type Props = {
  navigation: NavigationProp;
};

export default function SignupScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await axios.post("/auth/signup", { email, password });
      Alert.alert("Signup successful");

      navigation.replace("Login");
    } catch (err) {
      Alert.alert("Signup failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}
      />

      <Button title="Create Account" onPress={handleSignup} />

      <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
        Already have an account? Login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 26, textAlign: "center", marginBottom: 20 },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  link: { color: "blue", marginTop: 20, textAlign: "center" },
});
