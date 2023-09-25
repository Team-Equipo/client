import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { PaperProvider } from "react-native-paper";
import React from "react";
import { View } from "react-native";
import Registration from "./src/Registration";

/**
 * Renders the main component of the application.
 *
 * @return {JSX.Element} The rendered main component.
 */
export default function App() {
  return (
    <PaperProvider theme={{ version: 3 }}>
      <Main />
    </PaperProvider>
  );
}
