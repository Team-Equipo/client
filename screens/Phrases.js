// Phrases.js
import React from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Button, withTheme } from "react-native-paper";

import HideKeyboard from "../components/HideKeyboard";

const UserInfo = ({ navigation }) => {
  const [name, setName] = React.useState("");

  /* Hardcode a list of test phrases. */
  const phrases = [
    { text: "Hola mundo", id: 1 },
    { text: "Hola universo", id: 2 },
    { text: "El universo dice hola", id: 3 },
  ];

  return (
    <HideKeyboard>
      <SafeAreaView style={{ flexDirection: "column", flex: 1 }}>
        <View style={{ flex: 1, padding: 20 }}>
          <TextInput
            placeholder="Enter topic..."
            style={styles.textBox}
          ></TextInput>
          <FlatList
            style={styles.textBox}
            data={phrases}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <Text>{item.text}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    </HideKeyboard>
  );
};

const styles = StyleSheet.create({
  textBox: {
    borderWidth: 2,
    borderColor: "lightgray",
    borderRadius: 10,
    padding: "1%",
    marginLeft: "1%",
    marginRight: "1%",
    marginBottom: "1%",
    fontSize: 16,
  },
});

export default withTheme(UserInfo);
