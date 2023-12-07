import React, { useEffect, useContext } from "react";
import { LogBox, View, Text } from "react-native";
import { PaperProvider } from "react-native-paper";

import AuthSwitcher from "./components/AuthSwitcher";
import { AuthProvider, useAuthContext } from "./contexts/AuthContext";
import { RegistrationProvider } from "./contexts/RegistrationContext";

LogBox.ignoreAllLogs();

export default function App({ navigation }) {
  return (
    <AuthProvider>
      <RegistrationProvider>
        <PaperProvider>
          <AuthSwitcher />
        </PaperProvider>
      </RegistrationProvider>
    </AuthProvider>
  );
}
