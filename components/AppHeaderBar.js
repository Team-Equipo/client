// AppHeaderBar.js
import { getHeaderTitle } from "@react-navigation/elements";
import { Appbar, PaperProvider } from "react-native-paper";

import { appHeaderBarStyles, signinTheme } from "../styles/globalStyles";

/**
 * Renders the registration bar component.
 * @param {object} navigation - The navigation object.
 * @param {object} route - The route object.
 * @param {object} options - The options object.
 * @param {boolean} back - Indicates whether to show the back button.
 * @returns {JSX.Element} The rendered registration bar component.
 */
export default function RegistrationBar({ navigation, route, options, back }) {
  const title = getHeaderTitle(options, route.name);
  return (
    <PaperProvider theme={signinTheme}>
      <Appbar.Header style={appHeaderBarStyles.appbar}>
        {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
        <Appbar.Content
          title={title}
          color="white"
          titleStyle={appHeaderBarStyles.title}
          theme={signinTheme}
        />
      </Appbar.Header>
    </PaperProvider>
  );
}
