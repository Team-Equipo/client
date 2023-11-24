// SelectableWordList.js
import React from "react";
import { FlatList, TouchableOpacity, Text } from "react-native";

const SelectableWordList = ({ data, onSelectWord }) => {
  return (
    <FlatList
      numColumns={1000}
      columnWrapperStyle={{
        flexWrap: "wrap",
      }}
      data={data.split(" ")}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onSelectWord(item)}>
          <Text style={{ fontSize: 20 }}>{item + " "}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default SelectableWordList;
