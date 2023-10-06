import React from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

const TextInputExample = () => {
  const [text, onChangeText] = React.useState("");

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: 200,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
    fontSize: 20,
    textAlign: "center",
  },
});

export default TextInputExample;
