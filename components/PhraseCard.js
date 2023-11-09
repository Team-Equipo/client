import React from "react";
import { Dimensions, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { IconButton, Card, Text, ActivityIndicator } from "react-native-paper";
import { useState } from "react";

export default function PhraseCard({
  phrase,
  isLoading,
  updateGeneratedPhrase,
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
          <Card.Content style={styles.cardContent}>
            <Pressable onPress={() => togglePhrase()}>
              <Text variant="titleLarge">
                {isToggled ? phrase.text_original : phrase.text_translated}
              </Text>
            </Pressable>
          </Card.Content>
          <Card.Actions>
            <IconButton icon="bookmark-box-multiple-outline" mode="default" />
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
          </Card.Actions>
        </Card>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("window").width - 20,
  },
  cardCover: {
    height: 30,
  },
  cardContent: {
    justifyContent: "center",
  },
});
