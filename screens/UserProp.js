// UserProp.js
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

/**
 * Renders the user information screen.
 * @param {object} navigation - The navigation object used for screen navigation.
 * @returns {JSX.Element} The rendered user information screen.
 */
const UserInfo = ({ navigation }) => {
  const { userData, setInterests } = useRegistrationContext();

  // ensure key info is entered before going to next screen
  const handleUserSubmit = () => {
    if (userData.interests !== "") {
      navigation.navigate("UserPropFood");
    } else {
      alert("Please enter your interests/hobbies.");
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
                Nice to meet you,{" "}
                <Text style={settingsStyle.titleText2}>
                  {userData.firstName}!
                </Text>
              </Text>
              <Image
                // source={require("../assets/girl1.png")}
                source={require("../assets/images/myselfGirl.png")}
                style={settingsStyle.squareImage}
                resizeMode="contain"
              />
              <Text style={settingsStyle.textInputDescription}>
                What do you do in your free time?
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
          </KeyboardAvoidingView>
          {/* <SafeAreaView style={{ flexDirection: "column", flex: 1 }}> */}
          {/* </SafeAreaView> */}
        </HideKeyboard>
      </View>
    </PaperProvider>
  );
};

export default withTheme(UserInfo);
