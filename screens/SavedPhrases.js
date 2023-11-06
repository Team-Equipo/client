// SavedPhrases.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  View,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import { Button, withTheme, Text, Modal, Portal } from "react-native-paper";

const SavedPhrases = ({ navigation }) => {
  const [phraseData, setPhraseData] = useState([]);
  const [selectedPhrase, setSelectedPhrase] = useState();
  const [selectedPhraseText, setSelectedPhraseText] = useState("");
  const [translation, setTranslation] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  function selectPhrase(item) {
    setSelectedPhrase(item);
    setSelectedPhraseText(item.text);
    setTranslation("[Translation of " + item.text + "]");
    showModal();
  }

  const deletePhrase = async (item) => {
    hideModal();
    try {
      var currentPhrases = JSON.parse(
        await AsyncStorage.getItem("saved-phrases"),
      );
      if (currentPhrases == null) {
        currentPhrases = [];
      }
      // conditional to check for identical phrase taken from:
      // https://stackoverflow.com/a/8217584
      updatedPhrases = currentPhrases.filter(
        (existing) => existing.text !== item.text,
      );
    } catch (e) {
      console.log("Error", e);
    }
    try {
      await AsyncStorage.setItem(
        "saved-phrases",
        JSON.stringify(updatedPhrases),
      );
    } catch (e) {
      console.log("Error", e);
    }
  };

  function showModal(item) {
    setModalVisible(true);
  }

  function hideModal() {
    setModalVisible(false);
  }

  const loadSavedPhrases = async () => {
    try {
      setPhraseData(JSON.parse(await AsyncStorage.getItem("saved-phrases")));
    } catch (e) {
      console.log("Error", e);
    }
  };

  useEffect(() => {
    loadSavedPhrases();
  }, [AsyncStorage.getItem("saved-phrases")]);

  return (
    <SafeAreaView>
      <Portal>
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
              onPress={() => deletePhrase(selectedPhrase)}
              style={{ width: "49%", marginHorizontal: 5 }}
              labelStyle={{ marginHorizontal: 0 }}
            >
              Delete Phrase
            </Button>
          </View>
        </Modal>
      </Portal>
      <View style={{ height: "100%" }} paddingRight="0.5%" paddingLeft="0.5%">
        <FlatList
          data={phraseData}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                selectPhrase(item);
              }}
            >
              <Text>{item.text}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default withTheme(SavedPhrases);
