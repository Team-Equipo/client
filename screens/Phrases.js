// Phrases.js
import React from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { TextInput, Button, withTheme } from "react-native-paper";

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
          <FlatList
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
  appbar: {
    flex: 0,
    backgroundColor: "cornflowerblue",
    marginTop: "-2%",
  },
  title: {
    color: "white",
    fontSize: 20,
    justifyContent: "space-around",
    textAlign: "center",
  },
});

export default withTheme(UserInfo);
