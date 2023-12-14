// SelectableWordList.js
import React, { useCallback } from "react";
import { FlatList, TouchableOpacity, Text } from "react-native";

/**
 * A component that renders a selectable word list.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.data - The data to be displayed as a word list.
 * @param {function} props.onSelectWord - The callback function to be called when a word is selected.
 * @returns {JSX.Element} The rendered selectable word list component.
 */
const SelectableWordList = ({ data, onSelectWord }) => {
  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity onPress={() => onSelectWord(item)}>
        <Text style={{ fontSize: 18, fontFamily: "Poppins-Regular" }}>
          {item + " "}
        </Text>
      </TouchableOpacity>
    ),
    [],
  );

  return (
    <FlatList
      style={{ marginRight: 1 }}
      numColumns={1000}
      columnWrapperStyle={{
        flexWrap: "wrap",
      }}
      data={data.split(" ")}
      renderItem={renderItem}
    />
  );
};

export default SelectableWordList;
