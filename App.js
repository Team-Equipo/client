import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Base64 from "Base64";
import * as Font from "expo-font";
import React, { useEffect } from "react";
import { PaperProvider } from "react-native-paper";

import AppBar from "./components/AppBar";
import { AuthContext } from "./contexts/AuthContext";
import { PhraseStorageTrackerProvider } from "./contexts/PhraseStorageTracker";
import { RegistrationProvider } from "./contexts/RegistrationContext";
import AllSetScreen from "./screens/AllSetPage";
import EmergencyPhrases from "./screens/EmergencyPhrases";
import HomeScreen from "./screens/HomeScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SplashScreen from "./screens/SplashScreen";
import TripInfo from "./screens/TripInfo";
import UserInfo from "./screens/UserInfo";
import UserProp from "./screens/UserProp";
import UserPropFood from "./screens/UserPropFood";

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  const [showSplash, setShowSplash] = React.useState(true);

  useEffect(() => {
    // Load custom fonts
    async function loadFonts() {
      await Font.loadAsync({
        "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
        "Poppins-Thin": require("./assets/fonts/Poppins-Thin.ttf"),
        "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
        "Poppins-ExtraBold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
      });
    }

    loadFonts();
  }, []);

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_UP":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        // userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
        console.log(e);
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  useEffect(() => {
    const hideSplashTimeout = setTimeout(() => {
      setShowSplash(false);
    }, 3000); //setted to 3 secs

    return () => {
      clearTimeout(hideSplashTimeout);
    };
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // try {
        //   const url =
        //     "https://d36f-2600-1700-a650-12a0-6d91-2b6-7de7-afaf.ngrok-free.app/user";
        //   const headers = new Headers({
        //     "ngrok-skip-browser-warning": "true",
        //     Authorization:
        //       "Basic " + Base64.btoa(data.emailAddress + ":" + data.password),
        //   });
        // try {
        //   const url = "https://jk249.azurewebsites.net/user";
        //   const headers = new Headers({
        //     Authorization:
        //       "Basic " + Base64.btoa(data.emailAddress + ":" + data.password),
        //   });

        //   const response = await fetch(url, {
        //     method: "GET",
        //     headers,
        //   });

        //   const credentials = await response.json();
        dispatch({ type: "SIGN_IN", token: "signedin" });
        // } catch (error) {
        //   console.error(error);
        // }
      },
      signOut: () => dispatch({ type: "SIGN_OUT", token: "signedout" }),
      signUp: async (data) => {
        dispatch({ type: "SIGN_UP", token: "signup" });
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <PhraseStorageTrackerProvider>
        <RegistrationProvider>
          <PaperProvider>
            <NavigationContainer>
              {showSplash ? (
                <Stack.Navigator>
                  <Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                    options={{ headerShown: false }}
                  />
                </Stack.Navigator>
              ) : (
                <Stack.Navigator
                  screenOptions={{
                    header: (props) => <AppBar {...props} />,
                  }}
                >
                  {state.isLoading ? (
                    // We haven't finished checking for the token yet
                    <Stack.Screen name="Splash" component={SplashScreen} />
                  ) : state.userToken == null ||
                    state.userToken === "signedout" ? (
                    // No token found, user isn't signed in
                    <Stack.Screen
                      name="Splash"
                      component={SignInScreen}
                      options={{
                        title: "Sign in",
                        // When logging out, a pop animation feels intuitive
                        animationTypeForReplace: state.isSignout
                          ? "pop"
                          : "push",
                      }}
                    />
                  ) : state.userToken === "signup" ? (
                    <>
                      <Stack.Screen
                        name="SignUp"
                        component={SignUpScreen}
                        options={{
                          title: "Sign Up",
                          // When logging out, a pop animation feels intuitive
                          animationTypeForReplace: state.isSignout
                            ? "pop"
                            : "push",
                        }}
                      />
                      <Stack.Screen
                        name="UserInfo"
                        component={UserInfo}
                        options={{
                          title: "Your Name",
                          // When logging out, a pop animation feels intuitive
                          animationTypeForReplace: state.isSignout
                            ? "pop"
                            : "push",
                        }}
                      />
                      <Stack.Screen
                        name="UserProp"
                        component={UserProp}
                        options={{
                          title: "Your Interests",
                          // When logging out, a pop animation feels intuitive
                          animationTypeForReplace: state.isSignout
                            ? "pop"
                            : "push",
                        }}
                      />
                      <Stack.Screen
                        name="UserPropFood"
                        component={UserPropFood}
                        options={{
                          title: "Food",
                          // When logging out, a pop animation feels intuitive
                          animationTypeForReplace: state.isSignout
                            ? "pop"
                            : "push",
                        }}
                      />
                      <Stack.Screen
                        name="TripInfo"
                        component={TripInfo}
                        options={{
                          title: "Your Trip",
                          // When logging out, a pop animation feels intuitive
                          animationTypeForReplace: state.isSignout
                            ? "pop"
                            : "push",
                        }}
                      />
                      <Stack.Screen
                        name="AllSet"
                        component={AllSetScreen}
                        options={{
                          title: "All Set!",
                          // When logging out, a pop animation feels intuitive
                          animationTypeForReplace: state.isSignout
                            ? "pop"
                            : "push",
                        }}
                      />
                    </>
                  ) : (
                    // User is signed in
                    <>
                      <Stack.Screen name="Home" component={HomeScreen} />
                      <Stack.Screen
                        name="EmergencyPhrases"
                        component={EmergencyPhrases}
                        options={{
                          title: "Emergency Phrases",
                          // When logging out, a pop animation feels intuitive
                          animationTypeForReplace: state.isSignout
                            ? "pop"
                            : "push",
                        }}
                      />
                    </>
                  )}
                </Stack.Navigator>
              )}
            </NavigationContainer>
          </PaperProvider>
        </RegistrationProvider>
      </PhraseStorageTrackerProvider>
    </AuthContext.Provider>
  );
}
