import { PaperProvider } from "react-native-paper";
import React from "react";
import { View } from "react-native";
import SignIn from "./src/SignIn"; // Import the SignIn component
import Main from "./src/Main";

/**
 * Renders the main component of the application.
 *
 * @return {JSX.Element} The rendered main component.
 */
export default function App() {
  return (
    <PaperProvider theme={{ version: 3 }}>
      <SignIn />
    </PaperProvider>
  );
}
