// UserInfo.js
import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import {
  TextInput,
  Button,
  withTheme,
  PaperProvider,
  Text,
} from "react-native-paper";

import HideKeyboard from "../components/HideKeyboard";
import { settingsStyle, settingsTheme } from "../styles/globalStyles";

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
      // age != -1 &&
      nationality != "" &&
      firstLanguage != "" &&
      education != ""
    ) {
      navigation.navigate("TripInfo");
    }
  };

  return (
    <PaperProvider theme={settingsTheme}>
      <HideKeyboard>
        {/* <KeyboardAvoidingView> */}
        <SafeAreaView style={{ flexDirection: "column", flex: 1 }}>
          <View
            rowGap={2}
            paddingRight={2}
            paddingLeft={2}
            style={settingsStyle.textInputWrapper}
          >
            <Text style={settingsStyle.titleText}>Tell us more about you</Text>
            <TextInput
              mode="outlined"
              label="Name"
              dense={true}
              value={name}
              right={<TextInput.Icon icon="account" color="#3BC4E2" />}
              outlineStyle={{ borderRadius: 24, borderColor: "#CDF5FD" }}
              style={settingsStyle.textInput}
              onChangeText={(text) => setName(text)}
            />
            {/* <TextInput
                keyboardType="numeric"
                mode="outlined"
                label="Age"
                dense={true}
                value={ageInput}
                outlineColor="lightgray"
                onChangeText={(text) => handleAgeInput(text)}
              /> */}
            <TextInput
              mode="outlined"
              label="Nationality"
              dense={true}
              value={nationality}
              right={<TextInput.Icon icon="earth" color="#3BC4E2" />}
              outlineStyle={{ borderRadius: 24, borderColor: "#CDF5FD" }}
              style={settingsStyle.textInput}
              onChangeText={(text) => setNationality(text)}
            />
            <TextInput
              mode="outlined"
              label="First Language"
              dense={true}
              value={firstLanguage}
              right={<TextInput.Icon icon="translate" color="#3BC4E2" />}
              outlineStyle={{ borderRadius: 24, borderColor: "#CDF5FD" }}
              style={settingsStyle.textInput}
              onChangeText={(text) => setFirstLanguage(text)}
            />
            <TextInput
              mode="outlined"
              label="Educational Background"
              dense={true}
              value={education}
              right={<TextInput.Icon icon="school-outline" color="#3BC4E2" />}
              outlineStyle={{ borderRadius: 24, borderColor: "#CDF5FD" }}
              style={settingsStyle.textInput}
              onChangeText={(text) => setEducation(text)}
            />
            <TextInput
              mode="outlined"
              label="Interests/Hobbies"
              dense={true}
              multiline={true}
              value={interests}
              right={
                <TextInput.Icon icon="toy-brick-outline" color="#3BC4E2" />
              }
              outlineStyle={{ borderRadius: 24, borderColor: "#CDF5FD" }}
              style={settingsStyle.textInput}
              onChangeText={(text) => setInterests(text)}
            />
            <TextInput
              mode="outlined"
              label="Favorite Food(s)"
              dense={true}
              multiline={true}
              value={foods}
              right={<TextInput.Icon icon="food" color="#3BC4E2" />}
              outlineStyle={{ borderRadius: 24, borderColor: "#CDF5FD" }}
              style={settingsStyle.textInput}
              onChangeText={(text) => setFoods(text)}
            />

            <View
              paddingTop="1%"
              paddingRight="0.5%"
              paddingLeft="0.5%"
              style={{ flex: 0 }}
            >
              <Button
                mode="elevated"
                onPress={() => signIn({ username, password })}
                textColor="white"
                onPress={handleUserSubmit}
                labelStyle={{ fontWeight: "bold" }}
                style={settingsStyle.button}
              >
                NEXT
              </Button>
            </View>
          </View>
        </SafeAreaView>
        {/* </KeyboardAvoidingView> */}
      </HideKeyboard>
    </PaperProvider>
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
