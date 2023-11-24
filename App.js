import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import Base64 from "Base64";
import React from "react";

import { AuthContext } from "./contexts/AuthContext";
import { PhraseStorageTrackerProvider } from "./contexts/PhraseStorageTracker";
import SplashScreen from "./screens/SplashScreen";
import SignIn from "./screens/SignIn";
import TripInfo from "./screens/TripInfo";
import UserInfo from "./screens/UserInfo";
import HomeScreen from "./screens/HomeScreen";
import AppBar from "./components/AppBar";

const Stack = createNativeStackNavigator();

export default function App() {
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

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        // userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
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
        try {
          const url = "https://lingucidity.azurewebsites.net/user";
          const headers = new Headers({
            Authorization:
              "Basic " + Base64.btoa(data.emailAddress + ":" + data.password),
          });

          const response = await fetch(url, {
            method: "GET",
            headers: headers,
          });

          const credentials = await response.json();
          dispatch({ type: "SIGN_IN", token: credentials.token });
        } catch (error) {
          console.error(error);
        }
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {
        dispatch({ type: "SIGN_UP", token: "signup" });
      },
    }),
    [],
  );

  return (
    <PaperProvider theme={{ version: 3 }}>
      <AuthContext.Provider value={authContext}>
        <PhraseStorageTrackerProvider>
          <Stack.Screen name="Home" component={HomeScreen} />
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                header: (props) => <AppBar {...props} />,
              }}
            >
              {state.isLoading ? (
                // We haven't finished checking for the token yet
                <Stack.Screen name="Splash" component={SplashScreen} />
              ) : state.userToken == null ? (
                // No token found, user isn't signed in
                <Stack.Screen
                  name="SignIn"
                  component={SignIn}
                  options={{
                    title: "Sign in",
                    // When logging out, a pop animation feels intuitive
                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                  }}
                />
              ) : state.userToken == "signup" ? (
                <>
                  <Stack.Screen
                    name="SignUp"
                    component={UserInfo}
                    options={{
                      title: "Sign up",
                      // When logging out, a pop animation feels intuitive
                      animationTypeForReplace: state.isSignout ? "pop" : "push",
                    }}
                  />
                  <Stack.Screen
                    name="TripInfo"
                    component={TripInfo}
                    options={{
                      title: "Trip Info",
                      // When logging out, a pop animation feels intuitive
                      animationTypeForReplace: state.isSignout ? "pop" : "push",
                    }}
                  />
                </>
              ) : (
                // User is signed in
                <>
                  <Stack.Screen name="Home" component={HomeScreen} />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </PhraseStorageTrackerProvider>
      </AuthContext.Provider>
    </PaperProvider>
  );
}
