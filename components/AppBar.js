// AppBar.js
import { getHeaderTitle } from "@react-navigation/elements";
import React, { useState, useContext } from "react";
import { useWindowDimensions } from "react-native";
import { Appbar, Menu, IconButton } from "react-native-paper";

import { AuthContext } from "../contexts/AuthContext";
import { headerTheme } from "../styles/globalStyles";

/**
 * Renders the AppBar component.
 *
 * @param {object} navigation - The navigation object.
 * @param {object} route - The route object.
 * @param {object} options - The options object.
 * @param {boolean} back - Indicates whether to show the back button.
 * @returns {JSX.Element} The rendered AppBar component.
 */
export default function AppBar({ navigation, route, options, back }) {
  const windowDimensions = useWindowDimensions();
  const { signOut } = useContext(AuthContext);
  const title = getHeaderTitle(options, route.name);
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  /**
   * Handles the menu press event.
   * @param {string} action - The action to be performed.
   * @returns {void}
   */
  const handleMenuPress = (action) => {
    closeMenu();
    switch (action) {
      case "editProfile":
        navigation.navigate("SettingsPage");
        break;
      case "signOut":
        signOut();
    }
  };

  if (route.name === "Home") {
    return (
      <Appbar.Header
        style={{
          backgroundColor: headerTheme.colors.primary,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Appbar.Action
          icon="help-circle-outline"
          color="white"
          size={35}
          style={{ margin: 0 }}
          onPress={() => navigation.navigate("Help")}
        />
        <Appbar.Content
          title="Lingucidity"
          style={{ alignItems: "center", flexGrow: 1, fontSize: 20 }}
          titleStyle={{ fontSize: 20, color: "white" }}
          color="white"
        />

        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          dismissable
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
  } else if (route.name === "EmergencyPhrases") {
    return (
      <Appbar.Header
        style={{
          backgroundColor: headerTheme.colors.primary,
        }}
      >
        {back ? (
          <Appbar.BackAction color="white" onPress={navigation.goBack} />
        ) : null}
        <Appbar.Content
          title={title}
          color="white"
          titleStyle={{ fontSize: 19, color: "white" }}
          style={{
            position: "absolute",
            alignItems: "center",
            width: windowDimensions.width,
          }}
        />
      </Appbar.Header>
    );
  } else if (route.name === "SignIn") {
    return null; // hide the header
  } else {
    return (
      <>
        {back ? (
          <IconButton
            style={{
              position: "absolute",
              top: 20,
              left: 0,
              right: 0,
              zIndex: 1,
            }}
            icon="chevron-left"
            iconColor="black"
            size={40}
            onPress={navigation.goBack}
          />
        ) : null}
      </>
    );
  }
}
