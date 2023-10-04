import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button } from "react-native-paper";

import { AuthContext } from "../contexts/AuthContext";

export default function HomeScreen() {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Welcome to Linguicidity!</Text>
      <Button style={styles.button} mode="contained" onPress={() => signOut()}>
        Sign out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    alignItems: "center",
  },
  button: {
    marginTop: 10,
    width: "70%",
  },
});
