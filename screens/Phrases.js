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
  const [searchedTopic, setSearchedTopic] = useState("");
  const [topicsExpanded, setTopicsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [generatedPhrases, setGeneratedPhrases] = useState([]);
  const [searchedWord, setSearchedWord] = React.useState("");
  const [wordRefEndpoint, setWordRefEndpoint] = useState(
    "https://www.wordreference.com/es/en/translation.asp?spen=",
  );
  const [wordRefVisible, setWordRefVisible] = useState(false);

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

  function handleTopicSelect(item) {
    animateSearchBar();
    setTopicsExpanded(false);
    const topicLabel =
      item.text.length === 10 ? " " + item.text + " " : item.text;
    setSearchedTopic(topicLabel);
  }

  function handleTopicDeselect() {
    setTopicsExpanded(false);
    animateSearchBar();
    setSearchedTopic("");
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

  /* Hardcode a list of topics. */
  const topics = [
    { text: "Ordering food", id: 1 },
    { text: "Directions", id: 2 },
    { text: "Shopping", id: 3 },
    { text: "Greetings", id: 4 },
    { text: "Goodbyes", id: 5 },
    { text: "Pleasantries", id: 6 },
  ];
  // this function attempts to fetch data from a specific API endpoint related to user-generated phrases. If successful, it updates the state variable generatedPhrases with the retrieved data. If unsuccessful, it logs an error to the console. Finally, it sets the isLoading state variable to false.
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
  //fetches a specific phrase for a given userID and phraseID
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
  //manages the state of generated phrases, marking a specific phrase as loading before potentially initiating an update request to the server.
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
                  marginBottom: -3,
                }}
                title={
                  <TouchableWithoutFeedback onPress={toggleTopicsExpanded}>
                    <View
                      style={{
                        ...(topicsExpanded ? shadows.shadow4 : {}),
                        flexDirection: "row",
                        justifyContent: "space-between",
                        backgroundColor: "white",
                        borderRadius: 30,
                        borderColor: "lightgrey",
                        borderWidth: 1,
                      }}
                    >
                      {searchedTopic !== "" ? (
                        <View
                          style={{
                            flexDirection: "column",
                            justifyContent: "center",
                            marginLeft: 5,
                          }}
                        >
                          <Chip
                            style={phraseStyles.topicBox}
                            mode="elevated"
                            textStyle={{
                              fontSize: 15,
                              color: "white",
                            }}
                          >
                            {searchedTopic}
                          </Chip>
                        </View>
                      ) : (
                        // Display a placeholder text when searchedTopic is empty
                        <View
                          style={{
                            flexDirection: "column",
                            justifyContent: "center",
                            // width: "85%",
                          }}
                        >
                          <Text
                            style={{
                              marginLeft: 15,
                              color: "darkgray",
                              fontFamily: "Poppins-Regular",
                              fontSize: 15,
                              width: windowDimensions.width - 76,
                            }}
                          >
                            Select a topic...
                          </Text>
                        </View>
                      )}

                      <IconButton
                        icon="close"
                        style={{ margin: 0 }}
                        onPress={handleTopicDeselect}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                }
                titleStyle={{
                  alignItems: "flex-start",
                }}
                noArrow
                activeOpacityFeedback={1}
                collapsibleContainerStyle={{
                  ...shadows.shadow4,
                  width: "100%",
                  marginTop: 4,
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
                    style={{
                      padding: 3,
                      borderColor: "lightgrey",
                      borderWidth: 1,
                      borderRadius: 15,
                    }}
                    numColumns={100}
                    columnWrapperStyle={{
                      flexWrap: "wrap",
                      justifyContent: "center",
                      flexDirection: "row",
                    }}
                    data={topics}
                    renderItem={({ item }) => (
                      <Chip
                        style={phraseStyles.topicBox}
                        onPress={() => handleTopicSelect(item)}
                        mode="elevated"
                        ellipsizeMode="clip"
                        // contentStyle={{
                        //   marginBottom: -7,
                        //   marginTop: -7,
                        //   marginLeft: -3,
                        //   marginRight: -3,
                        // }}
                        textStyle={{
                          fontSize: 15,
                          color: "white",
                        }}
                      >
                        {item.text.length === 10
                          ? " " + item.text + " "
                          : item.text}
                      </Chip>
                    )}
                  />
                </TouchableWithoutFeedback>
              </CollapsibleView>
              {/* The list of PhraseCards */}
              <FlatList
                contentContainerStyle={{ alignItems: "center" }}
                // data={samplePhrases}
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
