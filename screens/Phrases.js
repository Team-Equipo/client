// Phrases.js
import CollapsibleView from "@eliav2/react-native-collapsible-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from "react-native";
import {
  Text,
  Modal,
  Portal,
  Button,
  withTheme,
  useTheme,
  PaperProvider,
} from "react-native-paper";

import HideKeyboard from "../components/HideKeyboard";
import { phraseStyles, phraseTheme } from "../styles/globalStyles";

const Phrases = ({ navigation }) => {
  const [searchedTopic, setSearchedTopic] = useState("Select a topic...");
  const [phrases, setPhrases] = useState([]);
  const [selectedPhrase, setSelectedPhrase] = useState();
  const [selectedPhraseText, setSelectedPhraseText] = useState("");
  const [translation, setTranslation] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  function handleTopicSelect(item) {
    setSearchedTopic("Topic: " + item.text);
    setPhrases([
      {
        id: Date.now(),
        text: 'Spanish phrase 1 for topic "' + item.text + '"',
      },
      {
        id: Date.now() - 1,
        text: 'Spanish phrase 2 for topic "' + item.text + '"',
      },
      {
        id: Date.now() - 2,
        text: 'Spanish phrase 3 for topic "' + item.text + '"',
      },
    ]);
  }

  function showModal(item) {
    setModalVisible(true);
  }

  function hideModal() {
    setModalVisible(false);
  }

  function selectPhrase(item) {
    setSelectedPhrase(item);
    setSelectedPhraseText(item.text);
    setTranslation("[Translation of " + item.text + "]");
    showModal();
  }

  const savePhrase = async (item) => {
    hideModal();
    try {
      var currentPhrases = JSON.parse(
        await AsyncStorage.getItem("saved-phrases"),
      );
      if (currentPhrases == null) {
        currentPhrases = [];
      }
      // conditional to check for duplicate phrases taken from:
      // https://stackoverflow.com/a/8217584
      if (!currentPhrases.some((existing) => existing.text === item.text)) {
        currentPhrases.push(item);
      }
    } catch (e) {
      console.log("Error", e);
    }
    try {
      await AsyncStorage.setItem(
        "saved-phrases",
        JSON.stringify(currentPhrases),
      );
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

  return (
    <HideKeyboard>
      <PaperProvider theme={phraseTheme}>
        <View style={phraseStyles.background}>
          <SafeAreaView style={{ flexDirection: "column", flex: 1 }}>
            <Portal>
              <Modal
                visible={modalVisible}
                onDismiss={hideModal}
                theme={phraseTheme}
                contentContainerStyle={phraseStyles.modalStyle}
              >
                <View
                  style={{
                    width: useWindowDimensions().width * 0.8,
                    flex: 1,
                    padding: 10,
                  }}
                >
                  <Text style={{ fontSize: 20, alignItems: "center" }}>
                    Your Phrase:
                  </Text>
                  <Text style={{ fontSize: 18 }}>
                    {selectedPhraseText + "\n"}
                  </Text>
                  <Text style={{ fontSize: 20, alignItems: "center" }}>
                    Translation:
                  </Text>
                  <Text style={{ fontSize: 18 }}>{translation}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    padding: 8,
                  }}
                >
                  <Button
                    mode="contained"
                    onPress={hideModal}
                    style={{ width: "49%", marginHorizontal: 5 }}
                    labelStyle={{ marginHorizontal: 0 }}
                  >
                    Back
                  </Button>
                  <Button
                    mode="contained"
                    onPress={() => savePhrase(selectedPhrase)}
                    style={{ width: "49%", marginHorizontal: 5 }}
                    labelStyle={{ marginHorizontal: 0 }}
                  >
                    Save Phrase
                  </Button>
                </View>
              </Modal>
            </Portal>
            <View
              style={{
                flex: 1,
                paddingTop: "1%",
                paddingLeft: "0.5%",
                paddingRight: "0.5%",
              }}
            >
              <Text
                style={{
                  color: "gray",
                  fontSize: 12,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Tap on a phrase to see its translation or to save
              </Text>
              <CollapsibleView
                style={[phraseStyles.textBox]}
                title={searchedTopic}
                titleStyle={{ alignItems: "flex-start", fontSize: 20 }}
                noArrow={true}
              >
                <TouchableWithoutFeedback
                  style={{
                    paddingTop: 5,
                    flexDirection: "column",
                    justifyContent: "center",
                    zIndex: 10,
                  }}
                >
                  <View>
                    <FlatList
                      numColumns={10}
                      columnWrapperStyle={{
                        flexWrap: "wrap",
                        justifyContent: "center",
                      }}
                      data={topics}
                      renderItem={({ item }) => (
                        <Button
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
                        </Button>
                      )}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </CollapsibleView>
              <View style={phraseStyles.genPhraseBox}>
                <FlatList
                  data={phrases}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => selectPhrase(item)}>
                      <Text style={phraseStyles.genPhrases}>{item.text}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </SafeAreaView>
        </View>
      </PaperProvider>
    </HideKeyboard>
  );
};

export default withTheme(Phrases);
