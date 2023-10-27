// SavedPhrases.js
import React, { useEffect } from "react";
import { TextInput, StyleSheet, View, SafeAreaView } from "react-native";
import { Button, withTheme, Text } from "react-native-paper";

const SavedPhrases = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={{ height: "100%" }} paddingRight="0.5%" paddingLeft="0.5%">
        <Text>Saved Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default withTheme(SavedPhrases);
