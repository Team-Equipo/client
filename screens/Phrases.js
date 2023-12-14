// Phrases.js
import CollapsibleView from "@eliav2/react-native-collapsible-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
  UIManager,
  LayoutAnimation,
  Platform,
  Dimensions,
} from "react-native";
import {
  Text,
  Modal,
  Portal,
  Chip,
  withTheme,
  IconButton,
  PaperProvider,
} from "react-native-paper";

import HideKeyboard from "../components/HideKeyboard";
import PhraseCard from "../components/PhraseCard";
import TopicSearch from "../components/TopicSearch";
import WordSearchWebView from "../components/WordSearchWebView";
import {
  phraseStyles,
  shadows,
  phraseTheme,
  translateStyles,
} from "../styles/globalStyles";

const user = 1;

// Enable LayoutAnimation for Android
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/**
 * Represents the Phrases screen component.
 *
 * @param {object} navigation - The navigation object for navigating between screens.
 * @returns {JSX.Element} The Phrases screen component.
 */
const Phrases = ({ navigation }) => {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [topicsExpanded, setTopicsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [generatedPhrases, setGeneratedPhrases] = useState([]);
  const [searchedPhrases, setSearchedPhrases] = useState([]);
  const [searchedWord, setSearchedWord] = React.useState("");
  const [wordRefEndpoint, setWordRefEndpoint] = useState(
    "https://www.wordreference.com/es/en/translation.asp?spen=",
  );
  const [wordRefVisible, setWordRefVisible] = useState(false);
  const [displayedPhrases, setDisplayedPhrases] = useState([]);

  const windowDimensions = Dimensions.get("window");

  /**
   * Function to filter punctuation out of selected English word, pull up
   * dictionary modal for selected word
   *
   * @param {string} word - The word to be selected.
   * @param {string} inputLang - The input language.
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
    const filteredPhrases = generatedPhrases.filter(
      (phrase) => phrase.topic === topicLabel.trim(),
    );
    setDisplayedPhrases(filteredPhrases);
  };

  function handleTopicDeselect() {
    setTopicsExpanded(false);
    animateSearchBar();
    setSelectedTopic(null);
    setDisplayedPhrases([]);
  }

  // Update the state
  function toggleTopicsExpanded() {
    setTopicsExpanded(!topicsExpanded);
  }

  /**
   * Saves a phrase to AsyncStorage.
   * @param {Object} phrase - The phrase object to be saved.
   * @param {string} phrase.originaltext - The original text of the phrase.
   * @param {string} phrase.translation - The translation of the phrase.
   * @param {string} phrase.language - The language of the phrase.
   * @returns {Promise<void>} - A promise that resolves when the phrase is saved successfully.
   */
  const savePhrase = async (phrase) => {
    try {
      const currentPhrases =
        JSON.parse(
          await AsyncStorage.getItem("saved-phrases" + user.toString()),
        ) || {};

      // Check for duplicates based on original text
      if (!currentPhrases[phrase.originaltext]) {
        currentPhrases[phrase.originaltext] = phrase;
        await AsyncStorage.setItem(
          "saved-phrases" + user.toString(),
          JSON.stringify(currentPhrases),
        );

        // Signal that a storage change occurred by a simple bit flip
        // setStorageChange((prevStorageChange) => !prevStorageChange);
      }
    } catch (e) {
      console.log("Error", e);
    }
  };

  const renderItem = useCallback(
    ({ item }) => (
      <PhraseCard
        phrase={item}
        isLoading={isLoading}
        updateGeneratedPhrase={updateGeneratedPhrase}
        savePhrase={savePhrase}
        mode="browse"
        onSelectEnglishWord={selectEnglishWord}
        onSelectSpanishWord={selectSpanishWord}
      />
    ),
    [
      isLoading,
      updateGeneratedPhrase,
      savePhrase,
      selectEnglishWord,
      selectSpanishWord,
    ],
  );

  /* Hardcode a list of topics. */
  const topics = [
    "Ordering food",
    "Directions",
    "Shopping",
    "Greetings",
    "Goodbyes",
    "Pleasantries",
  ];
  // this function attempts to fetch data from a specific API endpoint related to user-generated phrases.
  // If successful, it updates the state variable generatedPhrases with the retrieved data.
  // If unsuccessful, it logs an error to the console. Finally, it sets the isLoading state variable to false.
  const fetchGeneratedPhrases = async () => {
    try {
      const response = await fetch(
        `https://jk249.azurewebsites.net/user/${user}/phrase`,
      );
      const json = await response.json();
      setGeneratedPhrases(json);
      console.log(json);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Fetches a specific phrase for a given userID and phraseID
   *
   * @param {string} userID - The ID of the user.
   * @param {string} phraseID - The ID of the phrase.
   * @param {number} index - The index of the phrase in the generated phrases list.
   * @returns {Promise<void>} - A promise that resolves when the fetch is complete.
   */
  const fetchPhrase = async (userID, phraseID, index) => {
    try {
      const response = await fetch(
        `https://jk249.azurewebsites.net/user/${userID}/phrase/${phraseID}`,
      );
      const json = await response.json();
      const updatedPhrases = [...generatedPhrases];
      updatedPhrases[index] = json;
      setGeneratedPhrases(updatedPhrases);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * manages the state of generated phrases, marking a specific phrase as loading
   * before potentially initiating an update request to the server.
   *
   * @param {string} userID - The ID of the user.
   * @param {string} phraseID - The ID of the phrase.
   * @returns {Promise<void>} - A promise that resolves when the update is complete.
   */
  const updateGeneratedPhrase = async (userID, phraseID) => {
    const updatedPhrases = [...generatedPhrases];
    const index = updatedPhrases.findIndex((phrase) => phrase.id === phraseID);
    updatedPhrases[index].isloading = true;
    setGeneratedPhrases(updatedPhrases);

    const data = {
      user_id: userID,
      phrase_id: phraseID,
    };

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch("https://llama.kenarnold.org/update_phrase", options)
      .then(() => fetchPhrase(userID, phraseID, index))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchGeneratedPhrases();
  }, []);

  const requestPhraseSearch = async (userID, topic) => {
    const data = {
      user_id: userID,
      topic,
    };

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const searchedPhrases = await fetch(
        "https://llama.kenarnold.org/topical_generation",
        options,
      );
      console.log("Phrases:", searchedPhrases);
      return searchedPhrases.json();
    } catch (error) {
      console.log(error);
    }
  };

  const searchTopic = async (topic) => {
    if (topic !== "") {
      console.log(topic);
      animateSearchBar();
      const topicLabel = topic.length % 5 === 0 ? " " + topic + " " : topic;
      setSelectedTopic(topicLabel);
      const searchResults = await requestPhraseSearch(user, topic);
      console.log(searchResults);
      setDisplayedPhrases(searchResults);
      // requestSearchedPhrases(user, text);
    }
  };

  return (
    <HideKeyboard>
      <PaperProvider theme={phraseTheme}>
        <View style={phraseStyles.background}>
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
            <View
              style={{
                flex: 1,
              }}
            >
              {/* Topic select dropdown */}
              <TopicSearch
                topicsExpanded={topicsExpanded}
                onFocus={() => setTopicsExpanded(true)}
                onBlur={() => setTopicsExpanded(false)}
                onEndEditing={(event) => searchTopic(event.nativeEvent.text)}
                selectedTopic={selectedTopic}
                handleTopicDeselect={handleTopicDeselect}
                handleTopicSelect={handleTopicSelect}
                topics={
                  generatedPhrases
                    ? [...new Set(generatedPhrases.map((item) => item.topic))]
                    : []
                }
                navigation={navigation}
              />
              {selectedTopic == null ? (
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins-Regular",
                      fontSize: 18,
                      textAlign: "center",
                      color: "gray",
                      width: "100%",
                    }}
                  >
                    Search for a topic to get started!
                  </Text>
                </View>
              ) : null}
              {/* The list of PhraseCards */}
              <FlatList
                style={{ marginTop: 8 }}
                contentContainerStyle={{
                  alignItems: "center",
                  paddingBottom: 1,
                }}
                data={displayedPhrases}
                renderItem={renderItem}
              />
            </View>
          </SafeAreaView>
        </View>
      </PaperProvider>
    </HideKeyboard>
  );
};

export default withTheme(Phrases);
