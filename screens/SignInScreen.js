import * as React from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, Button } from "react-native-paper";

import HideKeyboard from "../components/HideKeyboard";
import { AuthContext } from "../contexts/AuthContext";

export default function SignInScreen() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { signIn } = React.useContext(AuthContext);
  const { signUp } = React.useContext(AuthContext);

  return (
    <HideKeyboard>
      <View style={styles.container}>
        <View style={styles.textInput}>
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
        <View style={styles.button}>
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

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    alignItems: "center",
  },
  textInput: {
    width: "80%",
    display: "flex",
    gap: 5,
  },
  button: {
    marginTop: 10,
    width: "80%",
    display: "flex",
    gap: 10,
  },
});
