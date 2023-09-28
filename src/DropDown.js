import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const Dropdown = ({ options, selectedOption, onSelect }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.header}>
        <Text>{selectedOption}</Text>
      </TouchableOpacity>

      {isDropdownVisible && (
        <View style={styles.dropdown}>
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => {onSelect(item); toggleDropdown();}}>
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  header: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: 130,
    
  },
  dropdown: {
    position: 'absolute',
    top: 40, // Adjust this to control the dropdown's position
    left: 0,
    right: 0,
    borderWidth: 1,
    borderColor: '#ccc',
    maxHeight: 150, // Set a maximum height for the dropdown
    backgroundColor: 'white',
  },
});

export default Dropdown;
