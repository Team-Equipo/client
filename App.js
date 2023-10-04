import { PaperProvider } from "react-native-paper";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import Main from "./screens/Main";
import UserInfo from "./screens/UserInfo";
import TripInfo from "./screens/TripInfo";
import AppHeaderBar from "./screens/AppHeaderBar";

const Stack = createNativeStackNavigator();

/**
 * Renders the main component of the application.
 *
 * @return {JSX.Element} The rendered main component.
 */
export default function App() {
  return (
    <PaperProvider theme={{ version: 3 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="UserInfo"
          screenOptions={{
            header: (props) => <RegistrationBar {...props} />,
          }}
        >
          <Stack.Screen
            name="UserInfo"
            component={UserInfo}
            options={{ title: "Your Profile" }}
          />
          <Stack.Screen
            name="TripInfo"
            component={TripInfo}
            options={{ title: "Your Trip" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
