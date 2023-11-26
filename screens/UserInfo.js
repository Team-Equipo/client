// UserInfo.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, KeyboardAvoidingView, Image } from "react-native";
import {
  TextInput,
  Button,
  withTheme,
  PaperProvider,
  Text,
} from "react-native-paper";

import HideKeyboard from "../components/HideKeyboard";
import { useRegistrationContext } from "../contexts/RegistrationContext";
import { settingsStyle, settingsTheme } from "../styles/globalStyles";

const UserInfo = ({ navigation }) => {
  const { userData, setFirstName, setLastName } = useRegistrationContext();

  // ensure key info is entered before going to next screen
  const handleUserSubmit = () => {
    if (userData.firstName !== "" && userData.lastName !== "") {
      storeData(
        ["firstName", "lastName"],
        [userData.firstName, userData.lastName],
      );
      navigation.navigate("UserProp");
    }
  };

  const storeData = async (keys, values) => {
    let userData;
    try {
      userData = JSON.parse(await AsyncStorage.getItem("user-info"));
      if (userData == null) {
        userData = {};
      }
    } catch (e) {
      console.log(e);
    }
    for (let i = 0; i < keys.length; i++) {
      userData[keys[i]] = values[i];
    }
    // console.log("User data with insertion:", userData);
    try {
      await AsyncStorage.setItem("user-info", JSON.stringify(userData));
    } catch (e) {
      console.log(e);
    }
    try {
      userData = JSON.parse(await AsyncStorage.getItem("user-info"));
      console.log(userData);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <PaperProvider theme={{ ...settingsTheme }}>
      <KeyboardAvoidingView behavior="height" style={settingsStyle.page}>
        <HideKeyboard>
          <View
            rowGap={2}
            paddingRight={2}
            paddingLeft={2}
            style={settingsStyle.textInputWrapper}
          >
            <Text style={settingsStyle.titleText}>
              What should we call you?
            </Text>
            <Image
              source={require("../assets/images/myselfGirl.png")}
              style={settingsStyle.image}
              resizeMode="contain"
            />
            <Text style={settingsStyle.textInputDescription}>
              What is your First Name?
            </Text>
            <TextInput
              mode="outlined"
              label="First Name"
              value={userData.firstName}
              right={<TextInput.Icon icon="account" color="#3BC4E2" />}
              outlineStyle={{
                borderRadius: 24,
                borderColor: "#CDF5FD",
              }}
              style={settingsStyle.textInput}
              onChangeText={(text) => setFirstName(text)}
            />
            <Text style={settingsStyle.textInputDescription}>
              What is your Last Name?
            </Text>
            <TextInput
              mode="outlined"
              label="Last Name"
              value={userData.lastName}
              right={<TextInput.Icon icon="account" color="#3BC4E2" />}
              outlineStyle={{
                borderRadius: 24,
                borderColor: "#CDF5FD",
              }}
              style={settingsStyle.textInput}
              onChangeText={(text) => setLastName(text)}
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
        </HideKeyboard>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
};

export default withTheme(UserInfo);
