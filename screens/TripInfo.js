// TripInfo.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import React from "react";
import { View, SafeAreaView, KeyboardAvoidingView, Image } from "react-native";
import {
  TextInput,
  Button,
  withTheme,
  PaperProvider,
  Text,
} from "react-native-paper";

import HideKeyboard from "../components/HideKeyboard";
import { settingsStyle, settingsTheme } from "../styles/globalStyles";

const TripInfo = ({ navigation }) => {
  const [destination, setRegion] = React.useState("");
  const [userData, setUserdata] = React.useState({});

  const handleUserSubmit = () => {
    if (destination != "") {
      storeData(["Destination"], [destination]);
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
    <PaperProvider theme={settingsTheme}>
      <KeyboardAvoidingView behavior="position">
        <HideKeyboard>
          <View
            rowGap={2}
            paddingRight={2}
            paddingLeft={2}
            style={settingsStyle.textInputWrapper}
          >
            <Text style={[settingsStyle.titleText, { paddingTop: "36%" }]}>
              Where do you plan to travel,{" "}
              <Text style={settingsStyle.titleText2}>
                {userData.firstName ? userData.firstName : "User"}?
              </Text>
            </Text>
            <Image
              // source={require("../assets/girl1.png")}
              source={require("../assets/images/airplane.png")}
              style={settingsStyle.image}
              resizeMode="contain"
            />
            <TextInput
              mode="outlined"
              label="Destination"
              value={destination}
              right={<TextInput.Icon icon="map-marker" color="#3BC4E2" />}
              outlineStyle={{ borderRadius: 24, borderColor: "#CDF5FD" }}
              style={settingsStyle.textInput}
              onChangeText={(text) => setRegion(text)}
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
        </HideKeyboard>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
};

export default withTheme(TripInfo);
