import { LinearGradient } from "expo-linear-gradient";
import * as React from "react";
import { Image, View } from "react-native";
import { TextInput, Button, PaperProvider, Text } from "react-native-paper";

import HideKeyboard from "../components/HideKeyboard";
import { AuthContext } from "../contexts/AuthContext";
import { signinStyles, signinTheme } from "../styles/globalStyles";

export default function SignInScreen() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { signIn } = React.useContext(AuthContext);
  const { signUp } = React.useContext(AuthContext);

  return (
    <PaperProvider theme={signinTheme}>
      <HideKeyboard>
        <LinearGradient
          // colors={["#0014FF", "#00A9FF", "#A0E9FF", "#FFFFFF"]}
          // locations={[0.01, 0.2, 0.5, 0.7]}
          colors={["#0014FF", "#A0E9FF", "#FFFFFF"]}
          locations={[0.01, 0.2, 0.7]}
        >
          <View style={signinStyles.imageContainer}>
            <Image
              source={require("../assets/talking.png")}
              style={signinStyles.image}
            />
          </View>
          <View style={signinStyles.totalWrapper}>
            <View style={signinStyles.container}>
              <View style={signinStyles.textInputWrapper}>
                <TextInput
                  mode="outlined"
                  label="Username"
                  value={username}
                  onChangeText={setUsername}
                  style={signinStyles.textInput}
                  outlineStyle={{ borderRadius: 24 }}
                />
                <TextInput
                  mode="outlined"
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  style={signinStyles.textInput}
                  outlineStyle={{ borderRadius: 24 }}
                  secureTextEntry
                />
              </View>
              <View style={signinStyles.button}>
                <Button
                  mode="elevated"
                  onPress={() => signIn({ username, password })}
                  textColor="white"
                  labelStyle={{ fontWeight: "bold" }}
                >
                  Sign in
                </Button>
                <Text style={signinStyles.divText}>- OR -</Text>
                <Button
                  mode="elevated"
                  onPress={() => signUp()}
                  textColor="white"
                  labelStyle={{ fontWeight: "bold" }}
                >
                  Register
                </Button>
              </View>
            </View>
          </View>
        </LinearGradient>
      </HideKeyboard>
    </PaperProvider>
  );
}
