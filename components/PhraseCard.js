// PhraseCard.js
import { speak, isSpeakingAsync } from "expo-speech";
import React, { useState } from "react";
import { Dimensions, StyleSheet, View, SafeAreaView } from "react-native";
import { Card, ActivityIndicator, TouchableRipple } from "react-native-paper";

import LabeledIconButton from "../components/LabeledIconButton.js";
import SelectableWordList from "../components/SelectableWordList.js";

/**
 * Renders a card component for displaying a phrase.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.phrase - The phrase object.
 * @param {boolean} props.isLoading - Indicates if the phrase is currently loading.
 * @param {Function} props.updateGeneratedPhrase - Function to update the generated phrase.
 * @param {Function} props.savePhrase - Function to save the phrase.
 * @param {Function} props.deletePhrase - Function to delete the phrase.
 * @param {string} props.mode - The mode of the phrase card.
 * @param {Function} props.onSelectEnglishWord - Function to select an English word.
 * @param {Function} props.onSelectSpanishWord - Function to select a Spanish word.
 * @param {Function} props.drag - Function to handle drag events.
 * @returns {JSX.Element} The rendered PhraseCard component.
 */
export default function PhraseCard({
  phrase,
  isLoading,
  updateGeneratedPhrase,
  savePhrase,
  deletePhrase,
  mode,
  onSelectEnglishWord,
  onSelectSpanishWord,
  drag,
}) {
  const [inUserLang, setInUserLang] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const togglePhrase = () => {
    setInUserLang(!inUserLang);
  };

  const speakPhrase = async () => {
    try {
      setIsSpeaking(true);

      if (inUserLang) {
        speak(phrase.translatedtext, { language: "en" });
      } else {
        speak(phrase.originaltext, { language: "es" });
      }

      // Continue checking isSpeakingAsync until it returns false
      let stopCount = 0;

      while (true) {
        await new Promise((resolve) => setTimeout(resolve, 100));

        if (!(await isSpeakingAsync())) {
          stopCount++;

          // Check if isSpeakingAsync() has returned false more than two times
          if (stopCount > 2) {
            break; // Exit the loop
          }
        } else {
          stopCount = 0; // Reset the counter if isSpeakingAsync() returns true
        }
      }
    } catch (error) {
      console.error("Error speaking phrase:", error);
    } finally {
      setIsSpeaking(false);
    }
  };

  return (
    <SafeAreaView>
      {isLoading || phrase.isloading ? (
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <ActivityIndicator />
          </Card.Content>
        </Card>
      ) : (
        <Card style={styles.card}>
          <TouchableRipple
            borderless
            style={{ borderRadius: 10 }}
            onPress={() => togglePhrase()}
            onLongPress={drag}
            delayLongPress={100}
          >
            <>
              <Card.Content style={styles.cardContent}>
                {inUserLang ? (
                  <SelectableWordList
                    data={phrase.translatedtext}
                    onSelectWord={onSelectEnglishWord}
                  />
                ) : (
                  <SelectableWordList
                    data={phrase.originaltext}
                    onSelectWord={onSelectSpanishWord}
                  />
                )}
              </Card.Content>
              <Card.Actions>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  <LabeledIconButton
                    icon="translate"
                    label={inUserLang ? "Spanish" : "English"}
                    mode="default"
                  />
                  <LabeledIconButton
                    icon="volume-high"
                    label="Speak"
                    mode="default"
                    disabled={isSpeaking}
                    onPress={speakPhrase}
                  />
                  {mode !== "saved" ? (
                    <>
                      <LabeledIconButton
                        icon="download"
                        label="Save"
                        mode="default"
                        onPress={() => {
                          savePhrase(phrase);
                        }}
                      />
                      <LabeledIconButton
                        icon="shuffle-variant"
                        label="Regen."
                        mode="default"
                        onPress={() => {
                          updateGeneratedPhrase(phrase.userid, phrase.id);
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <LabeledIconButton
                        icon="delete"
                        label="Delete"
                        mode="default"
                        onPress={() => {
                          deletePhrase(phrase);
                        }}
                      />
                    </>
                  )}
                </View>
              </Card.Actions>
            </>
          </TouchableRipple>
        </Card>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("window").width - 20,
    backgroundColor: "white",
    marginTop: 8,
  },
  cardCover: {
    height: 30,
  },
  cardContent: {
    paddingTop: 10,
    justifyContent: "center",
  },
});
