// SavedPhrases.js
import React, { useState, useEffect } from "react";
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  View,
  SafeAreaView,
} from "react-native";
import { Button, withTheme, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SavedPhrases = ({ navigation }) => {
  const [phraseData, setPhraseData] = useState([]);
  const loadSavedPhrases = async () => {
    try {
      const jsonData = await AsyncStorage.getItem("saved-phrases");
      setPhraseData(JSON.parse(await AsyncStorage.getItem("saved-phrases")));
    } catch (e) {
      console.log("Error", e);
    }
  };
  useEffect(() => {
    loadSavedPhrases();
  }, [AsyncStorage.getItem("saved-phrases")]);
  return (
    <SafeAreaView>
      <View style={{ height: "100%" }} paddingRight="0.5%" paddingLeft="0.5%">
        <Text>Saved Screen</Text>
        <FlatList
          data={phraseData}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {}}>
              <Text>{item.text}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default withTheme(SavedPhrases);
