import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Button, Text, Card } from "react-native-paper";
import { useState, useEffect } from "react";

import { createClient } from "pexels";
const client = createClient(
  "vVKj2y1hBaXj3Rm1fR1iwXyrl7xTxfcqU28QFSRQDFkWWvXBXTnaII48",
);

async function searchPexels(query, perPage) {
  const result = await client.photos.search({ query, per_page: perPage });
  const randomIndex = Math.floor(Math.random() * result.photos.length);
  return result.photos[randomIndex].src.original;
}

export default function Phrase() {
  const [isToggled, setIsToggled] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const toggleText = () => {
    setIsToggled(!isToggled);
  };

  useEffect(() => {
    async function getImageUrl() {
      const url = await searchPexels("public bathroom", 1);
      setImageUrl(url);
      setIsLoading(false);
    }
    getImageUrl();
  }, []);

  return (
    <View style={styles.container}>
      <Card>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Card.Cover source={{ uri: imageUrl }} />
        )}
        <Card.Title title="Public facilities" />
        <Card.Content>
          <TouchableOpacity onPress={toggleText}>
            <Text variant="bodyLarge">
              {isToggled ? "Where is the bathroom?" : "¿Dónde está el baño?"}
            </Text>
          </TouchableOpacity>
        </Card.Content>
        <Card.Actions>
          <Button>Save</Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
