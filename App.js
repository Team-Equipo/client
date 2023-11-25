import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from "expo-font";
import React, { useEffect } from "react";

import AppBar from "./components/AppBar";
import { AuthContext } from "./contexts/AuthContext";
import AllSetScreen from "./screens/AllSetPage";
import HomeScreen from "./screens/HomeScreen";
import Phrase from "./screens/Phrase";
import Phrases from "./screens/Phrases";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SplashScreen from "./screens/SplashScreen";
import Translation from "./screens/Translation";
import TripInfo from "./screens/TripInfo";
import UserInfo from "./screens/UserInfo";
import UserProp from "./screens/UserProp";
import UserPropFood from "./screens/UserPropFood";

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
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
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
      signOut: () => dispatch({ type: "SIGN_OUT", token: "signedout" }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token
        dispatch({ type: "SIGN_UP", token: "signup" });
      },
    }),
    [],
  );

  return (
    // <SignInScreen />
    // <SignUpScreen />
    // <UserInfo />
    // <UserProp />
    // <UserPropFood />
    // <TripInfo />
    // <AllSetScreen />
    <AuthContext.Provider value={authContext}>
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
          ) : state.userToken == null || state.userToken === "signedout" ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: "Sign in",
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isSignout ? "pop" : "push",
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
                  animationTypeForReplace: state.isSignout ? "pop" : "push",
                }}
              />
              <Stack.Screen
                name="UserInfo"
                component={UserInfo}
                options={{
                  title: "Your Name",
                  // When logging out, a pop animation feels intuitive
                  animationTypeForReplace: state.isSignout ? "pop" : "push",
                }}
              />
              <Stack.Screen
                name="UserProp"
                component={UserProp}
                options={{
                  title: "Your Interests",
                  // When logging out, a pop animation feels intuitive
                  animationTypeForReplace: state.isSignout ? "pop" : "push",
                }}
              />
              <Stack.Screen
                name="UserPropFood"
                component={UserPropFood}
                options={{
                  title: "Food",
                  // When logging out, a pop animation feels intuitive
                  animationTypeForReplace: state.isSignout ? "pop" : "push",
                }}
              />
              <Stack.Screen
                name="TripInfo"
                component={TripInfo}
                options={{
                  title: "Your Trip",
                  // When logging out, a pop animation feels intuitive
                  animationTypeForReplace: state.isSignout ? "pop" : "push",
                }}
              />
              <Stack.Screen
                name="AllSet"
                component={AllSetScreen}
                options={{
                  title: "All Set!",
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
    </AuthContext.Provider>
  );
}
