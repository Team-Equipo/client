// Phrases.js
import CollapsibleView from "@eliav2/react-native-collapsible-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
  Text,
  UIManager,
  LayoutAnimation,
  Platform,
  Dimensions,
} from "react-native";
import {
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

const USER = 1;

// Enable LayoutAnimation for Android
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Phrases = ({ navigation }) => {
  const [typedTopic, setTypedTopic] = useState("");
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

  // const samplePhrases = [
  //   {
  //     generated_phrases_id: 1,
  //     userid: 123,
  //     text_translated:
  //       "Hello, how are you? long text long text long text long text",
  //     text_original: "Hola, ¿cómo estás?",
  //     isloading: false,
  //   },
  //   {
  //     generated_phrases_id: 2,
  //     userid: 456,
  //     text_translated: "Good morning!",
  //     text_original: "¡Buenos días!",
  //     isloading: false,
  //   },
  // ];

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

  function toggleTopicsExpanded() {
    // Update the state
    setTopicsExpanded(!topicsExpanded);
  }

  const savePhrase = async (phrase) => {
    try {
      const currentPhrases =
        JSON.parse(await AsyncStorage.getItem("saved-phrases")) || {};

      // Check for duplicates based on original text
      if (!currentPhrases[phrase.originaltext]) {
        currentPhrases[phrase.originaltext] = phrase;
        await AsyncStorage.setItem(
          "saved-phrases",
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

  const fetchGeneratedPhrases = async () => {
    try {
      const response = await fetch(
        `https://jk249.azurewebsites.net/user/${USER}/phrase`,
      );
      const json = await response.json();
      setGeneratedPhrases(json);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const fetchSearchedPhrases = async (userId, topic) => {
    try {
      const apiUrl = `https://llama.kenarnold.org/topical_generation?user_id=${encodeURIComponent(
        userId,
      )}&topic=${encodeURIComponent(topic)}`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Assuming the response is in JSON format, handle the data as needed
        console.log("Generated Phrases:", data);
        setSearchedPhrases(data);
      } else {
        // If the request was not successful, handle the error
        console.error(
          "Failed to fetch phrases:",
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      // Handle any other errors that may occur during the fetch
      console.error("Error during fetch:", error.message);
    }
  };

  const searchTopic = async (text) => {
    if (text !== "") {
      console.log(text);
      fetchSearchedPhrases(USER, text);
      setDisplayedPhrases(searchedPhrases);
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
                typedTopic={typedTopic}
                onEndEditing={(event) => searchTopic(event.nativeEvent.text)}
                onClear={() => setTypedTopic("")}
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
