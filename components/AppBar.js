import { getHeaderTitle } from "@react-navigation/elements";
import * as React from "react";
import { Appbar, useTheme } from "react-native-paper";

export default function AppBar({ navigation, route, options, back }) {
  const title = getHeaderTitle(options, route.name);
  const theme = useTheme();

  if (route.name === "Home") {
    return (
      <Appbar.Header
        style={{
          backgroundColor: theme.colors.primary,
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
  } else {
    return (
      <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
        {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
        <Appbar.Content title={title} color="white" />
      </Appbar.Header>
    );
  }
}
