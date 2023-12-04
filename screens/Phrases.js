// Phrases.js
import CollapsibleView from "@eliav2/react-native-collapsible-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
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
import { usePhraseStorageTracker } from "../contexts/PhraseStorageTracker";
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
  const [searchedWord, setSearchedWord] = React.useState("");
  const [wordRefEndpoint, setWordRefEndpoint] = useState(
    "https://www.wordreference.com/es/en/translation.asp?spen=",
  );
  const [wordRefVisible, setWordRefVisible] = useState(false);
  const { storageChange, setStorageChange } = usePhraseStorageTracker();

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
  };

  function handleTopicDeselect() {
    setTopicsExpanded(false);
    animateSearchBar();
    setSelectedTopic("");
  }

  function toggleTopicsExpanded() {
    // Update the state
    setTopicsExpanded(!topicsExpanded);
  }

  const savePhrase = async (phrase) => {
    let currentPhrases;
    try {
      currentPhrases = JSON.parse(await AsyncStorage.getItem("saved-phrases"));
      if (currentPhrases == null) {
        currentPhrases = [];
      }
      // Conditional to check for duplicate phrases taken from:
      // https://stackoverflow.com/a/8217584
      // If currentPhrases does not contain a currentPhrase with text identical
      // to the one being requested for saving, then push it to currentPhrases.
      if (
        !currentPhrases.some(
          (currentPhrase) => currentPhrase.originaltext === phrase.originaltext,
        )
      ) {
        currentPhrases.push(phrase);
      }
    } catch (e) {
      console.log("Error", e);
    }
    try {
      // Put updated currentPhrases back into JSON for async storage
      await AsyncStorage.setItem(
        "saved-phrases",
        JSON.stringify(currentPhrases),
      );
      // Signal that a storage change occurred by a simple bit flip
      setStorageChange((prevStorageChange) => !prevStorageChange);
    } catch (e) {
      console.log("Error", e);
    }
  };

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
      userid: userID,
      id: phraseID,
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
                onChangeText={(text) => setTypedTopic(text)}
                onClear={() => setTypedTopic("")}
                selectedTopic={selectedTopic}
                handleTopicDeselect={handleTopicDeselect}
                handleTopicSelect={handleTopicSelect}
                topics={topics}
                navigation={navigation}
              />
              {/* The list of PhraseCards */}
              <FlatList
                style={{ marginTop: 8 }}
                contentContainerStyle={{
                  alignItems: "center",
                  paddingBottom: 1,
                }}
                data={generatedPhrases}
                renderItem={({ item }) => (
                  <PhraseCard
                    phrase={item}
                    isLoading={isLoading}
                    updateGeneratedPhrase={updateGeneratedPhrase}
                    savePhrase={savePhrase}
                    mode="browse"
                    onSelectEnglishWord={selectEnglishWord}
                    onSelectSpanishWord={selectSpanishWord}
                  />
                )}
              />
            </View>
          </SafeAreaView>
        </View>
      </PaperProvider>
    </HideKeyboard>
  );
};

export default withTheme(Phrases);
