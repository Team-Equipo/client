// TripInfo.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import React from "react";
import { View, KeyboardAvoidingView, Image, Platform } from "react-native";
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

const TripInfo = ({ navigation }) => {
  const { userData, setDestination } = useRegistrationContext();

  const handleUserSubmit = () => {
    if (userData.destination != "") {
      storeData(["Destination"], [userData.destination]);
      navigation.navigate("AllSet");
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
                Where do you plan to travel,{" "}
                <Text style={settingsStyle.titleText2}>
                  {userData.firstName}?
                </Text>
              </Text>
              <Image
                // source={require("../assets/girl1.png")}
                source={require("../assets/images/global.png")}
                style={settingsStyle.squareImage}
                resizeMode="contain"
              />
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

export default withTheme(TripInfo);
