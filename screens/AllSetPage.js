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
 * Represents the All Set screen component.
 *
 * @param {object} navigation - The navigation object used for navigating between screens.
 * @returns {JSX.Element} The All Set screen component.
 */
const AllSetScreen = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);
  const changeTxtColor = React.useRef(new Animated.Value(0)).current;
  const {
    userData,
    setFirstName,
    setLastName,
    setInterests,
    setFoods,
    setDestination,
  } = useRegistrationContext();

  /**
   * Handles the sign-in process.
   */
  const handleSignIn = () => {
    storeData(
      ["FirstName", "LastName", "Interests", "Foods", "Destination"],
      [
        userData.firstName,
        userData.lastName,
        userData.interests,
        userData.foods,
        userData.destination,
      ],
    );

    // Reset locally stored inputs
    setFirstName("");
    setLastName("");
    setInterests("");
    setFoods("");
    setDestination("");

    signIn({ emailAddress: "placeholder@calvin.edu", password: "password" });
  };

  /**
   * Stores data in AsyncStorage.
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

  // Animate the text color
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(changeTxtColor, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: false,
        }),
        Animated.timing(changeTxtColor, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, []);

  // Set the text color
  const textColor = changeTxtColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["#00A9FF", "#FF6666"],
  });
  /*
This is the actual return function where it gathers all the information above
*/
  return (
    <PaperProvider theme={settingsTheme}>
      <View style={allSetStyle.container}>
        <LinearGradient
          colors={["#6DCCFC", "#B4BDFF", "#FFFFFF"]}
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
              style={allSetStyle.button}
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
