import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import axios from "../api/axios";
import { NavigationProp } from "../types/navigation";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  timestamp: string;
};

type Props = {
  navigation: NavigationProp;
};

export default function DashboardScreen({ navigation }: Props) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const fetchTodos = async () => {
    try {
      const res = await axios.get("/todos");
      setTodos(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const createTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      await axios.post("/todos", { title: newTodo });
      setNewTodo("");
      fetchTodos();
    } catch (e) {
      console.log(e);
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      await axios.patch(`/todos/${id}/toggle`);
      fetchTodos();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const renderItem = ({ item }: { item: Todo }) => (
    <Text
      onPress={() => toggleTodo(item.id)}
      style={item.completed ? styles.completed : styles.todo}
    >
      {item.title} ({new Date(item.timestamp).toLocaleString()})
    </Text>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Todos</Text>

      <TextInput
        placeholder="New Task"
        style={styles.input}
        value={newTodo}
        onChangeText={setNewTodo}
      />

      <Button title="Add Task" onPress={createTodo} />

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      <Button title="Profile" onPress={() => navigation.navigate("Profile")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, borderRadius: 8, marginBottom: 10 },
  todo: { padding: 10, fontSize: 16 },
  completed: { padding: 10, fontSize: 16, textDecorationLine: "line-through" },
});
