// SignIn.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
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

import { signinStyles } from "../styles/signinStyles";
import { clientId } from "../config/.oauthid.json";

WebBrowser.maybeCompleteAuthSession();

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
  // Set User (non OAuth signin)
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);

  const handleSignIn = () => {};

  const createAccount = () => {};

  const findPassword = () => {};

  // Set User (OAuth signin)
  const [userInfo, setUserInfo] = React.useState(null);

  // Facebook OAuth
  const [f_request, f_response, promptAsyncFacebook] = Facebook.useAuthRequest({
    clientId: clientId.googleClientId,
  });

  // Google OAuth
  const [g_request, g_response, promptAsyncGoogle] = Google.useAuthRequest({
    androidClientId: clientId.androidClientId,
    iosClientId: clientId.iosClientId,
    webClientId: clientId.webClientId,
  });

  React.useEffect(() => {
    handleFacebookSignin();
  }, [f_response]);

  React.useEffect(() => {
    handleGoogleSignin();
  }, [g_response]);

  // Facebook OAuth Signin function
  async function handleFacebookSignin() {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      // make a request when user does not exist (yet)
      if (f_response?.type === "success") {
        await getFacebookUserInfo(f_response.authentication.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }

  // Google OAuth Signin function
  async function handleGoogleSignin() {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      // make a request when user does not exist (yet)
      if (g_response?.type === "success") {
        await getGoogleUserInfo(g_response.authentication.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }

  // Get Facebook User Information
  const getFacebookUserInfo = async (token) => {
    if (!token) return;
    try {
      const f_response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large)`,
      );
      const user = await f_response.json();
      // save user locally
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      alert("Facebook OAuth error: ", error);
    }
  };

  // Get Google User Information
  const getGoogleUserInfo = async (token) => {
    if (!token) return;
    try {
      const g_response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const user = await g_response.json();
      // save user locally
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      alert("Google OAuth error: ", error);
    }
  };

  const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

  return (
    <PaperProvider theme={theme}>
      <DismissKeyboard>
        <View>
          <Appbar.Header>
            <Appbar.Content
              mode="center-aligned"
              type="large"
              theme={{ fontWeight: "bold", colors: { primary: "black" } }}
              style={signinStyles.topbar}
              title="Lingucidity"
            />
          </Appbar.Header>
          <View style={{ padding: 16 }}>
            <View style={signinStyles.backArea}>
              <Image
                source={require("../assets/paperPlane.png")}
                style={signinStyles.image}
              />

              <Title style={signinStyles.title}>Welcome Back!</Title>

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

              <View style={signinStyles.forgotPassword}>
                <TouchableOpacity onPress={findPassword}>
                  <Text style={signinStyles.label}>Forgot your password?</Text>
                </TouchableOpacity>
              </View>
              {/* Sign-in Button */}
              <Button
                style={signinStyles.signInButton}
                theme={{ fontWeight: "bold", colors: { primary: "white" } }}
                mode="elevated"
                onPress={handleSignIn}
              >
                Sign In
              </Button>
              {/* Create Account Page */}
              <View style={signinStyles.row}>
                <Text style={signinStyles.label}>Don’t have an account? </Text>
                <TouchableOpacity onPress={createAccount}>
                  <Text style={signinStyles.link}>Sign up</Text>
                </TouchableOpacity>
              </View>
              {/* OAuth Icons */}
              <View style={signinStyles.oauthContainer}>
                {/* Google OAuth */}
                <View style={signinStyles.oauthImageContainer}>
                  <TouchableOpacity onPress={() => promptAsyncGoogle()}>
                    <Image
                      source={require("../assets/google.png")}
                      resizeMode="contain"
                      style={signinStyles.oauthImage}
                    />
                  </TouchableOpacity>
                </View>
                {/* Facebook */}
                <View style={signinStyles.oauthImageContainer}>
                  <TouchableOpacity onPress={() => promptAsyncFacebook()}>
                    <Image
                      source={require("../assets/facebook.png")}
                      resizeMode="contain"
                      style={signinStyles.oauthImage}
                    />
                  </TouchableOpacity>
                </View>
                {/* Apple */}
                <View style={signinStyles.oauthImageContainer}>
                  <AppleAuthentication.AppleAuthenticationButton
                    buttonType={
                      AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
                    }
                    buttonStyle={
                      AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
                    }
                    cornerRadius={10}
                    style={signinStyles.oauthImage}
                    onPress={async () => {
                      try {
                        const credential =
                          await AppleAuthentication.signInAsync({
                            requestedScopes: [
                              AppleAuthentication.AppleAuthenticationScope
                                .FULL_NAME,
                              AppleAuthentication.AppleAuthenticationScope
                                .EMAIL,
                            ],
                          });
                        // signed in
                      } catch (error) {
                        if (e.code === "ERR_REQUEST_CANCELED") {
                          alert("Request cancelled: ", error);
                        } else {
                          alert("Apple OAuth error: ", error);
                        }
                      }
                    }}
                  />
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

export default withTheme(SignIn);
