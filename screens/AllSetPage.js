// AllSetPage.js
// the page that is displayed after the user has completed the registration process
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import React from "react";
import { View, Animated } from "react-native";
import { Button, PaperProvider, Text } from "react-native-paper";

import { AuthContext } from "../contexts/AuthContext";
import { useRegistrationContext } from "../contexts/RegistrationContext";
import { allSetStyle, settingsTheme } from "../styles/globalStyles";

const AllSetScreen = ({ navigation }) => {
  const { signIn } = React.useContext(AuthContext);
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

  // Handle sign in
  const handleSignIn = async () => {
    try {
      const requestBody = {
        firstname: userData.firstName,
        lastname: userData.lastName,
        emailaddress: userData.emailAddress,
        password: userData.password,
        hobby: userData.interests,
        favoritefood: userData.foods,
        destination: userData.destination,
      };

      const url = "https://jk249.azurewebsites.net/user";
      const headers = {
        "Content-Type": "application/json",
      };

      // submit user data to the endpoint
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody),
      });

      console.log("Response: ", response);

      if (!response.ok) {
        alert("Sign-up failed");
        throw new Error(
          `HTTP error. Status: ${
            response.status
          }, Response: ${await response.text()}`,
        );
      }
      const responseData = await response.json();
      console.log("Response Data: ", responseData);
    } catch (error) {
      console.error("Sign-up Error: ", error);
    }

    // Reset locally stored inputs
    setFirstName("");
    setLastName("");
    setEmailAddress("");
    setPassword("");
    setInterests("");
    setFoods("");
    setDestination("");

    // Sign in user at the end
    signIn({
      emailAddress: userData.emailAddress,
      password: userData.password,
    });
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

  // Change text color
  const textColor = changeTxtColor.interpolate({
    inputRange: [0, 0.5, 1],
    // outputRange: ["#00A9FF", "#FF6666"],
    outputRange: ["#1FA0FF", "#12DAFB", "#A7FDCC"],
  });

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
              onPress={handleSignIn}
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
