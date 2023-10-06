import * as React from "react";
import { Appbar, Menu } from "react-native-paper";

const MyComponent = () => (
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

export default MyComponent;
