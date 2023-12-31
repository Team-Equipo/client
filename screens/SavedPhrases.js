// SavedPhrases.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  Platform,
  UIManager,
  LayoutAnimation,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { withTheme, Modal, Portal, PaperProvider } from "react-native-paper";

import PhraseCard from "../components/PhraseCard";
import TopicSearch from "../components/TopicSearch";
import WordSearchWebView from "../components/WordSearchWebView";
import {
  savedPhrases,
  translateStyles,
  phraseTheme,
} from "../styles/globalStyles";

const user = 1;

// Enable LayoutAnimation for Android
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SavedPhrases = ({ navigation }) => {
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

  // Temporary hard-coded topics
  const topics = [
    { text: "Ordering food", id: 1 },
    { text: "Directions", id: 2 },
    { text: "Shopping", id: 3 },
    { text: "Greetings", id: 4 },
    { text: "Goodbyes", id: 5 },
    { text: "Pleasantries", id: 6 },
  ];

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
   */
  const selectSpanishWord = (word, inputLang) => {
    setSearchedWord(word.replace(/[¡!"#$%&'()*+,-./:;<=>¿?@[\]^_`{|}~]/g, ""));
    setWordRefEndpoint(
      "https://www.wordreference.com/es/en/translation.asp?spen=",
    );
    setWordRefVisible(true);
  };

  // Load saved phrases when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadSavedPhrases();
    }, []),
  );

  // Filtered phrases based on the selected topic.
  useEffect(() => {
    const filteredPhrases = selectedTopic
      ? phraseData.filter((item) => item.topic.trim() === selectedTopic.trim())
      : phraseData;

    setDisplayedPhrases(filteredPhrases);
  }, [phraseData, selectedTopic]);

  /**
   * Deletes a phrase from the saved phrases.
   * @param {Object} phrase - The phrase to be deleted.
   * @returns {Promise<void>} - A promise that resolves when the phrase is deleted.
   */
  const deletePhrase = async (phrase) => {
    try {
      const currentPhrases =
        JSON.parse(
          await AsyncStorage.getItem("saved-phrases" + user.toString()),
        ) || {};

      // Delete the phrase using its original text as the key
      delete currentPhrases[phrase.originaltext];

      setPhraseData(Object.values(currentPhrases));
      await AsyncStorage.setItem(
        "saved-phrases" + user.toString(),
        JSON.stringify(currentPhrases),
      );

      // Signal that storage change has occurred by asimple bit flip
      // setStorageChange((prevStorageChange) => !prevStorageChange);
    } catch (e) {
      console.log("Error", e);
    }
  };

  // Update phraseData (rendered as PhraseCards) to the latest phrases in storage
  const loadSavedPhrases = async () => {
    try {
      const latestPhrases = await AsyncStorage.getItem(
        "saved-phrases" + user.toString(),
      );
      setPhraseData(Object.values(JSON.parse(latestPhrases) || {}));
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
    [phraseData],
  );

  // Animate the TopicSearch component
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

  // Handle the selection of a topic
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

  // Handle the deselection of a topic
  function handleTopicDeselect() {
    setTopicsExpanded(false);
    animateSearchBar();
    setSelectedTopic("");
    setDisplayedPhrases(phraseData);
  }

  // Toggle the expansion of the TopicSearch component
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
