import { PaperProvider } from "react-native-paper";
import React from "react";
import { View } from "react-native";
import SignIn from "./SignIn"; // Import the SignIn component

import Main from "./src/Main";

/**
 * Renders the main component of the application.
 *
 * @return {JSX.Element} The rendered main component.
 */
export default function App() {
  return (
    // Use Material 3 theme.
    <PaperProvider theme={{ version: 3 }}>
      <Main />
      <SignIn /> {/* Render the SignIn component */}
    </PaperProvider>
  );
}
