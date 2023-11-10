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
import DropDownPicker from "react-native-dropdown-picker";
import {
  IconButton,
  Button,
  withTheme,
  Portal,
  Modal,
  PaperProvider,
} from "react-native-paper";
import { WebView } from "react-native-webview";

import HideKeyboard from "../components/HideKeyboard";
import {
  translationTheme,
  shadows,
  translateStyles,
} from "../styles/globalStyles";

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
      <PaperProvider theme={translationTheme}>
        <View style={translateStyles.background}>
          <SafeAreaView>
            <Portal>
              <Modal
                visible={modalVisible}
                onDismiss={() => setModalVisible(false)}
                contentContainerStyle={translateStyles.modalContainer}
              >
                <View
                  style={{
                    overflow: "hidden",
                    width: useWindowDimensions().width * 0.9,
                    flex: 1,
                  }}
                >
                  {wordRefLoading ? (
                    <Text
                      style={{
                        width: "100%",
                        textAlign: "center",
                        paddingTop: 5,
                      }}
                    >
                      Loading...
                    </Text>
                  ) : null}
                  <WebView
                    originWhitelist={["*"]}
                    source={{ uri: wordRefURL + selectedWord }}
                    onLoadStart={() => setWordRefLoading(true)}
                    onLoadProgress={() => setWordRefLoading(false)}
                    style={{ borderRadius: 15, marginTop: -180 }}
                    containerStyle={{ borderRadius: 15 }}
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
                  marginBottom: -43,
                  marginRight: 10,
                  zIndex: 3,
                  alignItems: "flex-end",
                  // marginLeft: "30%",
                  // marginRight: "30%",
                }}
              >
                <IconButton
                  onPress={toggleLang}
                  icon="swap-vertical"
                  iconColor="gray"
                  // compact={true}
                  style={{ width: 25, height: 30, marginTop: 4 }}
                  // labelStyle={{fontSize: 30, color: "gray", fontWeight: "normal"}}
                ></IconButton>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  zIndex: 2,
                  //marginTop: 15,
                }}
              >
                <Text style={translateStyles.languageLabel}>{inputLang}</Text>
              </View>
              <View style={{ ...shadows.shadow4, ...translateStyles.textBox }}>
                <TextInput
                  style={{
                    justifyContent: "flex-start",
                    textAlignVertical: "top",
                    paddingTop: 0,
                    height: "100%",
                    fontSize: 20,
                    //backgroundColor: "blue",
                    marginTop: 0,
                  }}
                  multiline
                  value={textToTranslate}
                  onChangeText={(text) =>
                    handleTranslationText(text, inputLang)
                  }
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={translateStyles.languageLabel}>{outputLang}</Text>
                <Text
                  style={[
                    translateStyles.languageLabel,
                    { fontSize: 12, marginTop: 8, marginRight: 15 },
                  ]}
                >
                  Tap word for dictionary definition
                </Text>
              </View>
              <View
                style={{ ...shadows.shadow4, ...translateStyles.textBox }}
                elevation={3}
              >
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
                      <Text style={{ fontSize: 20 }}>{item + " "}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </SafeAreaView>
        </View>
      </PaperProvider>
    </HideKeyboard>
  );
};

export default withTheme(Translation);
