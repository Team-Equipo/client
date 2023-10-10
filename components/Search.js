import * as React from "react";
import { useState } from "react";
import { StyleSheet, Text, Button, View } from "react-native";

import DropDown from "./DropDown";
import HideKeyboard from "./HideKeyboard";
import TextInputExample from "./Text";
import Translator_Content from "./Trans";

// General Search Components - Would you... + Input word/phrase to search
// + Select language(Spanish/Chinese/Korean) + Learn More Button which navigates to details page

export default function Search_Content() {
  //Those are for Drop Down Button
  const [selectedOption, setSelectedOption] = useState("Select Language");
  const options = ["Spanish", "Chinese", "Korean"];

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <HideKeyboard>
      <View style={styles.Container}>
        <Text style={styles.GreetingContainer}>Hello, Username!</Text>
        <View style={styles.SearchContainer}>
          <Text style={styles.ProposeContainer}>
            {" "}
            Would you like to learn...
          </Text>
          <View style={styles.TextInputContainer}>
            <TextInputExample />
          </View>
          <View style={styles.SelectLangContainer}>
            <Text style={styles.InContainer}> in</Text>
            <DropDown
              options={options}
              selectedOption={selectedOption}
              onSelect={handleSelect}
            />
            <Text style={styles.InContainer}>? </Text>
          </View>
          <Button
            onPress={() => alert("Learn More!")}
            title="Learn More"
            color="#841584"
          />
        </View>
        <Translator_Content />
      </View>
    </HideKeyboard>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
    margin: 2.5,
  },
  GreetingContainer: {
    width: 315,
    height: 40,
    fontSize: 25,
  },
  SearchContainer: {
    width: 315,
    height: 300,
    alignItems: "center",
    borderWidth: 1.5,
    flexDirection: "column",
  },
  ProposeContainer: {
    width: 315,
    height: 300 / 4,
    textAlign: "center",
    textAlignVertical: "bottom",
    fontSize: 25,
  },
  TextInputContainer: {
    width: 315,
    height: 300 / 4,
    alignItems: "center",
    fontSize: 25,
  },
  SelectLangContainer: {
    width: 315,
    height: 300 / 4,
    alignItems: "center",
    flexDirection: "row",
    zIndex: 100,
  },
  InContainer: {
    width: 92.5,
    height: 300 / 4,
    fontSize: 25,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
