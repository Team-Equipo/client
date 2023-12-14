// Settings.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
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

const SettingsPage = ({ navigation }) => {
  const {
    userData,
    setDestination,
    setFirstName,
    setLastName,
    setInterests,
    setFoods,
  } = useRegistrationContext();

  /**
   * Retrieves user data from AsyncStorage and sets the corresponding state variables.
   * @returns {Promise<void>} A promise that resolves when the user data is retrieved and the state variables are set.
   */
  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = JSON.parse(await AsyncStorage.getItem("user-info"));
        if (userData == null) {
          return;
        }
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setInterests(userData.interests);
        setFoods(userData.foods);
        setDestination(userData.destination);
      } catch (e) {
        console.log("GetUserData Error: ", e);
      }
    };
    getUserData();
  }, []);

  /**
   * Handles the submission of user data.
   * @returns {Promise<void>} A promise that resolves when the submission is complete.
   */
  const handleUserSubmit = async () => {
    try {
      if (
        userData.destination !== "" &&
        userData.firstName !== "" &&
        userData.lastName !== "" &&
        userData.interests !== "" &&
        userData.foods !== ""
      ) {
        // // Create user object
        // const data = {
        //   firstname: userData.firstName,
        //   lastname: userData.lastName,
        //   // emailaddress: userData.emailAddress,
        //   // password: userData.password,
        //   hobby: userData.interests,
        //   favoritefood: userData.foods,
        //   destination: userData.destination,
        // };
        // // Send data to backend
        // const response = await fetch(
        //   `https://jk249.azurewebsites.net/user/${userData.emailAddress}`,
        //   {
        //     method: "PUT",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(data),
        //   },
        // );
        // if (!response.ok) {
        //   alert("Update failed");
        //   throw new Error(
        //     `HTTP error. Status: ${
        //       response.status
        //     }, Response: ${await response.text()}`,
        //   );
        // }

        // Save to local storage
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
      } else {
        alert("Please fill out all fields");
      }
    } catch (e) {
      console.log("Failed to update your information. Details: ", e);
    }
  };

  /**
   * Stores data in AsyncStorage.
   * @param {Array<string>} keys - The keys to store the data under.
   * @param {Array<any>} values - The values to store.
   * @throws {Error} If the length of keys and values arrays are not the same.
   * @returns {Promise<void>} A promise that resolves when the data is stored successfully.
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
