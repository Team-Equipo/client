import React from "react";
import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Pressable,
  View,
} from "react-native";
import {
  IconButton,
  Card,
  Text,
  ActivityIndicator,
  TouchableRipple,
} from "react-native-paper";
import { useState } from "react";

export default function PhraseCard({
  phrase,
  isLoading,
  updateGeneratedPhrase,
  savePhrase,
  deletePhrase,
  mode,
}) {
  const [isToggled, setIsToggled] = useState(true);

  const togglePhrase = () => {
    setIsToggled(!isToggled);
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
            borderless={true}
            style={{ borderRadius: 10 }}
            onPress={() => togglePhrase()}
          >
            <>
              <Card.Content style={styles.cardContent}>
                <Text variant="titleLarge" style={{ marginTop: 10 }}>
                  {isToggled ? phrase.text_translated : phrase.text_original}
                </Text>
              </Card.Content>
              <Card.Actions>
                {mode !== "saved" ? (
                  <>
                    <IconButton
                      icon="bookmark-box-multiple-outline"
                      mode="default"
                      onPress={() => {
                        savePhrase(phrase);
                      }}
                    />
                    <IconButton
                      icon="cached"
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
  },
  cardCover: {
    height: 30,
  },
  cardContent: {
    justifyContent: "center",
  },
});
