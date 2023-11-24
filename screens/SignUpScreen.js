import * as Font from "expo-font";
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
import { signupStyles, signinTheme, fonts } from "../styles/globalStyles";

const SignUpScreen = ({ navigation }) => {
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
    if (!username.endsWith("@calvin.edu") || !username.endsWith("@gmail.com")) {
      alert("Enter valid email address.");
    }
  };

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
    <PaperProvider theme={{ ...signinTheme, fonts }}>
      <KeyboardAvoidingView behavior="position">
        <HideKeyboard>
          <LinearGradient
            colors={["#FFFFFF", "#FFFFFF", "#FFFFFF"]}
            locations={[0.01, 0.2, 0.7]}
          >
            <Image
              // source={require("../assets/girl1.png")}
              source={require("../assets/images/accountPhone.png")}
              style={signupStyles.image}
              resizeMode="contain"
            />
            <View style={signupStyles.totalWrapper}>
              <View style={signupStyles.container}>
                <View style={signupStyles.textInputWrapper}>
                  <TextInput
                    mode="outlined"
                    label="Email"
                    value={username}
                    onChangeText={setUsername}
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
                    onPress={() => navigation.navigate("UserInfo")}
                    textColor="white"
                    labelStyle={{ fontWeight: "bold" }}
                    style={signupStyles.button}
                  >
                    <Text style={signupStyles.buttonText}>Sign Up</Text>
                  </Button>
                  <Text style={signupStyles.divText}>- OR -</Text>
                  <View style={signupStyles.signupText}>
                    <Text style={signupStyles.bottomText}>
                      Already have an account?{" "}
                    </Text>
                    <TouchableOpacity>
                      <Text
                        style={signupStyles.signinTouchable}
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
};

export default SignUpScreen;
