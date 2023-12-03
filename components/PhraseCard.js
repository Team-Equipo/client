import { speak, isSpeakingAsync } from "expo-speech";
import React, { useState, useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { IconButton, Card, Text, ActivityIndicator } from "react-native-paper";

import SelectableWordList from "../components/SelectableWordList.js";

export default function PhraseCard({
  phrase,
  isLoading,
  updateGeneratedPhrase,
  savePhrase,
  deletePhrase,
  mode,
  onSelectEnglishWord,
  onSelectSpanishWord,
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
        speak(phrase.text_translated, { language: "en" });
      } else {
        speak(phrase.text_original, { language: "es" });
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
          <TouchableOpacity
            borderless
            style={{ borderRadius: 10 }}
            onPress={() => togglePhrase()}
          >
            <>
              <Card.Content style={styles.cardContent}>
                {inUserLang ? (
                  <SelectableWordList
                    data={phrase.text_translated}
                    onSelectWord={onSelectEnglishWord}
                  />
                ) : (
                  <SelectableWordList
                    data={phrase.text_original}
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
                  <IconButton icon="translate" mode="default" />
                  <IconButton
                    icon="volume-high"
                    mode="default"
                    disabled={isSpeaking}
                    onPress={speakPhrase}
                  />
                  {mode !== "saved" ? (
                    <>
                      <IconButton
                        icon="download"
                        mode="default"
                        onPress={() => {
                          savePhrase(phrase);
                        }}
                      />
                      <IconButton
                        icon="shuffle-variant"
                        mode="default"
                        onPress={() => {
                          updateGeneratedPhrase(
                            phrase.userid,
                            phrase.generated_phrases_id,
                          );
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <IconButton
                        icon="delete"
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
          </TouchableOpacity>
        </Card>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("window").width - 20,
    backgroundColor: "white",
    marginBottom: 8,
  },
  cardCover: {
    height: 30,
  },
  cardContent: {
    paddingTop: 10,
    justifyContent: "center",
  },
});
