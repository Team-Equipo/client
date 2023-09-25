// Registration.js
import React from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import {
  Appbar,
  Title,
  Snackbar,
  TextInput,
  Button,
  withTheme,
  Text,
} from "react-native-paper";

const Registration = () => {
  const [name, setName] = React.useState("");
  const [ageInput, setAgeInput] = React.useState("");
  const [age, setAge] = React.useState(-1);

  const handleAgeInput = (text) => {
    const numericRegex = /^[0-9]*$/;
    if (numericRegex.test(text)) {
      setAgeInput(text);
      setAge(parseInt(text, 10));
    }
  };

  return (
    <View>
      <Appbar.Header>
        <Appbar.Content
          mode="center-aligned"
          style={styles.topbar}
          title="Personal Information"
        />
      </Appbar.Header>
      <TextInput
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        label="Age"
        value={ageInput}
        onChangeText={(text) => handleAgeInput(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {},
  topbar: {
    color: "black",
    fontWeight: "bold",
    justifyContent: "space-around",
    alignItems: "center",
  },
  /*image: {
    width: 256,
    height: 256,
    marginTop: 12,
    marginBottom: 12,
    alignSelf: "center", // Center the image horizontally
  },
  topbar: {
    color: "black",
    fontWeight: "bold",
    justifyContent: "space-around",
    alignItems: "center",
  },
  title: {
    color: "cornflowerblue",
    fontWeight: "bold",
    justifyContent: "space-around",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
    alignItems: "center",
  },
  label: {
    color: "gray",
    justifyContent: "space-around",
    marginTop: 5,
    marginBottom: 5,
  },
  link: {
    fontWeight: "bold",
    color: "blue",
  },
  signInButton: {
    justifyContent: "space-around",
    backgroundColor: "blue", 
  },*/
});

export default withTheme(Registration);
