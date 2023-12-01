import { speak } from "expo-speech";
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

const emergencyPhrases = [
  {
    id: "1",
    topic: "General",
    phrases: [
      { spanish: "¡Ayuda!", english: "Help!" },
      { spanish: "Llama a la policía", english: "Call the police" },
      { spanish: "¡Aléjate!", english: "Stay away!" },
      { spanish: "¡Estoy perdido/a!", english: "I am lost!" },
    ],
  },
  {
    id: "2",
    topic: "Medical",
    phrases: [
      {
        spanish: "¡Necesito ayuda médica!",
        english: "I need medical assistance!",
      },
      {
        spanish: "¡Se necesita ayuda médica urgente!",
        english: "Urgent medical help is needed!",
      },
      { spanish: "¡Llame a una ambulancia!", english: "Call an ambulance!" },
      { spanish: "¡Estoy herido/a!", english: "I am injured!" },
      { spanish: "¡No puedo respirar!", english: "I can't breathe!" },
    ],
  },
  {
    id: "3",
    topic: "Safety",
    phrases: [
      { spanish: "¡Alto!", english: "Stop!" },
      {
        spanish: "¡Necesito hablar con la embajada!",
        english: "I need to speak to the embassy!",
      },
    ],
  },
  {
    id: "4",
    topic: "Environmental",
    phrases: [
      { spanish: "¡Fuego!", english: "Fire!" },
      { spanish: "¡Necesito agua!", english: "I need water!" },
      { spanish: "¡Hay un accidente!", english: "There is an accident!" },
      { spanish: "¡Hay un terremoto!", english: "There is an earthquake!" },
    ],
  },
];

const InformationScreen = () => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.topic}>{item.topic}</Text>
        {item.phrases.map((phrase, index) => (
          <View key={index} style={styles.phraseContainer}>
            <View style={styles.content}>
              <Text style={styles.spanish}>{phrase.spanish}</Text>
              <Text style={styles.english}>{phrase.english}</Text>
            </View>
            <IconButton
              icon="volume-high"
              color="#3498db"
              size={24}
              onPress={() => speakPhrase(phrase)}
            />
          </View>
        ))}
      </View>
    );
  };

  const speakPhrase = (phrase) => {
    try {
      speak(phrase.spanish, { language: "es" });
    } catch (error) {
      console.error("Error speaking phrase:", error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={emergencyPhrases}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  item: {
    marginBottom: 16,
  },
  topic: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    fontFamily: "Poppins-Bold",
  },
  phraseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  spanish: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e74c3c",
    marginBottom: 8,
    fontFamily: "Poppins-Bold",
  },
  english: {
    fontSize: 15,
    color: "#3498db",
    fontFamily: "Poppins-Regular",
  },
});

export default InformationScreen;
