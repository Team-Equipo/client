import { getHeaderTitle } from "@react-navigation/elements";
import * as React from "react";
import { Appbar, PaperProvider } from "react-native-paper";

import { signinTheme } from "../styles/globalStyles";

export default function AppBar({ navigation, route, options, back }) {
  const title = getHeaderTitle(options, route.name);

  if (route.name === "Home") {
    return (
      <Appbar.Header
        style={{
          backgroundColor: signinTheme.colors.primary,
          marginTop: 5,
          height: 35,
        }}
      >
        <Appbar.Action
          icon="menu"
          size={33}
          color="white"
          onPress={() => alert("Drawer Menu should show up")}
        />
        <Appbar.Content
          title="Lingucidity"
          style={{ alignItems: "center" }}
          color="white"
        />
        <Appbar.Action
          icon="account-circle"
          color="white"
          size={37}
          onPress={() => alert("User profile")}
        />
      </Appbar.Header>
    );
  } else if (route.name === "SignIn") {
    return null; // hide the header
  } else {
    return (
      <PaperProvider theme={signinTheme}>
        <Appbar.Header>
          {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
          <Appbar.Content
            title={title}
            color="white"
            style={{ alignItems: "center" }}
          />
        </Appbar.Header>
      </PaperProvider>
    );
  }
}
