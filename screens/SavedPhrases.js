// SavedPhrases.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { withTheme, Modal, Portal, PaperProvider } from "react-native-paper";

import PhraseCard from "../components/PhraseCard";
import WordSearchWebView from "../components/WordSearchWebView";
import {
  savedPhrases,
  translateStyles,
  phraseTheme,
} from "../styles/globalStyles";

/**
 * Component for displaying and managing saved phrases.
 *
 * @param {object} navigation - The navigation object.
 * @returns {JSX.Element} The SavedPhrases component.
 */
const SavedPhrases = ({ navigation }) => {
  const [phraseData, setPhraseData] = useState({});
  const [searchedWord, setSearchedWord] = React.useState("");
  const [wordRefEndpoint, setWordRefEndpoint] = useState(
    "https://www.wordreference.com/es/en/translation.asp?spen=",
  );
  const [wordRefVisible, setWordRefVisible] = useState(false);

  /**
   * Function to filter punctuation out of selected English word, pull up
   * dictionary modal for selected word
   *
   * @param {string} word - The selected word.
   * @param {string} inputLang - The input language.
   * @returns {void}
   */
  const selectEnglishWord = (word, inputLang) => {
    setSearchedWord(word.replace(/[¡!"#$%&'()*+,-./:;<=>¿?@[\]^_`{|}~]/g, ""));
    setWordRefEndpoint(
      "https://www.wordreference.com/es/translation.asp?tranword=",
    );
    setWordRefVisible(true);
  };

  /**
   * Function to filter punctuation out of selected Spanish word, pull up
   * dictionary modal for selected word
   *
   * @param {string} word - The word to be selected.
   * @param {string} inputLang - The input language.
   * @returns {void}
   */
  const selectSpanishWord = (word, inputLang) => {
    setSearchedWord(word.replace(/[¡!"#$%&'()*+,-./:;<=>¿?@[\]^_`{|}~]/g, ""));
    setWordRefEndpoint(
      "https://www.wordreference.com/es/en/translation.asp?spen=",
    );
    setWordRefVisible(true);
  };

  useFocusEffect(
    React.useCallback(() => {
      // Load saved phrases when the screen comes into focus
      loadSavedPhrases();
    }, []),
  );

  /**
   * Deletes a phrase from the saved phrases.
   * @param {Object} phrase - The phrase to be deleted.
   * @returns {Promise<void>} - A promise that resolves when the phrase is deleted.
   */
  const deletePhrase = async (phrase) => {
    try {
      const currentPhrases =
        JSON.parse(await AsyncStorage.getItem("saved-phrases")) || {};

      // Delete the phrase using its original text as the key
      delete currentPhrases[phrase.originaltext];

      setPhraseData(Object.values(currentPhrases));
      await AsyncStorage.setItem(
        "saved-phrases",
        JSON.stringify(currentPhrases),
      );

      // Signal that storage change has occurred by asimple bit flip
      // setStorageChange((prevStorageChange) => !prevStorageChange);
    } catch (e) {
      console.log("Error", e);
    }
  };

  // Update phraseData (rendered as PhraseCards) to the latest phrases in
  // storage
  const loadSavedPhrases = async () => {
    try {
      const latestPhrases = await AsyncStorage.getItem("saved-phrases");
      setPhraseData(Object.values(JSON.parse(latestPhrases) || {}));
    } catch (e) {
      console.log("Error", e);
    }
  };

  /**
   * Update render data order and async-stored order
   * @param {Array} data - The updated phrase data after the drag end event.
   * @returns {Promise<void>} - A promise that resolves when the state and async storage are updated.
   */
  const onDragEnd = async (data) => {
    try {
      // Update the state to re-render the component
      setPhraseData(data);
      // Update the order of phrases in async storage
      await AsyncStorage.setItem("saved-phrases", JSON.stringify(data));
    } catch (e) {
      console.log("Error updating order", e);
    }
  };

  // How to render each phrase as a PhraseCard
  const renderItem = useCallback(
    ({ item, drag }) => (
      <PhraseCard
        phrase={item}
        deletePhrase={deletePhrase}
        mode="saved"
        onSelectEnglishWord={selectEnglishWord}
        onSelectSpanishWord={selectSpanishWord}
        drag={drag}
      />
    ),
    [phraseData],
  );

  return (
    <PaperProvider theme={phraseTheme}>
      <GestureHandlerRootView style={savedPhrases.background}>
        <SafeAreaView style={{ flexDirection: "column", flex: 1 }}>
          <Portal>
            {/* Wordreference popup */}
            <Modal
              visible={wordRefVisible}
              onDismiss={() => setWordRefVisible(false)}
              contentContainerStyle={translateStyles.modalContainer}
            >
              <WordSearchWebView
                endpoint={wordRefEndpoint}
                searchedWord={searchedWord}
              />
            </Modal>
          </Portal>

          {/* The list of PhraseCards */}
          <View
            style={{ height: "100%" }}
            paddingRight="0.5%"
            paddingLeft="0.5%"
          >
            <FlatList
              contentContainerStyle={{
                alignItems: "center",
                marginBottom: 8,
              }}
              data={phraseData}
              renderItem={renderItem}
            />
          </View>
        </SafeAreaView>
      </GestureHandlerRootView>
    </PaperProvider>
  );
};

export default withTheme(SavedPhrases);
