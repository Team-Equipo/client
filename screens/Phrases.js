// Phrases.js
import CollapsibleView from "@eliav2/react-native-collapsible-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Modal,
  Portal,
  Chip,
  withTheme,
  PaperProvider,
} from "react-native-paper";

import HideKeyboard from "../components/HideKeyboard";
import PhraseCard from "../components/PhraseCard";
import WordSearchWebView from "../components/WordSearchWebView";
import { usePhraseStorageTracker } from "../contexts/PhraseStorageTracker";
import {
  phraseStyles,
  shadows,
  phraseTheme,
  translateStyles,
} from "../styles/globalStyles";

const USER = 1;

const Phrases = ({ navigation }) => {
  const [searchedTopic, setSearchedTopic] = useState("Select a topic...");
  const [topicsExpanded, setTopicsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [generatedPhrases, setGeneratedPhrases] = useState([]);
  const [searchedWord, setSearchedWord] = React.useState("");
  const [wordRefEndpoint, setWordRefEndpoint] = useState(
    "https://www.wordreference.com/es/en/translation.asp?spen=",
  );
  const [wordRefVisible, setWordRefVisible] = useState(false);
  const { storageChange, setStorageChange } = usePhraseStorageTracker();

  const samplePhrases = [
    {
      generated_phrases_id: 1,
      userid: 123,
      text_translated: "Hello, how are you?",
      text_original: "Hola, ¿cómo estás?",
      isloading: false,
    },
    {
      generated_phrases_id: 2,
      userid: 456,
      text_translated: "Good morning!",
      text_original: "¡Buenos días!",
      isloading: false,
    },
    // Add more test phrases as needed
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

  function handleTopicSelect(item) {
    setTopicsExpanded(false);
    setSearchedTopic("Topic: " + item.text);
  }

  function toggleTopicsExpanded() {
    return topicsExpanded === true
      ? setTopicsExpanded(false)
      : setTopicsExpanded(true);
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
          (currentPhrase) =>
            currentPhrase.text_original === phrase.text_original,
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
    { text: "Ordering food", id: 1 },
    { text: "Asking for directions", id: 2 },
    { text: "Shopping", id: 3 },
    { text: "Greetings", id: 4 },
    { text: "Goodbyes", id: 5 },
    { text: "Pleasantries", id: 6 },
  ];

  const fetchGeneratedPhrases = async () => {
    try {
      const response = await fetch(
        `https://lingucidity.azurewebsites.net/user/${USER}/phrase`,
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
        `https://lingucidity.azurewebsites.net/user/${userID}/phrase/${phraseID}`,
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
    const index = updatedPhrases.findIndex(
      (phrase) => phrase.generated_phrases_id === phraseID,
    );
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
              <CollapsibleView
                expanded={topicsExpanded}
                style={{
                  padding: 0,
                  zIndex: 1,
                  borderColor: "transparent",
                }}
                title={
                  <Chip
                    style={phraseStyles.topicBox}
                    onPress={() => toggleTopicsExpanded()}
                    mode="elevated"
                    textColor="gray"
                    contentStyle={{
                      marginBottom: -7,
                      marginTop: -7,
                      marginLeft: -3,
                      marginRight: -3,
                    }}
                    labelStyle={{
                      fontSize: 14,
                    }}
                  >
                    {searchedTopic}
                  </Chip>
                }
                titleStyle={{
                  alignItems: "flex-start",
                }}
                noArrow
                activeOpacityFeedback={1}
                collapsibleContainerStyle={{
                  ...shadows.shadow4,
                  width: "100%",
                  marginTop: 5,
                  borderRadius: 15,
                  backgroundColor: "white",
                  position: "absolute",
                  top: "100%",
                }}
              >
                <TouchableWithoutFeedback
                  style={{
                    paddingTop: 5,
                    flexDirection: "column",
                    justifyContent: "center",
                    zIndex: 10,
                  }}
                >
                  <FlatList
                    style={{ padding: 3 }}
                    numColumns={10}
                    columnWrapperStyle={{
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                    data={topics}
                    renderItem={({ item }) => (
                      <Chip
                        style={phraseStyles.topicBox}
                        onPress={() => handleTopicSelect(item)}
                        mode="elevated"
                        textColor="gray"
                        contentStyle={{
                          marginBottom: -7,
                          marginTop: -7,
                          marginLeft: -3,
                          marginRight: -3,
                        }}
                        labelStyle={{
                          fontSize: 14,
                        }}
                      >
                        {item.text}
                      </Chip>
                    )}
                  />
                </TouchableWithoutFeedback>
              </CollapsibleView>
              {/* The list of PhraseCards */}
              <FlatList
                contentContainerStyle={{ alignItems: "center", rowGap: 8 }}
                data={samplePhrases}
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
