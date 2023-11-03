// Translation.js
import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Button, withTheme, Modal, Portal } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import HideKeyboard from "../components/HideKeyboard";
import { WebView } from "react-native-webview";

const Translation = ({ navigation }) => {
  const [textToTranslate, setTextToTranslate] = React.useState("");
  const [translation, setTranslation] = React.useState("");
  const [inputLang, setInputLang] = React.useState("English");
  const [outputLang, setOutputLang] = React.useState("Spanish");
  const [selectedWord, setSelectedWord] = React.useState("");
  const [wordRefURL, setWordRefURL] = React.useState(
    "https://www.wordreference.com/es/en/translation.asp?spen=",
  );
  const [wordRefLoading, setWordRefLoading] = React.useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    handleTranslationText(textToTranslate, inputLang);
  }, [inputLang, textToTranslate]);

  const handleTranslationText = (text) => {
    setTextToTranslate(text);
    if (text == "") {
      setTranslation("");
    } else if (inputLang == "English") {
      if (text == "Hello world") {
        setTranslation("Hola mundo");
      } else {
        setTranslation("Esto es una respuesta genérica...");
      }
    } else if (inputLang == "Spanish") {
      if (text == "Hola mundo") {
        setTranslation("Hello world");
      } else {
        setTranslation("This is a generic response...");
      }
    }
  };

  const toggleLang = () => {
    if (inputLang == "English") {
      setInputLang("Spanish");
      setOutputLang("English");
      setWordRefURL(
        "https://www.wordreference.com/es/translation.asp?tranword=",
      );
    } else if (inputLang == "Spanish") {
      setInputLang("English");
      setOutputLang("Spanish");
      setWordRefURL(
        "https://www.wordreference.com/es/en/translation.asp?spen=",
      );
    }
    handleTranslationText(textToTranslate);
  };

  function showModal(item) {
    setModalVisible(true);
  }

  function hideModal() {
    setModalVisible(false);
  }

  function selectWord(word) {
    setSelectedWord(word.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, ""));
    showModal();
  }

  return (
    <HideKeyboard>
      <SafeAreaView>
        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
            contentContainerStyle={{
              backgroundColor: "white",
              borderRadius: 10,
              marginTop: "20%",
              marginBottom: "20%",
              marginLeft: "10%",
              marginRight: "10%",
              alignSelf: "center",
            }}
          >
            <View
              style={{
                width: useWindowDimensions().width * 0.8,
                flex: 1,
              }}
            >
              {wordRefLoading ? (
                <Text
                  style={{ width: "100%", textAlign: "center", paddingTop: 5 }}
                >
                  Loading...
                </Text>
              ) : null}
              <WebView
                originWhitelist={["*"]}
                source={{ uri: wordRefURL + selectedWord }}
                onLoadStart={() => setWordRefLoading(true)}
                onLoadProgress={() => setWordRefLoading(false)}
                style={{ borderRadius: 10 }}
              />
            </View>
          </Modal>
        </Portal>
        <View
          style={{
            height: "100%",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
          rowGap={4}
          paddingRight={2}
          paddingLeft={2}
        >
          <View
            style={{
              paddingTop: 5,
              marginBottom: -30,
              zIndex: 3,
              alignItems: "center",
              marginLeft: "30%",
              marginRight: "30%",
            }}
          >
            <Button
              mode="text"
              onPress={toggleLang}
              icon="sync"
              compact={true}
              style={{ width: 160, paddingTop: 3 }}
              contentStyle={{ marginBottom: -5, marginTop: -5 }}
            >
              Swap Languages
            </Button>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              zIndex: 2,
            }}
          >
            <Text style={styles.languageLabel}>{inputLang}</Text>
          </View>
          <TextInput
            style={styles.textBox}
            multiline
            value={textToTranslate}
            onChangeText={(text) => handleTranslationText(text, inputLang)}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.languageLabel}>{outputLang}</Text>
            <Text
              style={[
                styles.languageLabel,
                { fontSize: 10, marginTop: 10, marginRight: 15 },
              ]}
            >
              Tap on a word to get its dictionary definition
            </Text>
          </View>
          <View style={styles.textBox} outlineColor="lightgray">
            <FlatList
              numColumns={10}
              columnWrapperStyle={{
                flexWrap: "wrap",
              }}
              data={translation.split(" ")}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    selectWord(item);
                  }}
                >
                  <Text>{item + " "}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </SafeAreaView>
    </HideKeyboard>
  );
};

const styles = StyleSheet.create({
  textBox: {
    flex: 1,
    zIndex: 1,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 10,
    backgroundColor: "white",
    padding: "1%",
    marginLeft: "1%",
    marginRight: "1%",
    marginBottom: "1%",
    fontSize: 16,
  },
  languageLabel: {
    paddingTop: "1%",
    paddingLeft: "2%",
    fontSize: 20,
    color: "gray",
    textAlign: "left",
  },
});

export default withTheme(Translation);
