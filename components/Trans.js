import { StyleSheet, Text, View, Button } from "react-native";
import { useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import TransTextInput from "./Text2";
import DropDown from "./DropDown";

export default function Translator_Content() {
  const [selectedOption, setSelectedOption] = useState("Select Language");
  const options = ["Spanish", "Chinese", "Korean"];
  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <View style={styles.TranslatorContainer}>
      <View style={styles.ButtonsContainer}>
        <View style={styles.ButtonContainer}>
          <Text style={{ fontSize: 25 }}>English</Text>
        </View>
        <Icon name="rightsquare" size={45} color="#000" />
        <View style={styles.ButtonContainer}>
          <DropDown
            options={options}
            selectedOption={selectedOption}
            onSelect={handleSelect}
          />
        </View>
      </View>
      <View style={styles.TransTypeContainer}>
        <TransTextInput />
      </View>
      <View style={styles.TransOutputContainer}>
        <Text style={{ fontSize: 18 }} multiline={true} numberOfLines={4}>
          The translation result will show up here. I'm just typing anything to
          check whether multiline is working well or not.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  TranslatorContainer: {
    width: 315,
    height: 300,
    borderWidth: 1.5,
    flexDirection: "column",
  },
  ButtonsContainer: {
    width: 310,
    height: 50,
    flexDirection: "row",
    zIndex: 100,
  },
  ButtonContainer: {
    width: 133,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: "auto",
  },
  TransTypeContainer: {
    width: 312,
    height: 124.5,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    zIndex: 0,
  },
  TransOutputContainer: {
    width: 312,
    height: 124.5,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
});
