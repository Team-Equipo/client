import { speak, isSpeakingAsync } from "expo-speech";
import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, View, SafeAreaView } from "react-native";
import {
  IconButton,
  Card,
  Text,
  ActivityIndicator,
  TouchableRipple,
} from "react-native-paper";

import LabeledIconButton from "../components/LabeledIconButton.js";
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
        speak(phrase.text_translated, { language: "en" });
      } else {
        speak(phrase.text_original, { language: "es" });
      }

      // Continue checking isSpeakingAsync until it returns false
      while (await isSpeakingAsync()) {
        await new Promise((resolve) => setTimeout(resolve, 100));
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
                          updateGeneratedPhrase(
                            phrase.userid,
                            phrase.generated_phrases_id,
                          );
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
