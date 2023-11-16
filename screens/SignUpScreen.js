import { LinearGradient } from "expo-linear-gradient";
import * as React from "react";
import {
  Image,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput, Button, PaperProvider, Text } from "react-native-paper";

import HideKeyboard from "../components/HideKeyboard";
// import { AuthContext } from "../contexts/AuthContext";
import { signupStyles, signinTheme } from "../styles/globalStyles";

export default function SignInScreen() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cfpassword, setCfpassword] = React.useState("");
  const [isPasswordHidden, setIsPasswordHidden] = React.useState(true);
  const [isCfpasswordHidden, setIsCfpasswordHidden] = React.useState(true);

  const handleSignup = async () => {
    // Check if passwords match
    if (password !== cfpassword) {
      alert("Password does not match!");
      return;
    }

    // Check if the email is from @calvin.edu domain
    if (!email.endsWith("@calvin.edu")) {
      alert("Enter valid email address.");
    }
  };

  return (
    <PaperProvider theme={signinTheme}>
      <KeyboardAvoidingView behavior="position">
        <HideKeyboard>
          <LinearGradient
            // colors={["#0014FF", "#00A9FF", "#A0E9FF", "#FFFFFF"]}
            // locations={[0.01, 0.2, 0.5, 0.7]}
            // colors={["#0014FF", "#A0E9FF", "#FFFFFF"]}
            // locations={[0.01, 0.2, 0.7]}
            colors={["#FFFFFF", "#FFFFFF", "#FFFFFF"]}
            locations={[0.01, 0.2, 0.7]}
          >
            <Image
              source={require("../assets/talking.png")}
              // style={signupStyles.image}
              style={{
                isplay: "flex",
                width: "45%",
                height: "35%",
                marginTop: "30%",
                marginBottom: "2%",
                alignSelf: "center",
              }}
              resizeMode="contain"
            />
            <View style={signupStyles.totalWrapper}>
              <View style={signupStyles.container}>
                <View style={signupStyles.textInputWrapper}>
                  <TextInput
                    mode="outlined"
                    label="Email"
                    // label="Username"
                    value={username}
                    onChangeText={setUsername}
                    style={signupStyles.textInput}
                    right={
                      <TextInput.Icon icon="email-outline" color="#3BC4E2" />
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
                  <TextInput
                    mode="outlined"
                    label="Confirm Password"
                    value={cfpassword}
                    onChangeText={setCfpassword}
                    style={signupStyles.textInput}
                    right={
                      <TextInput.Icon
                        onPress={() =>
                          setIsCfpasswordHidden(!isCfpasswordHidden)
                        }
                        icon={isCfpasswordHidden ? "eye-off" : "eye"}
                        color={isCfpasswordHidden ? "#FFB7B7" : "#3BC4E2"}
                      />
                    }
                    outlineStyle={{ borderRadius: 24, borderColor: "#CDF5FD" }}
                    secureTextEntry={isCfpasswordHidden}
                  />
                </View>
                <View style={signupStyles.buttonWrapper}>
                  <Button
                    mode="elevated"
                    onPress={() => signIn({ username, password })}
                    textColor="white"
                    labelStyle={{ fontWeight: "bold" }}
                    style={signupStyles.button}
                  >
                    Sign Up
                  </Button>
                  <Text style={signupStyles.divText}>- OR -</Text>
                  <View style={signupStyles.signupText}>
                    <Text>Already have an account? </Text>
                    <TouchableOpacity>
                      <Text
                        style={{ color: "#3BC4E2", fontWeight: "bold" }}
                        onPress={() => signIn()}
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
    </PaperProvider>
  );
}
