// SignIn.js
import React from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import {
  Appbar,
  Title,
  Snackbar,
  TextInput,
  Button,
  withTheme,
  Text,
} from "react-native-paper";

const SignIn = () => {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);

  const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

  const handleSignIn = () => {};

  const createAccount = () => {};

  const findPassword = () => {};

  return (
    <DismissKeyboard>
      <View>
        <Appbar.Header>
          <Appbar.Content
            mode="center-aligned"
            style={styles.topbar}
            title="Lingucidity"
          />
        </Appbar.Header>
        <View style={{ padding: 16 }}>
          <Image
            source={require("./assets/airplane.png")}
            style={styles.image}
          />

          <Title style={styles.title}>Welcome Back!</Title>
          <TextInput
            mode="outlined"
            label="Username/Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <TextInput
            mode="outlined"
            label="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />

          <View style={styles.forgotPassword}>
            <TouchableOpacity onPress={findPassword}>
              <Text style={styles.label}>Forgot your password?</Text>
            </TouchableOpacity>
          </View>

          <Button
            style={styles.signInButton}
            theme={{ fontWeight: "bold", colors: { primary: "white" } }}
            mode="elevated"
            onPress={handleSignIn}
          >
            Sign In
          </Button>

          <View style={styles.row}>
            <Text style={styles.label}>Don’t have an account? </Text>
            <TouchableOpacity onPress={createAccount}>
              <Text style={styles.link}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
        >
          Sign In Successful!
        </Snackbar>
      </View>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 256,
    height: 256,
    marginTop: 12,
    marginBottom: 12,
    alignSelf: "center", // Center the image horizontally
  },
  topbar: {
    color: "black",
    fontWeight: "bold",
    justifyContent: "space-around",
    alignItems: "center",
  },
  title: {
    color: "cornflowerblue",
    fontWeight: "bold",
    justifyContent: "space-around",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
    alignItems: "center",
  },
  label: {
    color: "gray",
    justifyContent: "space-around",
    marginTop: 5,
    marginBottom: 5,
  },
  link: {
    fontWeight: "bold",
    color: "blue",
  },
  signInButton: {
    justifyContent: "space-around",
    backgroundColor: "blue",
  },
});

export default withTheme(SignIn);
