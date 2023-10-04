import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import Translation from "./screens/Translation";
import AppHeaderBar from "./screens/AppHeaderBar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

/**
 * Renders the main component of the application.
 *
 * @return {JSX.Element} The rendered main component.
 */
export default function App() {
  return (
    // Use Material 3 theme.
    <PaperProvider theme={{ version: 3 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Translation"
          screenOptions={{
            header: (props) => <AppHeaderBar {...props} />,
          }}
        >
          <Stack.Screen
            name="Translation"
            component={Translation}
            options={{ title: "Translation" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
