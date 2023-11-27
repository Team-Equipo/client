import { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, Text } from "react-native";
import { Portal, Modal } from "react-native-paper";

import WordSearchWebView from "../components/WordSearchWebView";
import PhraseCard from "../components/PhraseCard";
import { translateStyles } from "../styles/globalStyles";

const USER = 1;

export default function Phrase() {
  const [isLoading, setIsLoading] = useState(true);
  const [generatedPhrases, setGeneratedPhrases] = useState([]);
  const [searchedWord, setSearchedWord] = React.useState("");
  const [wordRefEndpoint, setWordRefEndpoint] = useState(
    "https://www.wordreference.com/es/en/translation.asp?spen=",
  );
  const [wordRefVisible, setWordRefVisible] = useState(false);

  // Function to filter punctuation out of selected word, pull up dictionary
  // modal for selected word
  const selectWord = (word) => {
    setSearchedWord(word.replace(/[¡!"#$%&'()*+,-./:;<=>¿?@[\]^_`{|}~]/g, ""));
    setWordRefVisible(true);
  };

  const fetchGeneratedPhrases = async () => {
    try {
      const response = await fetch(
        `https://jk249.azurewebsites.net/user/${USER}/phrase`,
      );
      const json = await response.json();
      setGeneratedPhrases(json);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPhrase = async (userID, phraseID, index) => {
    try {
      const response = await fetch(
        `https://jk249.azurewebsites.net/user/${userID}/phrase/${phraseID}`,
      );
      const json = await response.json();
      const updatedPhrases = [...generatedPhrases];
      updatedPhrases[index] = json;
      setGeneratedPhrases(updatedPhrases);
    } catch (error) {
      console.log(error);
    }
  };

  const updateGeneratedPhrase = async (userID, phraseID) => {
    const updatedPhrases = [...generatedPhrases];
    const index = updatedPhrases.findIndex(
      (phrase) => phrase.generated_phrases_id === phraseID,
    );
    updatedPhrases[index].isloading = true;
    setGeneratedPhrases(updatedPhrases);

    const data = {
      user_id: userID,
      phrase_id: phraseID,
    };

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch("https://llama.kenarnold.org/update_phrase", options)
      .then(() => fetchPhrase(userID, phraseID, index))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchGeneratedPhrases();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Portal>
        {/* Wordreference popup */}
        <Modal
          visible={true}
          onDismiss={() => setWordRefVisible(false)}
          contentContainerStyle={translateStyles.modalContainer}
        >
          <WordSearchWebView
            endpoint={wordRefEndpoint}
            searchedWord={searchedWord}
          />
        </Modal>
      </Portal>
      <View>
        {generatedPhrases.map((phrase, index) => (
          <PhraseCard
            key={index}
            phrase={phrase}
            isLoading={isLoading}
            updateGeneratedPhrase={updateGeneratedPhrase}
            onSelectWord={selectWord}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
});
