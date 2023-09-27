// SignIn.js
import React from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Linking,
} from "react-native";
import {
  Appbar,
  Title,
  Snackbar,
  TextInput,
  Button,
  withTheme,
  Text,
  DefaultTheme,
  PaperProvider,
} from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "blue", // Change this to your desired primary color
    text: "black", // Change this to your desired text color
    outline: "#51c3f5", // Change this to your desired outline color
  },
};

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
    <PaperProvider theme={theme}>
      <DismissKeyboard>
        <View>
          <Appbar.Header>
            <Appbar.Content
              mode="center-aligned"
              type="large"
              theme={{ fontWeight: "bold", colors: { primary: "black" } }}
              style={styles.topbar}
              title="Lingucidity"
            />
          </Appbar.Header>
          <View style={{ padding: 16 }}>
            <View style={styles.backArea}>
              <Image
                /*source={require("../assets/airplane.png")}*/
                source={require("../assets/paperPlane.png")}
                style={styles.image}
              />

              <Title style={styles.title}>Welcome Back!</Title>

              <TextInput
                mode="outlined"
                label="Username"
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

              <View style={styles.oauthContainer}>
                <View style={styles.oauthImageContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(
                        "https://www.google.com/",
                      ); /* Replate the link by Google OAuth link */
                    }}
                  >
                    <Image
                      source={require("../assets/google.png")}
                      resizeMode="contain"
                      style={styles.oauthImage}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.oauthImageContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(
                        "https://www.facebook.com/",
                      ); /* Replate the link by Facebook OAuth link */
                    }}
                  >
                    <Image
                      source={require("../assets/facebook.png")}
                      resizeMode="contain"
                      style={styles.oauthImage}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.oauthImageContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(
                        "https://www.microsoft.com/",
                      ); /* Replate the link by Microsoft OAuth link */
                    }}
                  >
                    <Image
                      source={require("../assets/microsoft.png")}
                      resizeMode="contain"
                      style={styles.oauthImage}
                    />
                  </TouchableOpacity>
                </View>
              </View>
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
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 128,
    height: 128,
    marginTop: 12,
    marginBottom: 32,
    alignSelf: "center", // Center the image horizontally
  },
  backArea: {
    backgroundColor: "#dbf4ff",
    borderRadius: 16,
    padding: 24,
    marginTop: 24,
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
    marginVertical: 5,
  },
  oauthContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  oauthImageContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    alignSelf: "flex-start",
    marginHorizontal: 15,
    marginTop: 10,
    padding: 8,
    borderRadius: 32,
  },
  oauthImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
});

export default withTheme(SignIn);
