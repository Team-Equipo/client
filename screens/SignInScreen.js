import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Image,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { TextInput, Button, PaperProvider, Text } from "react-native-paper";

import HideKeyboard from "../components/HideKeyboard";
import { useAuthContext } from "../contexts/AuthContext";
import { signStyles, signinTheme } from "../styles/globalStyles";

export default function SignIn({ navigation }) {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = React.useState(true);
  const { authActions } = useAuthContext();

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
                source={require("../assets/images/girl1.png")}
                style={signStyles.imageGirl}
              />
              <View style={signStyles.totalWrapper}>
                <View style={signStyles.container}>
                  <View style={signStyles.textInputWrapper}>
                    <TextInput
                      mode="outlined"
                      label="Email Address"
                      value={emailAddress}
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
                      value={password}
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
                  </View>
                  <View style={signStyles.buttonWrapper}>
                    <Button
                      mode="elevated"
                      onPress={() =>
                        authActions.signIn({ emailAddress, password })
                      }
                      textColor="white"
                      labelStyle={{ fontWeight: "bold" }}
                      style={signStyles.button}
                    >
                      <Text style={signStyles.buttonText}>Sign In</Text>
                    </Button>
                    <Text style={signStyles.divText}>- OR -</Text>
                    <View style={signStyles.signupText}>
                      <Text style={signStyles.bottomText}>
                        Don't have an account?{" "}
                      </Text>
                      <TouchableOpacity>
                        <Text
                          style={signStyles.signinTouchable}
                          onPress={() => authActions.signUp({})}
                        >
                          Sign Up
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
}
