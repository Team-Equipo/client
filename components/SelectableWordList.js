// SelectableWordList.js
import React, { useCallback } from "react";
import { FlatList, TouchableOpacity, Text } from "react-native";

const SelectableWordList = ({ data, onSelectWord }) => {
  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity onPress={() => onSelectWord(item)}>
        <Text style={{ fontSize: 20 }}>{item + " "}</Text>
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
