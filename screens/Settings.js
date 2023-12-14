/*
This imports all libraries needed for the settings page
*/
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";
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

/**
 * Renders the settings page for editing user profile information.
 * @param {object} navigation - The navigation object used for navigating between screens.
 * @returns {JSX.Element} The rendered settings page component.
 */
const SettingsPage = ({ navigation }) => {
  const {
    userData,
    setDestination,
    setFirstName,
    setLastName,
    setInterests,
    setFoods,
  } = useRegistrationContext();

  // This is the function that will be called when the user presses the submit button
  const handleUserSubmit = async () => {
    if (
      userData.destination !== "" &&
      userData.firstName !== "" &&
      userData.lastName !== "" &&
      userData.interests !== "" &&
      userData.foods !== ""
    ) {
      const keys = [
        "Destination",
        "FirstName",
        "LastName",
        "Interests",
        "Foods",
      ];
      const values = [
        userData.destination,
        userData.firstName,
        userData.lastName,
        userData.interests,
        userData.foods,
      ];

      await storeData(keys, values);
      navigation.goBack();
    }
  };

  /**
   * Stores the provided keys and values in the user's data.
   * If the key and value lists are not the same length, an error is thrown.
   * @param {Array<string>} keys - The list of keys to store.
   * @param {Array<any>} values - The list of values to store.
   * @returns {Promise<void>} - A promise that resolves when the data is stored successfully.
   */
  const storeData = async (keys, values) => {
    if (keys.length !== values.length) {
      throw new Error("Key and value lists must be the same length");
    }
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
  // This is the actual return function where it gathers all the information above
  return (
    <PaperProvider theme={settingsTheme}>
      <View style={settingsStyle.page}>
        <HideKeyboard>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "position" : "none"}
          >
            <View
              rowGap={2}
              paddingRight={2}
              paddingLeft={2}
              style={settingsStyle.textInputWrapper}
            >
              <Text style={settingsStyle.titleText}>
                Edit your profile here!
              </Text>

              <Text style={settingsStyle.textInputDescription}>User info</Text>
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
              />
              <Text style={settingsStyle.textInputDescription}>Trip info</Text>
              <TextInput
                mode="outlined"
                label="Destination"
                value={userData.destination}
                right={<TextInput.Icon icon="map-marker" color="#3BC4E2" />}
                outlineStyle={{ borderRadius: 24, borderColor: "#CDF5FD" }}
                style={settingsStyle.textInput}
                onChangeText={(text) => setDestination(text)}
              />
              <View paddingTop="1%" paddingRight="0.5%" paddingLeft="0.5%">
                <Text style={settingsStyle.textInputDescription}>
                  Your interests
                </Text>
                <TextInput
                  mode="outlined"
                  label="Interests/Hobbies"
                  multiline
                  value={userData.interests}
                  right={
                    <TextInput.Icon icon="toy-brick-outline" color="#3BC4E2" />
                  }
                  outlineStyle={{ borderRadius: 24, borderColor: "#CDF5FD" }}
                  style={settingsStyle.textInput}
                  onChangeText={(text) => setInterests(text)}
                />
                <View
                  paddingTop="1%"
                  paddingRight="0.5%"
                  paddingLeft="0.5%"
                  style={{ flex: 0 }}
                />
                <Text style={settingsStyle.textInputDescription}>Food</Text>
                <TextInput
                  mode="outlined"
                  label="Favorite Food(s)"
                  multiline
                  value={userData.foods}
                  right={<TextInput.Icon icon="food" color="#3BC4E2" />}
                  outlineStyle={{ borderRadius: 24, borderColor: "#CDF5FD" }}
                  style={settingsStyle.textInput}
                  onChangeText={(text) => setFoods(text)}
                />
                <Button
                  mode="elevated"
                  textColor="white"
                  onPress={handleUserSubmit}
                  labelStyle={{ fontWeight: "bold" }}
                  style={settingsStyle.button}
                >
                  <Text style={settingsStyle.buttonText}>Submit</Text>
                </Button>
              </View>
            </View>
          </KeyboardAvoidingView>
        </HideKeyboard>
      </View>
    </PaperProvider>
  );
};

export default withTheme(SettingsPage);
