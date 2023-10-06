import { getHeaderTitle } from "@react-navigation/elements";
import * as React from "react";
import { Appbar, Menu } from "react-native-paper";

export default function AppBar({ route, options }) {
  const title = getHeaderTitle(options, route.name);

  if (route.name === "Home") {
    return (
      <Appbar.Header style={{ backgroundColor: "#824f8d" }}>
        <Appbar.Action
          icon="menu"
          size={33}
          color="white"
          onPress={() => alert("Drawer Menu should show up")}
        />
        <Appbar.Content
          title="Linguicidity"
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
      <Appbar.Header style={{ backgroundColor: "#824f8d" }}>
        <Appbar.Content title={title} />
      </Appbar.Header>
    );
  }
}
