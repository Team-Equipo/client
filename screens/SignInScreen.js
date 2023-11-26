import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useContext } from "react";
import {
  Image,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { TextInput, Button, PaperProvider, Text } from "react-native-paper";

import HideKeyboard from "../components/HideKeyboard";
import { AuthContext } from "../contexts/AuthContext";
import { signupStyles, signinTheme } from "../styles/globalStyles";

export default function SignIn() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useContext(AuthContext);
  const { signUp } = useContext(AuthContext);
  const [isPasswordHidden, setIsPasswordHidden] = React.useState(true);

  return (
    <PaperProvider theme={{ ...signinTheme }}>
      <KeyboardAvoidingView behavior="position" style={signupStyles.page}>
        <HideKeyboard>
          <LinearGradient
            colors={["#FFFFFF", "#FFFFFF", "#FFFFFF"]}
            locations={[0.01, 0.2, 0.7]}
          >
            <Image
              source={require("../assets/images/girl1.png")}
              style={signupStyles.imageGirl}
            />
            <View style={signupStyles.totalWrapper}>
              <View style={signupStyles.container}>
                <View style={signupStyles.textInputWrapper}>
                  <TextInput
                    mode="outlined"
                    label="Email Address"
                    value={emailAddress}
                    onChangeText={setEmailAddress}
                    style={signupStyles.textInput}
                    right={
                      <TextInput.Icon
                        onPress={() =>
                          alert("Accepted email types: gmail.com, calvin.edu")
                        }
                        icon="email-outline"
                        color="#3BC4E2"
                      />
                    }
                    outlineStyle={{ borderRadius: 24, borderColor: "#CDF5FD" }}
                  />
                  <TextInput
                    mode="outlined"
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    style={signupStyles.textInput}
                    right={
                      <TextInput.Icon
                        onPress={() => setIsPasswordHidden(!isPasswordHidden)}
                        icon={isPasswordHidden ? "eye-off" : "eye"}
                        color={isPasswordHidden ? "#FFB7B7" : "#3BC4E2"}
                      />
                    }
                    outlineStyle={{ borderRadius: 24, borderColor: "#CDF5FD" }}
                    secureTextEntry={isPasswordHidden}
                  />
                </View>
                <View style={signupStyles.buttonWrapper}>
                  <Button
                    mode="elevated"
                    onPress={() => signIn({ emailAddress, password })}
                    textColor="white"
                    labelStyle={{ fontWeight: "bold" }}
                    style={signupStyles.button}
                  >
                    <Text style={signupStyles.buttonText}>Sign In</Text>
                  </Button>
                  <Text style={signupStyles.divText}>- OR -</Text>
                  <View style={signupStyles.signupText}>
                    <Text style={signupStyles.bottomText}>
                      Don't have an account?{" "}
                    </Text>
                    <TouchableOpacity>
                      <Text
                        style={signupStyles.signinTouchable}
                        onPress={() => signUp()}
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
    </PaperProvider>
  );
}
