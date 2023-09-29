import { PaperProvider } from "react-native-paper";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import Main from "./src/Main";
import UserInfo from "./src/UserInfo";
import TripInfo from "./src/TripInfo";
import RegistrationBar from "./src/AppHeaderBar";

const Stack = createNativeStackNavigator();

/**
 * Renders the main component of the application.
 *
 * @return {JSX.Element} The rendered main component.
 */
export default function App() {
  return (
    <PaperProvider theme={{ version: 3 }}>
      <Registration />
    </PaperProvider>
  );
}
