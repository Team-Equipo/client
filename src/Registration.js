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
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content
          title="Your Profile"
          color="white"
          titleStyle={styles.title}
        />
      </Appbar.Header>
      <View style={{ alignItems: "center" }}>
        <View style={styles.input}>
          <TextInput
            mode="outlined"
            label="Name"
            dense={true}
            value={name}
            outlineColor="lightgray"
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            mode="outlined"
            label="Age"
            dense={true}
            value={ageInput}
            outlineColor="lightgray"
            onChangeText={(text) => handleAgeInput(text)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "98%",
  },
  appbar: {
    backgroundColor: "cornflowerblue",
    marginTop: "-2%",
  },
  title: {
    color: "white",
    //fontWeight: "bold",
    fontSize: 20,
    justifyContent: "space-around",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
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
