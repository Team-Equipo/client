import { Keyboard, TouchableWithoutFeedback } from "react-native";

// Hide keyboard when not in use
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default DismissKeyboard;
