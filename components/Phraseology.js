// Phraseology.js
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const Stack = createNativeStackNavigator();

/**
 * Renders a component for phraseology selection.
 * @param {Object} DropDownPickerProps - Props for the DropDownPicker component.
 * @returns {JSX.Element} The rendered Phraseology component.
 */
const Phraseology = ({ DropDownPickerProps }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("topical");
  const [modes, setModes] = useState([
    { label: "Topical", value: "topical" },
    { label: "Translate", value: "translate" },
  ]);

  /**
   * Handles the selection of a value.
   * @param {string} value - The selected value.
   * @returns {void}
   */
  const handleSelection = (value) => {
    setMode(value);
    navigation.navigate(value);
  };

  return (
    <DropDownPicker
      arrowIconStyle={{ marginLeft: -20 }}
      tickIconStyle={{ marginLeft: -16, marginRight: -20 }}
      style={{
        width: 100,
        borderColor: "transparent",
        backgroundColor: "transparent",
        // marginTop: -5,
      }}
      dropDownContainerStyle={{
        width: 150,
        alignContent: "center",
        borderRadius: 0,
        borderColor: "lightgray",
        // marginTop: -10,
      }}
      open={open}
      value={mode}
      items={modes}
      setOpen={setOpen}
      setValue={setMode}
      setItems={setModes}
      onChange={(option) => handleSelection(option.label)}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
});

export default Phraseology;
