// UserInfo.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
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
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  // ensure key info is entered before going to next screen
  const handleUserSubmit = () => {
    if (firstName !== "" && lastName !== "") {
      storeData(["firstName", "lastName"], [firstName, lastName]);
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

  const [fontLoaded, setFontLoaded] = React.useState(false);

  React.useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
        "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
        "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
      });
      setFontLoaded(true);
    };
    loadFont();
  }, []);

  if (!fontLoaded) return null;

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
            <Text style={settingsStyle.titleText}>How can we call you?</Text>
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
              value={firstName}
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
              value={lastName}
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
