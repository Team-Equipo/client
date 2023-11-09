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
import { AuthContext } from "../contexts/AuthContext";
import { signinStyles, signinTheme } from "../styles/globalStyles";

export default function SignInScreen() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isPasswordHidden, setIsPasswordHidden] = React.useState(true);

  // const { signIn } = React.useContext(AuthContext);
  // const { signUp } = React.useContext(AuthContext);

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
              source={require("../assets/girl1.png")}
              style={signinStyles.image}
              resizeMode="contain"
            />
            <View style={signinStyles.totalWrapper}>
              <View style={signinStyles.container}>
                <View style={signinStyles.textInputWrapper}>
                  <TextInput
                    mode="outlined"
                    label="Username"
                    value={username}
                    onChangeText={setUsername}
                    style={signinStyles.textInput}
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
                    style={signinStyles.textInput}
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
                <View style={signinStyles.buttonWrapper}>
                  <Button
                    mode="elevated"
                    onPress={() => signIn({ username, password })}
                    textColor="white"
                    labelStyle={{ fontWeight: "bold" }}
                    style={signinStyles.button}
                  >
                    Sign in
                  </Button>
                  <Text style={signinStyles.divText}>- OR -</Text>
                  <View style={signinStyles.signupText}>
                    <Text>Don't have account? </Text>
                    <TouchableOpacity>
                      <Text
                        style={{ color: "#3BC4E2", fontWeight: "bold" }}
                        onPress={() => signUp()}
                      >
                        Sign Up
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {/* <Button
                    mode="elevated"
                    onPress={() => signUp()}
                    textColor="white"
                    labelStyle={{ fontWeight: "bold" }}
                  >
                    Register
                  </Button> */}
                </View>
              </View>
            </View>
          </LinearGradient>
        </HideKeyboard>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
}
