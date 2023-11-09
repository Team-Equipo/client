import React from "react";
import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Pressable,
  View,
} from "react-native";
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
          <Pressable onPress={() => togglePhrase()}>
            <Card.Content style={styles.cardContent}>
              <Text variant="titleLarge" style={{ marginTop: 10 }}>
                {isToggled ? phrase.text_original : phrase.text_translated}
              </Text>
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
          </Pressable>
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
