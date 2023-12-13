// HideKeyboard.js
import { Keyboard, TouchableWithoutFeedback } from "react-native";

// Hide keyboard when not in use
/**
 * Component that dismisses the keyboard when tapped outside of the input fields.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @returns {ReactNode} The wrapped child components.
 */
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default DismissKeyboard;
