// Translation.js
import React, { useEffect } from "react";
import { TextInput, StyleSheet, View, SafeAreaView } from "react-native";
import { Button, withTheme, Text } from "react-native-paper";

const Translation = ({ navigation }) => {
  const [textToTranslate, setTextToTranslate] = React.useState("");
  const [translation, setTranslation] = React.useState("");
  const [inputLang, setInputLang] = React.useState("English");
  const [outputLang, setOutputLang] = React.useState("Spanish");

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
        setTranslation("Sorry, I don't have a translation for that yet.");
      }
    } else if (inputLang == "Spanish") {
      if (text == "Hola mundo") {
        setTranslation("Hello world");
      } else {
        setTranslation("Sorry, I don't have a translation for that yet.");
      }
    }
  };

  const toggleLang = () => {
    if (inputLang == "English") {
      setInputLang("Spanish");
      setOutputLang("English");
    } else if (inputLang == "Spanish") {
      setInputLang("English");
      setOutputLang("Spanish");
    }
    handleTranslationText(textToTranslate);
  };

  return (
    <SafeAreaView>
      <View
        style={{ height: "100%" }}
        rowGap="4%"
        paddingRight="0.5%"
        paddingLeft="0.5%"
      >
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              paddingTop: "1%",
              paddingLeft: "2%",
              fontSize: 20,
              color: "gray",
            }}
          >
            {inputLang}
          </Text>
          <View
            style={{ flex: 1, flexDirection: "row" }}
            justifyContent="flex-end"
          >
            <Button mode="text" onPress={toggleLang}>
              Swap Languages
            </Button>
          </View>
        </View>
        <TextInput
          style={{
            flex: 1,
            borderWidth: 2,
            borderColor: "lightgray",
            borderRadius: 10,
            padding: "1%",
            marginLeft: "1%",
            marginRight: "1%",
            marginBottom: "1%",
            fontSize: 16,
          }}
          multiline
          value={textToTranslate}
          onChangeText={(text) => handleTranslationText(text, inputLang)}
        />
        <Text
          style={{
            paddingTop: "1%",
            paddingLeft: "2%",
            fontSize: 20,
            color: "gray",
          }}
        >
          {outputLang}
        </Text>
        <Text
          style={{
            flex: 1,
            borderWidth: 2,
            borderColor: "lightgray",
            borderRadius: 10,
            padding: "1%",
            marginLeft: "1%",
            marginRight: "1%",
            marginBottom: "1%",
            fontSize: 16,
          }}
          multiline
          maxFontSizeMultiplier={100}
          //value={translatedText}
          outlineColor="lightgray"
        >
          {translation}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 20,
    justifyContent: "space-around",
    textAlign: "center",
  },
});

export default withTheme(Translation);
