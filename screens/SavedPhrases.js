// SavedPhrases.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useCallback } from "react";
import { FlatList, View, SafeAreaView } from "react-native";
import { withTheme, Modal, Portal, PaperProvider } from "react-native-paper";

import PhraseCard from "../components/PhraseCard";
import WordSearchWebView from "../components/WordSearchWebView";
import { usePhraseStorageTracker } from "../contexts/PhraseStorageTracker";
import {
  savedPhrases,
  translateStyles,
  phraseTheme,
} from "../styles/globalStyles";

const SavedPhrases = ({ navigation }) => {
  const { storageChange, setStorageChange } = usePhraseStorageTracker();
  const [phraseData, setPhraseData] = useState([]);
  const [searchedWord, setSearchedWord] = React.useState("");
  const [wordRefEndpoint, setWordRefEndpoint] = useState(
    "https://www.wordreference.com/es/en/translation.asp?spen=",
  );
  const [wordRefVisible, setWordRefVisible] = useState(false);

  // Function to filter punctuation out of selected English word, pull up
  // dictionary modal for selected word
  const selectEnglishWord = (word, inputLang) => {
    setSearchedWord(word.replace(/[¡!"#$%&'()*+,-./:;<=>¿?@[\]^_`{|}~]/g, ""));
    setWordRefEndpoint(
      "https://www.wordreference.com/es/translation.asp?tranword=",
    );
    setWordRefVisible(true);
  };

  // Function to filter punctuation out of selected Spanish word, pull up
  // dictionary modal for selected word
  const selectSpanishWord = (word, inputLang) => {
    setSearchedWord(word.replace(/[¡!"#$%&'()*+,-./:;<=>¿?@[\]^_`{|}~]/g, ""));
    setWordRefEndpoint(
      "https://www.wordreference.com/es/en/translation.asp?spen=",
    );
    setWordRefVisible(true);
  };

  useEffect(() => {
    loadSavedPhrases();
  }, [storageChange]);

  // Delete given phrase object from storage
  // Reload list of phrases to use every time the async-stored list of phrases
  // is changed
  const deletePhrase = async (phrase) => {
    let updatedPhrases;
    try {
      // Retrieve currently stored phrases as object for processing
      let currentPhrases = JSON.parse(
        await AsyncStorage.getItem("saved-phrases"),
      );
      // Initialize stored phrases as empty object if none exist
      if (currentPhrases == null) {
        currentPhrases = [];
      }
      // Conditional to check for identical phrase taken from:
      // https://stackoverflow.com/a/8217584
      // Filter currentPhrases to only contain phrases that return true for
      // the given function, which checks that the text of the passed
      // currentPhrase does not match the text of the phrase to be deleted.
      updatedPhrases = currentPhrases.filter(
        (currentPhrase) => currentPhrase.text_original !== phrase.text_original,
      );
    } catch (e) {
      console.log("Error", e);
    }
    try {
      // Put updatedPhrases back into JSON for async storage
      await AsyncStorage.setItem(
        "saved-phrases",
        JSON.stringify(updatedPhrases),
      );
      // Signal that a storage change occurred by a simple bit flip
      setStorageChange((prevStorageChange) => !prevStorageChange);
    } catch (e) {
      console.log("Error", e);
    }
  };

  // Update phraseData (rendered as PhraseCards) to the latest phrases in
  // storage
  const loadSavedPhrases = async () => {
    try {
      const latestPhrases = await AsyncStorage.getItem("saved-phrases");
      setPhraseData(JSON.parse(latestPhrases));
      // console.log("Re-rendered saved PhraseCards");
    } catch (e) {
      console.log("Error", e);
    }
  };

  // How to render each phrase as a PhraseCard
  const renderItem = useCallback(
    ({ item }) => (
      <PhraseCard
        phrase={item}
        deletePhrase={deletePhrase}
        mode="saved"
        onSelectEnglishWord={selectEnglishWord}
        onSelectSpanishWord={selectSpanishWord}
      />
    ),
    [],
  );

  return (
    <PaperProvider theme={phraseTheme}>
      <View style={savedPhrases.background}>
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
                rowGap: 8,
                paddingTop: 8,
              }}
              data={phraseData}
              renderItem={renderItem}
            />
          </View>
        </SafeAreaView>
      </View>
    </PaperProvider>
  );
};

export default withTheme(SavedPhrases);
