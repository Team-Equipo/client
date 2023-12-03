// SavedPhrases.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  SafeAreaView,
  UIManager,
  Platform,
  LayoutAnimation,
  FlatList,
} from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { withTheme, Modal, Portal, PaperProvider } from "react-native-paper";

import PhraseCard from "../components/PhraseCard";
import TopicSearch from "../components/TopicSearch";
import WordSearchWebView from "../components/WordSearchWebView";
import { usePhraseStorageTracker } from "../contexts/PhraseStorageTracker";
import {
  savedPhrases,
  translateStyles,
  phraseTheme,
} from "../styles/globalStyles";

// Enable LayoutAnimation for Android
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SavedPhrases = ({ navigation }) => {
  const { storageChange, setStorageChange } = usePhraseStorageTracker();
  const [phraseData, setPhraseData] = useState([]);
  const [searchedWord, setSearchedWord] = React.useState("");
  const [wordRefEndpoint, setWordRefEndpoint] = useState(
    "https://www.wordreference.com/es/en/translation.asp?spen=",
  );
  const [wordRefVisible, setWordRefVisible] = useState(false);
  const [typedTopic, setTypedTopic] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [topicsExpanded, setTopicsExpanded] = useState(false);
  const [displayedPhrases, setDisplayedPhrases] = useState([]);

  const topics = [
    { text: "Ordering food", id: 1 },
    { text: "Directions", id: 2 },
    { text: "Shopping", id: 3 },
    { text: "Greetings", id: 4 },
    { text: "Goodbyes", id: 5 },
    { text: "Pleasantries", id: 6 },
  ];

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

  useEffect(() => {
    const filteredPhrases = selectedTopic
      ? phraseData.filter((item) => item.topic.trim() === selectedTopic.trim())
      : phraseData;

    setDisplayedPhrases(filteredPhrases);
  }, [phraseData, selectedTopic]);

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
    [],
  );

  function animateSearchBar() {
    // Define the animation configuration
    const config = LayoutAnimation.create(
      300, // duration in milliseconds
      LayoutAnimation.Types.easeInEaseOut,
      LayoutAnimation.Properties.opacity,
    );

    // Trigger the layout animation
    LayoutAnimation.configureNext(config);
  }

  const handleTopicSelect = (item) => {
    animateSearchBar();
    setTopicsExpanded(false);
    const topicLabel = item.length % 5 === 0 ? " " + item + " " : item;
    setSelectedTopic(topicLabel);

    // Filter phrases based on the selectedTopic
    const filteredPhrases = phraseData.filter(
      (phrase) => phrase.topic === topicLabel,
    );
    setDisplayedPhrases(filteredPhrases);
  };

  function handleTopicDeselect() {
    setTopicsExpanded(false);
    animateSearchBar();
    setSelectedTopic("");
    setDisplayedPhrases(phraseData);
  }

  function toggleTopicsExpanded() {
    setTopicsExpanded((prevTopicsExpanded) => !prevTopicsExpanded);
  }

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
            style={{
              flex: 1,
            }}
          >
            <TopicSearch
              topicsExpanded={topicsExpanded}
              onPress={toggleTopicsExpanded}
              typedTopic={typedTopic}
              onChangeText={(text) => setTypedTopic(text)}
              onClear={() => setTypedTopic("")}
              selectedTopic={selectedTopic}
              handleTopicDeselect={handleTopicDeselect}
              handleTopicSelect={handleTopicSelect}
              textInputEnabled={false}
              topics={
                phraseData
                  ? [...new Set(phraseData.map((item) => item.topic))]
                  : []
              }
              navigation={navigation}
            />
            <FlatList
              style={{ marginTop: 8 }}
              contentContainerStyle={{
                alignItems: "center",
                paddingBottom: 1,
              }}
              data={displayedPhrases}
              renderItem={renderItem}
              keyExtractor={(item, index) => `phrase-${index}`}
            />
          </View>
        </SafeAreaView>
      </GestureHandlerRootView>
    </PaperProvider>
  );
};

export default withTheme(SavedPhrases);
