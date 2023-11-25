import { getHeaderTitle } from "@react-navigation/elements";
import * as React from "react";
import { Appbar } from "react-native-paper";

import { signinTheme } from "../styles/globalStyles";

export default function AppBar({ navigation, route, options, back }) {
  const title = getHeaderTitle(options, route.name);

  if (route.name === "Home") {
    return (
      <Appbar.Header
        style={{
          backgroundColor: signinTheme.colors.primary,
          marginTop: 5,
          marginBottom: 15,
          height: 35,
        }}
      >
        <Appbar.Action
          icon="chat-alert"
          color="firebrick"
          size={33}
          onPress={() => navigation.navigate("EmergencyPhrases")}
        />
        <Appbar.Content
          title="Lingucidity"
          style={{ alignItems: "center" }}
          color="white"
        />
        <Appbar.Action
          icon="account"
          style={{ borderWidth: 1, borderColor: "darkgray" }}
          containerColor="white"
          color="darkgray"
          size={20}
          onPress={() => alert("User profile")}
        />
      </Appbar.Header>
    );
  } else if (route.name === "SignIn") {
    return null; // hide the header
  } else {
    return (
      <Appbar.Header
        style={{
          backgroundColor: signinTheme.colors.primary,
          marginTop: 5,
          marginBottom: 15,
          height: 35,
        }}
      >
        {back ? (
          <Appbar.BackAction color="white" onPress={navigation.goBack} />
        ) : null}
        <Appbar.Content
          title={title}
          color="white"
          style={{ alignItems: "center" }}
        />
      </Appbar.Header>
    );
  }
}
