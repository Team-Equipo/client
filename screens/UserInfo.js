// UserInfo.js
import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { TextInput, Button, withTheme } from "react-native-paper";
import InfoBox from "../components/InfoBox";

import HideKeyboard from "../components/HideKeyboard";

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
  const validateInfo = () => {
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
    <HideKeyboard>
      <SafeAreaView style={{ flexDirection: "column", flex: 1 }}>
        <View rowGap={2} paddingRight={2} paddingLeft={2} style={{ flex: 0 }}>
          <InfoBox
            mode="outlined"
            label="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <InfoBox
            inputMode="numeric"
            label="Age"
            value={ageInput}
            onChangeText={(text) => handleAgeInput(text)}
          />
          <InfoBox
            label="Nationality"
            value={nationality}
            onChangeText={(text) => setNationality(text)}
          />
          <InfoBox
            label="First Language(s)"
            value={firstLanguage}
            onChangeText={(text) => setFirstLanguage(text)}
          />
          <InfoBox
            label="Educational Background"
            value={education}
            onChangeText={(text) => setEducation(text)}
          />
          <InfoBox
            label="Interests/Hobbies"
            multiline={true}
            value={interests}
            onChangeText={(text) => setInterests(text)}
          />
          <InfoBox
            label="Favorite Food(s)"
            multiline={true}
            value={foods}
            onChangeText={(text) => setFoods(text)}
          />

          <View
            paddingTop="1%"
            paddingRight="0.5%"
            paddingLeft="0.5%"
            style={{ flex: 0 }}
          >
            <Button mode="contained" onPress={validateInfo}>
              Submit
            </Button>
          </View>
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
