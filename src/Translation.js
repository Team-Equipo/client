// Translation.js
import React from "react";
import {
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import {
  Appbar,
  Title,
  Snackbar,
  // TextInput,
  Button,
  withTheme,
  Text,
} from "react-native-paper";
// import DropDown from "react-native-paper-dropdown";

const Translation = ({ navigation }) => {
  const [textToTranslate, setTextToTranslate] = React.useState("");
  const [translation, setTranslation] = React.useState("");
  const [inputLabel, setInputLabel] = React.useState(null);

  const handleTranslationText = (text) => {
    setTextToTranslate(text);
    if (text != "") {
      setInputLabel("English");
      if (text == "Hello world, what's up?") {
        setTranslation("Hola mundo, ¿Qué tal?");
      } else {
        setTranslation("Sorry, I don't have a translation for that yet.");
      }
    } else {
      setInputLabel(null);
    }
  };
  /*
  // display the right text prompt in response to dropdown
  const handleSetPlan = (text) => {
    setPlan(text);
    if (text != null) {
      setPlanPromptVisible(true);
      setPlanPrompt(planPrompts[text]);
    } else {
      setPlanPromptVisible(false);
    }
  }; */

  return (
    <SafeAreaView>
      <View
        style={{ height: "100%" }}
        rowGap="4%"
        paddingRight="0.5%"
        paddingLeft="0.5%"
      >
        <Text style={{ paddingTop: "1%", textAlign: "center", fontSize: 20 }}>
          English
        </Text>
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "lightgray",
            borderRadius: 10,
            padding: "1%",
            marginLeft: "1%",
            marginRight: "1%",
            fontSize: 16,
          }}
          label={inputLabel}
          multiline
          value={textToTranslate}
          onChangeText={(text) => handleTranslationText(text)}
        />
        <Text style={{ paddingTop: "1%", textAlign: "center", fontSize: 20 }}>
          Spanish
        </Text>
        <Text
          style={{
            flex: 1,
            borderWidth: 1,
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
