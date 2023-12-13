import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import logo from "../assets/splashlogo.png";
export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
    </View>
  );
}

/**
 * Styles for the SplashScreen component.
 *
 * @typedef {Object} Styles
 * @property {Object} container - The style for the container.
 * @property {Object} image - The style for the image.
 * @property {Object} text - The style for the text.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: "5%",
  },
  text: {
    marginTop: 10,
    fontSize: 20,
  },
});
