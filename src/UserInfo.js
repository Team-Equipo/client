// UserInfo.js
import React from "react";
import { AsyncStorage } from "react-native";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  SafeAreaView,
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

const UserInfo = ({ navigation }) => {
  const [name, setName] = React.useState("");
  const [ageInput, setAgeInput] = React.useState(""); // text that appears in input box
  const [age, setAge] = React.useState(-1); // actual age value saved
  const [nationality, setNationality] = React.useState("");
  const [firstLanguage, setFirstLanguage] = React.useState("");
  const [education, setEducation] = React.useState("");
  const [interests, setInterests] = React.useState("");
  const [foods, setFoods] = React.useState("");

  // only allow numerical input
  const handleAgeInput = (text) => {
    const numericRegex = /^[0-9]*$/;
    if (numericRegex.test(text)) {
      setAgeInput(text);
      setAge(parseInt(text, 10));
    }
  };

  // ensure key info is entered before going to next screen
  const handleUserSubmit = () => {
    if (
      name != "" &&
      age != -1 &&
      nationality != "" &&
      firstLanguage != "" &&
      education != ""
    ) {
      navigation.navigate("TripInfo");
    }
  };

  return (
    <SafeAreaView style={{ flexDirection: "column", flex: 1 }}>
      <View
        rowGap="0.5%"
        paddingRight="0.5%"
        paddingLeft="0.5%"
        style={{ flex: 0 }}
      >
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
        <TextInput
          mode="outlined"
          label="Nationality"
          dense={true}
          value={nationality}
          outlineColor="lightgray"
          onChangeText={(text) => setNationality(text)}
        />
        <TextInput
          mode="outlined"
          label="First Language(s)"
          dense={true}
          value={firstLanguage}
          outlineColor="lightgray"
          onChangeText={(text) => setFirstLanguage(text)}
        />
        <TextInput
          mode="outlined"
          label="Educational Background"
          dense={true}
          value={education}
          outlineColor="lightgray"
          onChangeText={(text) => setEducation(text)}
        />
        <TextInput
          mode="outlined"
          label="Interests/Hobbies"
          dense={true}
          multiline={true}
          value={interests}
          outlineColor="lightgray"
          onChangeText={(text) => setInterests(text)}
        />
        <TextInput
          mode="outlined"
          label="Favorite Food(s)"
          dense={true}
          multiline={true}
          value={foods}
          outlineColor="lightgray"
          onChangeText={(text) => setFoods(text)}
        />

        <View
          paddingTop="1%"
          paddingRight="0.5%"
          paddingLeft="0.5%"
          style={{ flex: 0 }}
        >
          <Button mode="contained" onPress={handleUserSubmit}>
            Submit
          </Button>
        </View>
      </View>
    </SafeAreaView>
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
