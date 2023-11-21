// Translation.js
import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import {
  Button,
  IconButton,
  withTheme,
  Portal,
  Modal,
  PaperProvider,
} from "react-native-paper";
import { WebView } from "react-native-webview";
import * as Speech from "expo-speech";

import HideKeyboard from "../components/HideKeyboard";
import {
  translationTheme,
  shadows,
  translateStyles,
} from "../styles/globalStyles";

const Translation = ({ navigation }) => {
  // States for I/O, dictionary loading and displaying
  const [inputLang, setInputLang] = React.useState("English");
  const [outputLang, setOutputLang] = React.useState("Spanish");
  const [translationInput, setTranslationInput] = React.useState("");
  const [translationOutput, setTranslationOutput] = React.useState("");
  const [searchedWord, setSearchedWord] = React.useState("");
  const [wordRefEndpoint, setWordRefEndpoint] = React.useState(
    "https://www.wordreference.com/es/en/translation.asp?spen=",
  );
  const [wordRefLoading, setWordRefLoading] = React.useState(false);
  const [wordRefVisible, setWordRefVisible] = useState(false);

  // To encode/decode ISO language codes used by Microsoft Translate
  const ISO6391 = require("iso-639-1");

  // Function to send text and target language to Microsoft Translator API,
  // return received translation or error if something went wrong
  const translateText = async (text, targetLanguage) => {
    // apiKey stored in environmental variable to avoid exposure in Github
    const apiKey = process.env.EXPO_PUBLIC_TRANSLATION_KEY;
    const endpoint = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${targetLanguage}`;

    // Fetch translation
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": apiKey,
          "Ocp-Apim-Subscription-Region": "westcentralus",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify([{ text }]),
      });

      // Handle HTTP errors
      if (!response.ok) {
        throw new Error(
          `Translation request failed with status ${response.status}`,
        );
      }

      const data = await response.json();

      // Ensure data, data.translations, and data.translations.text contain
      // something
      if (!data || !data[0]?.translations || !data[0].translations[0]?.text) {
        throw new Error("Unexpected response format from translation API");
      }

      // Return the successful translation if all goes well
      return data[0].translations[0].text;
    } catch (error) {
      // Handle other errors (e.g., network issues, parsing errors)
      console.error("Translation error:", error.message);
      return text; // Return the original text as a fallback
    }
  };

  // Function to request translation in target language, set it as output
  // (sets empty string output if input is empty)
  const doTranslation = async (text) => {
    if (text != "") {
      const microsoftTranslation = await translateText(
        text,
        ISO6391.getCode(outputLang),
      );
      setTranslationOutput(microsoftTranslation);
    } else {
      setTranslationOutput("");
    }
  };

  // Function to switch input and output languages and their corresponding
  // Wordreference endpoints
  const toggleLang = () => {
    var temp = inputLang;
    setInputLang(outputLang);
    setOutputLang(temp);

    temp = translationInput;
    setTranslationInput(translationOutput);
    setTranslationOutput(temp);

    if (inputLang == "English") {
      setWordRefEndpoint(
        "https://www.wordreference.com/es/translation.asp?tranword=",
      );
    } else if (inputLang == "Spanish") {
      setWordRefEndpoint(
        "https://www.wordreference.com/es/en/translation.asp?spen=",
      );
    }
  };

  function showModal(item) {
    setWordRefVisible(true);
  }

  function hideModal() {
    setWordRefVisible(false);
  }

  // Function to filter punctuation out of selected word, pull up dictionary
  // modal for selected word
  function selectWord(word) {
    setSearchedWord(word.replace(/[¡!"#$%&'()*+,-./:;<=>¿?@[\]^_`{|}~]/g, ""));
    showModal();
  }

  return (
    <HideKeyboard>
      <PaperProvider theme={translationTheme}>
        <View style={translateStyles.background}>
          <SafeAreaView>
            <Portal>
              <Modal
                visible={wordRefVisible}
                onDismiss={() => setWordRefVisible(false)}
                contentContainerStyle={translateStyles.modalContainer}
              >
                <View
                  style={{
                    overflow: "hidden",
                    width: useWindowDimensions().width * 0.9,
                    flex: 1,
                  }}
                >
                  {wordRefLoading ? (
                    <Text
                      style={{
                        width: "100%",
                        textAlign: "center",
                        paddingTop: 5,
                      }}
                    >
                      Loading...
                    </Text>
                  ) : null}
                  <WebView
                    originWhitelist={["*"]}
                    source={{ uri: wordRefEndpoint + searchedWord }}
                    onLoadStart={() => setWordRefLoading(true)}
                    onLoadProgress={() => setWordRefLoading(false)}
                    style={{ borderRadius: 15, marginTop: -180 }}
                    containerStyle={{ borderRadius: 15 }}
                  />
                </View>
              </Modal>
            </Portal>
            <View
              style={{
                height: "100%",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
              rowGap={4}
              paddingRight={2}
              paddingLeft={2}
            >
              <View
                style={{
                  marginBottom: -43,
                  marginRight: 10,
                  zIndex: 3,
                  alignItems: "flex-end",
                }}
              >
                <IconButton
                  onPress={toggleLang}
                  icon="swap-vertical"
                  iconColor="gray"
                  style={{ width: 25, height: 30, marginTop: 4 }}
                ></IconButton>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  zIndex: 2,
                }}
              >
                <Text style={translateStyles.languageLabel}>{inputLang}</Text>
              </View>
              <View style={{ ...shadows.shadow4, ...translateStyles.textBox }}>
                <TextInput
                  style={{
                    justifyContent: "flex-start",
                    textAlignVertical: "top",
                    height: "100%",
                    fontSize: 20,
                  }}
                  multiline
                  value={translationInput}
                  onChangeText={(text) => setTranslationInput(text)}
                />
              </View>
              <View
                style={{
                  marginTop: -3,
                  marginRight: 4,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ ...translateStyles.languageLabel }}>
                  {outputLang}
                </Text>
                <IconButton
                  style={{ width: 30, height: 30, marginBottom: -3 }}
                  iconColor="gray"
                  icon="volume-high"
                  mode="default"
                  onPress={() => {
                    if (outputLang === "Spanish") {
                      Speech.speak(translationOutput, { language: "es" });
                    } else if (outputLang === "English") {
                      Speech.speak(translationOutput, { language: "en" });
                    }
                  }}
                />
              </View>
              <View
                style={{
                  ...shadows.shadow4,
                  ...translateStyles.textBox,
                  flex: 1,
                }}
                elevation={3}
              >
                <FlatList
                  style={{ height: 0 }}
                  numColumns={1000}
                  columnWrapperStyle={{
                    flexWrap: "wrap",
                  }}
                  data={translationOutput.split(" ")}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        selectWord(item);
                      }}
                    >
                      <Text style={{ fontSize: 20 }}>{item + " "}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
              <Text
                style={[
                  translateStyles.languageLabel,
                  {
                    textDecorationLine: "underline",
                    fontSize: 12,
                    width: "100%",
                    textAlign: "center",
                    marginTop: -7,
                  },
                ]}
              >
                Tap a translated word for the dictionary definition
              </Text>
              <Button
                onPress={() => doTranslation(translationInput, outputLang)}
              >
                Submit
              </Button>
            </View>
          </SafeAreaView>
        </View>
      </PaperProvider>
    </HideKeyboard>
  );
};

export default withTheme(Translation);
