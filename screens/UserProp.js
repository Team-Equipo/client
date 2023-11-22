// UserProp.js
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import { settingsStyle, settingsTheme } from "../styles/globalStyles";

const UserInfo = ({ navigation }) => {
  const [interests, setInterests] = React.useState("");
  const [userData, setUserdata] = React.useState({});

  // ensure key info is entered before going to next screen
  const handleUserSubmit = () => {
    if (interests != "") {
      storeData(["Hobbies"], [interests]);
      // navigation.navigate("UserPropFood");
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

  // read user info from storage
  const getUserData = async () => {
    try {
      setUserdata(JSON.parse(await AsyncStorage.getItem("user-info")));
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    getUserData();
  }, [AsyncStorage.getItem("user-info")]);

  return (
    <PaperProvider theme={settingsTheme}>
      <KeyboardAvoidingView behavior="position">
        <HideKeyboard>
          {/* <SafeAreaView style={{ flexDirection: "column", flex: 1 }}> */}
          <View
            rowGap={2}
            paddingRight={2}
            paddingLeft={2}
            style={settingsStyle.textInputWrapper}
          >
            <Text style={settingsStyle.titleText}>
              Nice to see you,{" "}
              <Text style={settingsStyle.titleText2}>
                {userData.firstName ? userData.firstName : "User"}!
              </Text>
            </Text>
            <Image
              // source={require("../assets/girl1.png")}
              source={require("../assets/images/myselfGirl.png")}
              style={settingsStyle.image}
              resizeMode="contain"
            />
            <Text style={settingsStyle.textInputDescription}>
              What do you do in your free time?
            </Text>
            <TextInput
              mode="outlined"
              label="Interests/Hobbies"
              multiline
              value={interests}
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
