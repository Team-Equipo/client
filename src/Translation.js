// Translation.js
import React from "react";
import {
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
  TextInput,
  Button,
  withTheme,
  Text,
} from "react-native-paper";
// import DropDown from "react-native-paper-dropdown";

const Translation = ({ navigation }) => {
  const [textToTranslate, setTextToTranslate] = React.useState("");
  const [translation, setTranslation] = React.useState("");

  const handleTranslationText = (text) => {
    setTextToTranslate(text);
    if (text == "Hello world, what's up?") {
      setTranslation("Hola mundo, ¿Qué tal?");
    } else {
      setTranslation("Sorry, I don't have a translation for that yet.");
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
        rowGap="50%"
        paddingRight="0.5%"
        paddingLeft="0.5%"
      >
        <TextInput
          mode="flat"
          placeholder="English"
          multiline={true}
          value={textToTranslate}
          onChangeText={(text) => handleTranslationText(text)}
        />
        <TextInput
          mode="flat"
          placeholder="Spanish"
          multiline={true}
          disabled={true}
          value={translation}
          //value={translatedText}
          outlineColor="lightgray"
        />
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
