import { getHeaderTitle } from "@react-navigation/elements";
import React, { useState, useContext } from "react";
import { Appbar, Menu } from "react-native-paper";

import { AuthContext } from "../contexts/AuthContext";
import { signinTheme } from "../styles/globalStyles";

export default function AppBar({ navigation, route, options, back }) {
  const { signOut } = useContext(AuthContext);
  const title = getHeaderTitle(options, route.name);
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleMenuPress = (action) => {
    closeMenu();
    switch (action) {
      case "editProfile":
        // Handle "Edit Profile" action
        alert("Edit Profile");
        break;
      case "signOut":
        signOut();
    }
  };

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
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          style={{ borderRadius: 50 }}
          anchor={
            <Appbar.Action
              icon="account"
              style={{ borderWidth: 1, borderColor: "darkgray" }}
              containerColor="white"
              color="darkgray"
              size={20}
              onPress={openMenu}
            />
          }
          anchorPosition="bottom"
        >
          <Menu.Item
            trailingIcon="account-edit" // Edit icon
            onPress={() => handleMenuPress("editProfile")}
            title="Edit Profile"
          />
          <Menu.Item
            trailingIcon="logout" // Sign out icon
            onPress={() => handleMenuPress("signOut")}
            title="Sign Out"
          />
        </Menu>
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
