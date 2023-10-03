import { PaperProvider } from "react-native-paper";

import Translation from "./src/Translation";

/**
 * Renders the main component of the application.
 *
 * @return {JSX.Element} The rendered main component.
 */
export default function App() {
  return (
    // Use Material 3 theme.
    <PaperProvider theme={{ version: 3 }}>
      <Translation />
    </PaperProvider>
  );
}
