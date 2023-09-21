import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, Provider as PaperProvider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native"; // Import the navigation hook

const LoginRegister = () => {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Linguisity</Text>
        <Button mode="contained" style={styles.button} onPress={() => {}}>
          Login
        </Button>
        <Button mode="outlined" style={styles.button} onPress={() => {}}>
          Register
        </Button>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    width: 200,
    marginVertical: 10,
  },
});

export default LoginRegister;
