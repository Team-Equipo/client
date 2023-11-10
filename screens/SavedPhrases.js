// SavedPhrases.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import { Button, withTheme, Text, Modal, Portal } from "react-native-paper";
import PhraseCard from "../components/PhraseCard";

import { savedPhrases } from "../styles/globalStyles";

const SavedPhrases = ({ navigation }) => {
  const [phraseData, setPhraseData] = useState([]);
  const [selectedPhrase, setSelectedPhrase] = useState();
  const [selectedPhraseText, setSelectedPhraseText] = useState("");
  const [translation, setTranslation] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  function selectPhrase(item) {
    setSelectedPhrase(item);
    setSelectedPhraseText(item.text_original);
    setTranslation(item.text_translated);
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
        (existing) => existing.text_original !== item.text_original,
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
    <View style={savedPhrases.background}>
      <SafeAreaView>
        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
            contentContainerStyle={savedPhrases.modalContainer}
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
          {/* {generatedPhrases.map((phrase, index) => (
            <PhraseCard
              key={index}
              phrase={phrase}
              isLoading={isLoading}
              updateGeneratedPhrase={updateGeneratedPhrase}
              savePhrase={savePhrase}
              mode={"browse"}
            />
          ))} */}
          <FlatList
            contentContainerStyle={{
              alignItems: "center",
              rowGap: 8,
              paddingTop: 8,
            }}
            data={phraseData}
            renderItem={({ item }) => (
              <PhraseCard
                phrase={item}
                deletePhrase={deletePhrase}
                mode={"saved"}
              />
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default withTheme(SavedPhrases);
