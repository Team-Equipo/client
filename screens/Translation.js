// Translation.js
import React, { useEffect, useState } from "react";
import { Text, TextInput, StyleSheet, View, SafeAreaView } from "react-native";
import { Button, withTheme } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import HideKeyboard from "../components/HideKeyboard";

const Translation = ({ navigation }) => {
  const [textToTranslate, setTextToTranslate] = React.useState("");
  const [translation, setTranslation] = React.useState("");
  const [inputLang, setInputLang] = React.useState("English");
  const [outputLang, setOutputLang] = React.useState("Spanish");

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("translate");
  const [modes, setModes] = useState([
    { label: "Topical", value: "topical" },
    { label: "Translate", value: "translate" },
  ]);

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

  const handleSelection = (value) => {
    setMode(value);
    navigation.navigate(value);
  };

  return (
    <SafeAreaView>
      <View
        style={{ height: "100%" }}
        rowGap={4}
        paddingRight={2}
        paddingLeft={2}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.languageLabel}>{inputLang}</Text>
          <View
            style={{
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
              style={{ width: 160, marginLeft: -11 }}
            >
              Swap Languages
            </Button>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              zIndex: 2,
            }}
          >
            <Text style={styles.languageLabel}>{inputLang}</Text>
            <View style={{ marginBottom: -20, marginRight: -10 }}>
              <DropDownPicker
                arrowIconStyle={{ marginLeft: -20 }}
                tickIconStyle={{ marginLeft: -16, marginRight: -20 }}
                style={{
                  width: 100,
                  borderColor: "transparent",
                  backgroundColor: "transparent",
                  marginTop: -5,
                }}
                dropDownContainerStyle={{
                  width: 150,
                  alignContent: "center",
                  borderRadius: 0,
                  borderColor: "lightgray",
                  marginTop: -10,
                }}
                open={open}
                value={mode}
                items={modes}
                setOpen={setOpen}
                setValue={setMode}
                setItems={setModes}
                onChange={(option) => handleSelection(option.label)}
              />
            </View>
          </View>
          <TextInput
            style={styles.textBox}
            multiline
            value={textToTranslate}
            onChangeText={(text) => handleTranslationText(text, inputLang)}
          />
          <Text style={styles.languageLabel}>{outputLang}</Text>
          <Text
            style={styles.textBox}
            multiline
            maxFontSizeMultiplier={100}
            outlineColor="lightgray"
          >
            {translation}
          </Text>
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
    borderWidth: 2,
    borderColor: "lightgray",
    borderRadius: 10,
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
  },
});

export default withTheme(Translation);
