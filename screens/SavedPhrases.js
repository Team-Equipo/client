// SavedPhrases.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import { Button, withTheme, Text } from "react-native-paper";
import PhraseCard from "../components/PhraseCard";

import { savedPhrases } from "../styles/globalStyles";

const SavedPhrases = ({ navigation }) => {
  const [phraseData, setPhraseData] = useState([]);
  const [selectedPhrase, setSelectedPhrase] = useState();
  const [selectedPhraseText, setSelectedPhraseText] = useState("");
  const [translation, setTranslation] = useState("");

  function selectPhrase(item) {
    setSelectedPhrase(item);
    setSelectedPhraseText(item.text_original);
    setTranslation(item.text_translated);
  }

  const deletePhrase = async (item) => {
    try {
      var currentPhrases = JSON.parse(
        await AsyncStorage.getItem("saved-phrases"),
      );
      if (currentPhrases == null) {
        currentPhrases = [];
      }
      // conditional to check for identical phrase taken from:
      // https://stackoverflow.com/a/8217584
      updatedPhrases = currentPhrases.filter(
        (existing) => existing.text_original !== item.text_original,
      );
    } catch (e) {
      console.log("Error", e);
    }
    try {
      await AsyncStorage.setItem(
        "saved-phrases",
        JSON.stringify(updatedPhrases),
      );
    } catch (e) {
      console.log("Error", e);
    }
  };

  const loadSavedPhrases = async () => {
    try {
      setPhraseData(JSON.parse(await AsyncStorage.getItem("saved-phrases")));
    } catch (e) {
      console.log("Error", e);
    }
  };

  useEffect(() => {
    loadSavedPhrases();
  }, [AsyncStorage.getItem("saved-phrases")]);

  return (
    <View style={savedPhrases.background}>
      <SafeAreaView>
        <View style={{ height: "100%" }} paddingRight="0.5%" paddingLeft="0.5%">
          <FlatList
            contentContainerStyle={{
              alignItems: "center",
              rowGap: 8,
              paddingTop: 8,
            }}
            data={phraseData}
            renderItem={({ item }) => (
              <PhraseCard
                phrase={item}
                deletePhrase={deletePhrase}
                mode={"saved"}
              />
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default withTheme(SavedPhrases);
