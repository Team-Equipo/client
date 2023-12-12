// LabeledIconButton.js
import { View, StyleSheet } from "react-native";
import { IconButton, Text } from "react-native-paper";

// Custom component combining IconButton and Text
const LabeledIconButton = ({ icon, label, ...props }) => {
  return (
    <View style={styles.container}>
      <IconButton style={styles.button} {...props} icon={icon} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: 60,
  },
  button: {
    zIndex: 0,
  },
  label: {
    marginTop: -15,
    zIndex: -1,
    fontSize: 9,
  },
});

export default LabeledIconButton;
