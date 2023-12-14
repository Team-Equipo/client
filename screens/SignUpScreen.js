// SignUpScreen.js
import { LinearGradient } from "expo-linear-gradient";
import React, { useContext } from "react";
import {
  Image,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TextInput, Button, PaperProvider, Text } from "react-native-paper";

import HideKeyboard from "../components/HideKeyboard";
import { AuthContext } from "../contexts/AuthContext";
import { useRegistrationContext } from "../contexts/RegistrationContext";
import { signStyles, signinTheme } from "../styles/globalStyles";

/**
 * Represents the sign-up screen component.
 *
 * @param {object} navigation - The navigation object.
 * @returns {JSX.Element} The sign-up screen component.
 */
const SignUpScreen = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);
  // const { setFirstName, setLastName, setInterests, setFoods, setDestination } =
  //   useRegistrationContext();
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
  const [cfpassword, setCfpassword] = React.useState("");
  const [isPasswordHidden, setIsPasswordHidden] = React.useState(true);
  const [isCfpasswordHidden, setIsCfpasswordHidden] = React.useState(true);

  // Function to handle sign up where it will check if the passwords match and if the email is valid
  const handleSignUp = () => {
    // Check if passwords match
    if (userData.password !== cfpassword) {
      alert("Password does not match!");
      return;
    }

    // Check if the email is from @calvin.edu domain
    if (
      !(
        userData.emailAddress.endsWith("@calvin.edu") ||
        userData.emailAddress.endsWith("@gmail.com")
      )
    ) {
      alert("Enter valid email address.");
      return;
    }
    navigation.navigate("UserInfo");
  };

  //Function to cancel sign up where it will reset the data and sign out
  const cancelSignUp = () => {
    setFirstName("");
    setLastName("");
    setEmailAddress("");
    setPassword("");
    setInterests("");
    setFoods("");
    setDestination("");
    signOut();
  };

  return (
    <PaperProvider theme={{ ...signinTheme }}>
      <View style={signStyles.page}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : "none"}
        >
          <HideKeyboard>
            <LinearGradient
              colors={["#FFFFFF", "#FFFFFF", "#FFFFFF"]}
              locations={[0.01, 0.2, 0.7]}
            >
              <Image
                source={require("../assets/images/accountPhone.png")}
                style={signStyles.image}
                resizeMode="contain"
              />
              <View style={signStyles.totalWrapper}>
                <View style={signStyles.container}>
                  <View style={signStyles.textInputWrapper}>
                    <TextInput
                      mode="outlined"
                      label="Email"
                      value={userData.emailAddress}
                      onChangeText={setEmailAddress}
                      style={signStyles.textInput}
                      right={
                        <TextInput.Icon
                          onPress={() =>
                            alert("Accepted email types: gmail.com, calvin.edu")
                          }
                          icon="email-outline"
                          color="#3BC4E2"
                        />
                      }
                      outlineStyle={{
                        borderRadius: 24,
                        borderColor: "#CDF5FD",
                      }}
                    />
                    <TextInput
                      mode="outlined"
                      label="Password"
                      value={userData.password}
                      onChangeText={setPassword}
                      style={signStyles.textInput}
                      right={
                        <TextInput.Icon
                          onPress={() => setIsPasswordHidden(!isPasswordHidden)}
                          icon={isPasswordHidden ? "eye-off" : "eye"}
                          color={isPasswordHidden ? "#FFB7B7" : "#3BC4E2"}
                        />
                      }
                      outlineStyle={{
                        borderRadius: 24,
                        borderColor: "#CDF5FD",
                      }}
                      secureTextEntry={isPasswordHidden}
                    />
                    <TextInput
                      mode="outlined"
                      label="Confirm Password"
                      value={cfpassword}
                      onChangeText={setCfpassword}
                      style={signStyles.textInput}
                      right={
                        <TextInput.Icon
                          onPress={() =>
                            setIsCfpasswordHidden(!isCfpasswordHidden)
                          }
                          icon={isCfpasswordHidden ? "eye-off" : "eye"}
                          color={isCfpasswordHidden ? "#FFB7B7" : "#3BC4E2"}
                        />
                      }
                      outlineStyle={{
                        borderRadius: 24,
                        borderColor: "#CDF5FD",
                      }}
                      secureTextEntry={isCfpasswordHidden}
                    />
                  </View>
                  <View style={signStyles.buttonWrapper}>
                    <Button
                      mode="elevated"
                      onPress={handleSignUp}
                      textColor="white"
                      labelStyle={{ fontWeight: "bold" }}
                      style={signStyles.button}
                    >
                      <Text style={signStyles.buttonText}>Sign Up</Text>
                    </Button>
                    <Text style={signStyles.divText}>- OR -</Text>
                    <View style={signStyles.signupText}>
                      <Text style={signStyles.bottomText}>
                        Already have an account?{" "}
                      </Text>
                      <TouchableOpacity>
                        <Text
                          style={signStyles.signinTouchable}
                          onPress={cancelSignUp}
                        >
                          Sign In
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </HideKeyboard>
        </KeyboardAvoidingView>
      </View>
    </PaperProvider>
  );
};

export default SignUpScreen;
