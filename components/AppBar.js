import { getHeaderTitle } from "@react-navigation/elements";
import React, { useState, useContext } from "react";
import { Appbar, Menu, IconButton } from "react-native-paper";

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
          // marginTop: 5,
          // marginBottom: 15,
          // height: 35,
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
          backgroundColor: signinTheme.colors.primary,
          // marginTop: 5,
          // marginBottom: 15,
          // height: 35,
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
  } else if (route.name === "SignIn") {
    return null; // hide the header
  } else {
    return (
      <>
        {back ? (
          <IconButton
            style={{
              position: "absolute",
              top: 10,
              left: 0,
              right: 0,
              zIndex: 1,
            }}
            icon="chevron-left"
            iconColor="black"
            size={30}
            onPress={navigation.goBack}
          />
        ) : null}
      </>

      // <Appbar.Header
      //   style={{ backgroundColor: "transparent", position: "absolute", top: 0, left: 0, right: 0, zIndex: 1 }}
      // >
      //   {back ? (
      //     <Appbar.BackAction color="black" onPress={navigation.goBack} />
      //   ) : null}
      // </Appbar.Header>
    );
  }
}
