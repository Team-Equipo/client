import React from 'react';
import {SafeAreaView, StyleSheet, TextInput} from 'react-native';

const TransTextInput = () => {
  const [text, setText] = React.useState('');

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        multiline={true}
        numberOfLines={4}
        onChangeText={(newText) => setText(newText)}
        value={text}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 125,
    padding: 10,
    fontSize: 20,

  },
});

export default TransTextInput;