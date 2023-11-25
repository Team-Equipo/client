// Translation.js
import * as Speech from "expo-speech";
import React, { useState } from "react";
import {
  // Text,
  TextInput,
  View,
  SafeAreaView,
} from "react-native";
import {
  Text,
  IconButton,
  withTheme,
  Portal,
  Modal,
  Dialog,
  PaperProvider,
  Divider,
  Surface,
  TouchableRipple,
} from "react-native-paper";

import WordSearchWebView from "../components/WordSearchWebView";
import HideKeyboard from "../components/HideKeyboard";
import SelectableWordList from "../components/SelectableWordList";
import {
  translationTheme,
  shadows,
  translateStyles,
} from "../styles/globalStyles";

const Translation = ({ navigation }) => {
  // States for I/O, dictionary loading and displaying dictionary entry,
  // displaying audio input info
  const [inputLang, setInputLang] = React.useState("English");
  const [outputLang, setOutputLang] = React.useState("Spanish");
  const [translationInput, setTranslationInput] = React.useState("");
  const [translationOutput, setTranslationOutput] = React.useState("");
  const [lastTranslationInput, setLastTranslationInput] = React.useState("");
  const [searchedWord, setSearchedWord] = React.useState("");
  const [wordRefEndpoint, setWordRefEndpoint] = React.useState(
    "https://www.wordreference.com/es/en/translation.asp?spen=",
  );
  const [wordRefVisible, setWordRefVisible] = useState(false);
  const [micInfoVisible, setMicInfoVisible] = useState(false);

  // To encode/decode ISO language codes used by Microsoft Translate
  const ISO6391 = require("iso-639-1");

  // Function to send text and target language to Microsoft Translator API,
  // return received translation or error if something went wrong
  const translateText = async (text, inputLanguage, targetLanguage) => {
    // apiKey stored in environmental variable to avoid exposure in Github
    const apiKey = process.env.EXPO_PUBLIC_TRANSLATION_KEY;
    const endpoint = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=${inputLanguage}&to=${targetLanguage}`;

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

  // Function to request translation in target language, then output (sets
  // empty string output if input is empty or does nothing if request is
  // unchanged from the last)
  const doTranslation = async (text) => {
    if (translationInput !== lastTranslationInput) {
      if (text !== "") {
        const microsoftTranslation = await translateText(
          text,
          ISO6391.getCode(inputLang),
          ISO6391.getCode(outputLang),
        );
        setTranslationOutput(microsoftTranslation);
        setLastTranslationInput(translationInput);
      } else {
        setTranslationOutput("");
      }
    }
  };

  // Function to switch input and output languages and their corresponding
  // Wordreference endpoints for the dictionary
  const toggleLang = () => {
    const temp = inputLang;
    setInputLang(outputLang);
    setOutputLang(temp);

    setLastTranslationInput("");
    setTranslationOutput("");

    if (inputLang === "English") {
      setWordRefEndpoint(
        "https://www.wordreference.com/es/translation.asp?tranword=",
      );
    } else if (inputLang === "Spanish") {
      setWordRefEndpoint(
        "https://www.wordreference.com/es/en/translation.asp?spen=",
      );
    }
  };

  // Function to filter punctuation out of selected word, pull up dictionary
  // modal for selected word
  const selectWord = (word) => {
    setSearchedWord(word.replace(/[¡!"#$%&'()*+,-./:;<=>¿?@[\]^_`{|}~]/g, ""));
    setWordRefVisible(true);
  };

  return (
    <PaperProvider theme={translationTheme}>
      <HideKeyboard>
        <View style={translateStyles.background}>
          <SafeAreaView>
            {/* Overlay for popups */}
            <Portal>
              {/* Mic info alert */}
              <Dialog
                visible={micInfoVisible}
                onDismiss={() => setMicInfoVisible(false)}
              >
                <Dialog.Content>
                  <Text>
                    Your device's built-in transcription functionality can be
                    used if it is set to record in the correct language(s).
                  </Text>
                </Dialog.Content>
                <Divider />
                <TouchableRipple
                  borderless
                  onPress={() => setMicInfoVisible(false)}
                  style={{
                    borderBottomLeftRadius: 25,
                    borderBottomRightRadius: 25,
                  }}
                >
                  <Dialog.Actions
                    style={{
                      justifyContent: "center",
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}
                  >
                    <Text>OK</Text>
                  </Dialog.Actions>
                </TouchableRipple>
              </Dialog>

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

            {/* Main screen contents */}
            <View
              style={{
                height: "100%",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: 10,
              }}
            >
              {/* Top input box */}
              <View
                style={{
                  ...shadows.shadow4,
                  ...translateStyles.textBox,
                  backgroundColor: "white",
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              >
                {/* Top bar */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Input language label */}
                  <Text style={translateStyles.languageLabel}>{inputLang}</Text>

                  {/* Input buttons */}
                  <View style={{ flexDirection: "row" }}>
                    {/* Audio input button */}
                    <IconButton
                      style={{ marginTop: 0, marginRight: 0 }}
                      icon="microphone"
                      onPress={() => {
                        setMicInfoVisible(true);
                      }}
                    />

                    {/* Clear text input button */}
                    {translationInput !== "" ? (
                      <IconButton
                        style={{ marginTop: 0, marginRight: 0, marginLeft: -5 }}
                        icon="close"
                        onPress={() => {
                          setTranslationInput("");
                        }}
                      />
                    ) : null}
                  </View>
                </View>

                <Divider style={{ marginTop: -10 }} />

                {/* Input section */}
                <TextInput
                  style={{
                    justifyContent: "flex-start",
                    textAlignVertical: "top",
                    flex: 1,
                    fontSize: 20,
                  }}
                  multiline
                  value={translationInput}
                  onChangeText={(text) => setTranslationInput(text)}
                  placeholder={
                    inputLang === "English"
                      ? "Text to translate..."
                      : inputLang === "Spanish"
                      ? "Texto para traducir..."
                      : null
                  }
                  placeholderTextColor="#999"
                />

                {/* Submit button */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    paddingBottom: 8,
                  }}
                >
                  <Surface
                    style={{
                      borderRadius: 100,
                      marginTop: -30,
                      opacity: 0.5,
                      backgroundColor: "transparent",
                    }}
                    elevation={2}
                  >
                    <IconButton
                      mode="outlined"
                      iconColor="#000"
                      containerColor="#F5F5F9"
                      style={{ margin: 0, marginTop: 0 }}
                      icon="send"
                      onPress={() => {
                        doTranslation(translationInput, outputLang);
                      }}
                    />
                  </Surface>
                </View>
              </View>

              {/* Button to swap languages */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: -18,
                  marginBottom: -18,
                  zIndex: 5,
                }}
              >
                <Surface
                  style={{
                    borderRadius: 100,
                    padding: -20,
                    backgroundColor: "white",
                  }}
                  elevation={2}
                >
                  <IconButton
                    mode="outlined"
                    containerColor="#F5F5F9"
                    style={{ margin: 0 }}
                    icon="swap-vertical-variant"
                    onPress={toggleLang}
                  />
                </Surface>
              </View>

              {/* Bottom output box */}
              <View
                style={{
                  ...shadows.shadow4,
                  ...translateStyles.textBox,
                  backgroundColor: "#F5F5F9",
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                }}
                elevation={3}
              >
                {/* Top bar */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Output language label */}
                  <Text style={translateStyles.languageLabel}>
                    {outputLang}
                  </Text>

                  {/* TTS button */}
                  <IconButton
                    style={{ marginTop: 0, marginRight: 0 }}
                    icon="volume-high"
                    onPress={() => {
                      if (outputLang === "Spanish") {
                        Speech.speak(translationOutput, { language: "es" });
                      } else if (outputLang === "English") {
                        Speech.speak(translationOutput, { language: "en" });
                      }
                    }}
                  />
                </View>

                <Divider style={{ marginTop: -10 }} />

                {/* Output section */}
                <View style={{ marginTop: 3, flex: 1 }}>
                  {translationOutput !== "" ? (
                    <SelectableWordList
                      data={translationOutput}
                      onSelectWord={selectWord}
                    />
                  ) : inputLang === "English" ? (
                    <Text style={{ fontSize: 20, color: "#999" }}>
                      Tap on a translated word to view its dictionary definition
                    </Text>
                  ) : inputLang === "Spanish" ? (
                    <Text style={{ fontSize: 20, color: "#999" }}>
                      Tocar una palabra traducida para ver su definición en el
                      diccionario
                    </Text>
                  ) : null}
                </View>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </HideKeyboard>
    </PaperProvider>
  );
};

export default withTheme(Translation);
