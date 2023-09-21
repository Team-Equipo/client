import { PaperProvider } from "react-native-paper";
import Main from "./src/Main";
import React from "react";
import MyFirstScreen from "./LoginRegister"; // Import your first screen component
/**
 * Renders the main component of the application.
 *
 * @return {JSX.Element} The rendered main component.
 */
export default function App() {
  return (
    <PaperProvider theme={{ version: 3 }}>
      <MyFirstScreen /> {/* Render MyFirstScreen as the initial screen */}
    </PaperProvider>
  );
}
