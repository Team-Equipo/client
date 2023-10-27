// Activities.js
import React, { useEffect } from "react";
import { TextInput, StyleSheet, View, SafeAreaView } from "react-native";
import { Button, withTheme, Text } from "react-native-paper";

const Translation = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={{ height: "100%" }} paddingRight="0.5%" paddingLeft="0.5%">
        <Text>Activities Screen</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textBox: {
    flex: 1,
    borderWidth: 2,
    borderColor: "lightgray",
    borderRadius: 10,
    padding: "1%",
    marginLeft: "1%",
    marginRight: "1%",
    marginBottom: "1%",
    fontSize: 16,
  },
  languageLabel: {
    paddingTop: "1%",
    paddingLeft: "2%",
    fontSize: 20,
    color: "gray",
  },
});

export default withTheme(Translation);
