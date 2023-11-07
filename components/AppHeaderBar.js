import { getHeaderTitle } from "@react-navigation/elements";
import { Appbar, PaperProvider } from "react-native-paper";

import { appHeaderBarStyles, signinTheme } from "../styles/globalStyles";

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
