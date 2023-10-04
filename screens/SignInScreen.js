import * as React from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, Button } from "react-native-paper";

import { AuthContext } from "../contexts/AuthContext";

export default function SignInScreen() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { signIn } = React.useContext(AuthContext);

  return (
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
        <Button mode="contained" onPress={() => signIn({ username, password })}>
          Sign in
        </Button>
      </View>
    </View>
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
  },
});
