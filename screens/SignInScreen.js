import * as React from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";

import HideKeyboard from "../components/HideKeyboard";
import { AuthContext } from "../contexts/AuthContext";
import { signinStyles } from "../styles/globalStyles";

export default function SignInScreen() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { signIn } = React.useContext(AuthContext);
  const { signUp } = React.useContext(AuthContext);

  return (
    <HideKeyboard>
      <View style={signinStyles.container}>
        <View style={signinStyles.textInput}>
          <TextInput
            mode="outlined"
            label="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            mode="outlined"
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <View style={signinStyles.button}>
          <Button
            mode="contained"
            onPress={() => signIn({ username, password })}
          >
            Sign in
          </Button>
          <Button mode="contained" onPress={() => signUp()}>
            Register
          </Button>
        </View>
      </View>
    </HideKeyboard>
  );
}
