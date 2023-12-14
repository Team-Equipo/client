// AllSetPage.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import React, { useContext } from "react";
import { View, Animated } from "react-native";
import { Button, PaperProvider, Text } from "react-native-paper";

import { AuthContext } from "../contexts/AuthContext";
import { useRegistrationContext } from "../contexts/RegistrationContext";
import { allSetStyle, settingsTheme } from "../styles/globalStyles";

/**
 * Represents the All Set Page screen component.
 *
 * @param {object} navigation - The navigation object used for navigating between screens.
 * @returns {JSX.Element} The All Set screen component.
 */
const AllSetScreen = ({ navigation }) => {
  const { signOut, signIn } = useContext(AuthContext);
  const changeTxtColor = React.useRef(new Animated.Value(0)).current;
  const {
    userData,
    setFirstName,
    setLastName,
    setEmailAddress,
    setPassword,
    setInterests,
    setFoods,
    setDestination,
  } = useRegistrationContext();

  // Handle sign up
  const handleSignUp = async () => {
    try {
      const url = "https://jk249.azurewebsites.net/user";
      const headers = {
        "Content-Type": "application/json",
      };
      // create user object using RegistrationContext data
      const requestBody = {
        firstname: userData.firstName,
        lastname: userData.lastName,
        emailaddress: userData.emailAddress,
        password: userData.password,
        hobby: userData.interests,
        favoritefood: userData.foods,
        destination: userData.destination,
      };

      // submit user data to backend
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody),
      });
      const responseData = await response.text();

      // console.log("Request Body: ", requestBody);
      // console.log("Response Data: ", responseData);

      if (!response.ok) {
        throw new Error(
          `HTTP error. Status: ${response.status}, Response: ${responseData}`,
        );
      } else {
        // Sign-up successful, go back to sign-in page
        alert("Sign-up successful!");
        signOut();
        // signIn({
        //   emailaddress: userData.emailAddress,
        //   password: userData.password,
        // });
        // Reset locally stored inputs
        setFirstName("");
        setLastName("");
        setEmailAddress("");
        setPassword("");
        setInterests("");
        setFoods("");
        setDestination("");
      }
    } catch (error) {
      console.error("Sign-up Error: ", error);
    }
  };

  /**
   * Stores user data in AsyncStorage.
   * @param {Array<string>} keys - The keys for the data to be stored.
   * @param {Array<any>} values - The values to be stored.
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
    console.log(userData);
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

  // Text color animation
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(changeTxtColor, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(changeTxtColor, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  // Set the text color
  const textColor = changeTxtColor.interpolate({
    inputRange: [0, 0.5, 1],
    // outputRange: ["#00A9FF", "#FF6666"],
    outputRange: ["#1FA0FF", "#12DAFB", "#A7FDCC"],
  });

  // This is the actual return function where it gathers all the information above
  return (
    <PaperProvider theme={settingsTheme}>
      <View style={allSetStyle.container}>
        <LinearGradient
          // colors={["#6DCCFC", "#B4BDFF", "#FFFFFF"]}
          colors={["#FFFFFF", "#FFFFFF", "#FFFFFF"]}
          locations={[0.01, 0.02, 0.25]}
          style={{ height: "100%" }}
        >
          <View>
            <Animated.Text
              style={[allSetStyle.titleText, { color: textColor }]}
            >
              All Set!
            </Animated.Text>
            <View style={allSetStyle.animationContainer}>
              <LottieView
                source={require("../assets/animation/FileAnimation.json")}
                style={allSetStyle.animation}
                autoPlay
                loop
              />
            </View>
            <Button
              mode="elevated"
              textColor="white"
              labelStyle={{ fontWeight: "bold" }}
              style={[allSetStyle.button, { backgroundColor: textColor }]}
              // onPress={handleSignIn}
              onPress={handleSignUp}
            >
              <Text style={allSetStyle.buttonText}>Onward!</Text>
            </Button>
          </View>
        </LinearGradient>
      </View>
    </PaperProvider>
  );
};

export default AllSetScreen;
