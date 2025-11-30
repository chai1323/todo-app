import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

type Props = {
  item: Todo;
  toggle: (id: string) => void;
};

export default function TodoItem({ item, toggle }: Props) {
  return (
    <Pressable onPress={() => toggle(item.id)}>
      <View style={styles.row}>
        <Text style={[styles.text, item.completed && styles.completed]}>
          {item.title}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    padding: 12,
    borderBottomWidth: 1,
  },
  text: { fontSize: 16 },
  completed: {
    textDecorationLine: "line-through",
    color: "gray",
  },
});
