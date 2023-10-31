import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

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
