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
import { settingsStyle, settingsTheme, fonts } from "../styles/globalStyles";

const UserInfo = ({ navigation }) => {
  const [name, setName] = React.useState("");
  const [nationality, setNationality] = React.useState("");
  const [firstLanguage, setFirstLanguage] = React.useState("");

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
    <PaperProvider theme={{ ...settingsTheme, fonts }}>
      <KeyboardAvoidingView behavior="position">
        <HideKeyboard>
          {/* <SafeAreaView style={{ flexDirection: "column", flex: 1 }}> */}
          <View
            rowGap={2}
            paddingRight={2}
            paddingLeft={2}
            style={settingsStyle.textInputWrapper}
          >
            <Text style={settingsStyle.titleText}>Tell us about you!</Text>
            <Text style={settingsStyle.textInputDescription}>
              How can we call you?
            </Text>
            <TextInput
              mode="outlined"
              label="Name"
              value={name}
              right={<TextInput.Icon icon="account" color="#3BC4E2" />}
              outlineStyle={{
                borderRadius: 24,
                borderColor: name === "" ? "#FFB7B7" : "#CDF5FD",
              }}
              style={settingsStyle.textInput}
              onChangeText={(text) => setName(text)}
            />
            <Text style={settingsStyle.textInputDescription}>
              Where are you from?
            </Text>
            <TextInput
              mode="outlined"
              label="Nationality"
              value={nationality}
              right={<TextInput.Icon icon="earth" color="#3BC4E2" />}
              outlineStyle={{
                borderRadius: 24,
                borderColor: nationality === "" ? "#FFB7B7" : "#CDF5FD",
              }}
              style={settingsStyle.textInput}
              onChangeText={(text) => setNationality(text)}
            />
            <Text style={settingsStyle.textInputDescription}>
              What is your first language?
            </Text>
            <TextInput
              mode="outlined"
              label="First Language"
              value={firstLanguage}
              right={<TextInput.Icon icon="translate" color="#3BC4E2" />}
              outlineStyle={{
                borderRadius: 24,
                borderColor: firstLanguage === "" ? "#FFB7B7" : "#CDF5FD",
              }}
              style={settingsStyle.textInput}
              onChangeText={(text) => setFirstLanguage(text)}
            />
            <View
              paddingTop="1%"
              paddingRight="0.5%"
              paddingLeft="0.5%"
              style={{ flex: 0 }}
            >
              <Button
                mode="elevated"
                textColor="white"
                onPress={handleUserSubmit}
                labelStyle={{ fontWeight: "bold" }}
                style={settingsStyle.button}
              >
                <Text style={settingsStyle.buttonText}>NEXT</Text>
              </Button>
            </View>
          </View>
          {/* </SafeAreaView> */}
        </HideKeyboard>
      </KeyboardAvoidingView>
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
