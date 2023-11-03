// Phrases.js
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
} from "react-native-paper";
import CollapsibleView from "@eliav2/react-native-collapsible-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HideKeyboard from "../components/HideKeyboard";

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
    // empty async storage, "resetting" for new one
    try {
      await AsyncStorage.removeItem("saved-phrases");
    } catch (e) {
      // remove error
    }
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
    setModalVisible(false);
    console.log(await AsyncStorage.getItem("saved-phrases"));
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

  const theme = useTheme();

  return (
    <HideKeyboard>
      <SafeAreaView style={{ flexDirection: "column", flex: 1 }}>
        <Portal style={{}}>
          <Modal
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
            contentContainerStyle={{
              backgroundColor: "white",
              borderRadius: 10,
              marginTop: "20%",
              marginBottom: "20%",
              marginLeft: "10%",
              marginRight: "10%",
              alignSelf: "center",
            }}
          >
            <View
              style={{
                width: useWindowDimensions().width * 0.8,
                flex: 1,
                padding: 10,
              }}
            >
              <Text style={{ fontSize: 20 }}>Your Phrase:</Text>
              <Text style={{ fontSize: 18 }}>{selectedPhraseText + "\n"}</Text>
              <Text style={{ fontSize: 20 }}>Translation:</Text>
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
          <CollapsibleView
            style={[styles.textBox, { backgroundColor: "white" }]}
            title={searchedTopic}
            titleStyle={{ alignItems: "flex-start" }}
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
                      style={{ marginLeft: 2, marginRight: 2, marginBottom: 4 }}
                      onPress={() => handleTopicSelect(item)}
                      mode="outlined"
                      textColor="black"
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
          <View style={[styles.textBox, { flex: 1, backgroundColor: "white" }]}>
            <FlatList
              data={phrases}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => selectPhrase(item)}>
                  <Text>{item.text}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </SafeAreaView>
    </HideKeyboard>
  );
};

const styles = StyleSheet.create({
  textBox: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 10,
    padding: "1%",
    marginLeft: "1%",
    marginRight: "1%",
    marginBottom: "1%",
    fontSize: 16,
  },
});

export default withTheme(Phrases);
