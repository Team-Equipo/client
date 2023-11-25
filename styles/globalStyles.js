// import * as Font from "expo-font";
import * as Font from "expo-font";
import { StyleSheet } from "react-native";
import { configureFonts, DefaultTheme } from "react-native-paper";

// const customFonts = {
//   "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
//   "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
//   "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
//   "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
//   "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
// };

// // Load custom fonts asynchronously
// const loadFontsAsync = async () => {
//   await Font.loadAsync(customFonts);
// };

// // Call the loadFontsAsync function
// loadFontsAsync();

// STYLES
// mostly used in Phrases.js
export const phraseStyles = StyleSheet.create({
  textBox: {
    borderColor: "white",
    borderRadius: 15,
    padding: "2%",
    marginHorizontal: "2%",
    marginBottom: 5,
    fontSize: 18,
    backgroundColor: "white",
  },
  topicBox: {
    marginHorizontal: 2,
    marginVertical: 2,
  },
  modalStyle: {
    backgroundColor: "white",
    borderRadius: 15,
    marginTop: "20%",
    marginBottom: "20%",
    marginLeft: "10%",
    marginRight: "10%",
    alignSelf: "center",
  },
  background: {
    flex: 1,
    backgroundColor: "#CDF5FD",
  },
  genPhrases: {
    fontSize: 15,
    paddingVertical: 2,
    paddingHorizontal: 3,
  },
  genPhraseBox: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: "#CDF5FD",
    borderRadius: 15,
    padding: "2%",
    marginHorizontal: "2%",
    marginBottom: "2%",
    fontSize: 18,
    backgroundColor: "white",
  },
});

// mostly used in Signin.js
export const signinStyles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 196,
    height: 196,
    marginTop: 100,
    marginBottom: 32,
    alignSelf: "center",
  },
  imageContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textInputWrapper: {
    width: "80%",
    display: "flex",
  },
  textInput: {
    display: "flex",
    marginBottom: 20,
    fontSize: 14,
  },
  button: {
    marginTop: 10,
    width: "80%",
    display: "flex",
    gap: 10,
  },
  buttonText: {
    fontFamily: "Poppins-Bold",
  },
  divText: {
    textAlign: "center",
    color: "#ADC4CE",
    margin: 10,
  },
  totalWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    // backgroundColor: "#CDF5FD",
    backgroundColor: "white",
    paddingBottom: "80%",
    paddingTop: "8%",
    borderRadius: 32,
  },
});

export const signupStyles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    alignItems: "center",
  },
  image: {
    display: "flex",
    width: "60%",
    height: "40%",
    marginTop: "28%",
    marginBottom: "2%",
    alignSelf: "center",
  },
  textInputWrapper: {
    width: "80%",
    display: "flex",
  },
  textInput: {
    display: "flex",
    marginBottom: 10,
    backgroundColor: "#F5F7F8",
    fontSize: 14,
  },
  buttonWrapper: {
    width: "80%",
    display: "flex",
    gap: 10,
    alignItems: "center",
  },
  button: {
    borderRadius: 10,
    marginTop: 10,
    width: "88%",
    display: "flex",
    paddingVertical: 5,
  },
  buttonText: {
    //fontFamily: "Poppins-Bold",
    fontSize: 15,
    color: "white",
  },
  signupText: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  divText: {
    //fontFamily: "Poppins-Light",
    textAlign: "center",
    color: "#ADC4CE",
    margin: 3,
  },
  bottomText: {
    //fontFamily: "Poppins-Regular",
    color: "gray",
    fontSize: 13,
  },
  signinTouchable: {
    //fontFamily: "Poppins-Bold",
    color: "#3BC4E2",
    fontSize: 13,
  },
  totalWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    // backgroundColor: "#CDF5FD",
    backgroundColor: "white",
    width: "85%",
  },
});

export const settingsStyle = StyleSheet.create({
  titleText: {
    fontFamily: "Poppins-ExtraBold",
    fontSize: 25,
    alignSelf: "center",
    paddingVertical: 20,
    paddingTop: "22%",
  },
  titleText2: {
    fontFamily: "Poppins-ExtraBold",
    fontSize: 25,
    alignSelf: "center",
    paddingVertical: 20,
    paddingTop: "22%",
    color: "#2C3333",
  },
  titleText3: {
    fontFamily: "Poppins-ExtraBold",
    fontSize: 25,
    alignSelf: "center",
    paddingVertical: 20,
    paddingTop: "22%",
    color: "#2E4F4F",
  },
  image: {
    display: "flex",
    width: "66%",
    height: "34%",
    marginTop: "6%",
    marginBottom: "12%",
    alignSelf: "center",
  },
  textInput: {
    display: "flex",
    marginBottom: 10,
    backgroundColor: "#F5F7F8",
    fontSize: 14,
  },
  button: {
    borderRadius: 10,
    marginTop: 10,
    width: "88%",
    display: "flex",
    paddingVertical: 5,
    justifyContent: "center",
    alignSelf: "center",
  },
  textInputWrapper: {
    width: "80%",
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
  },
  textInputDescription: {
    fontFamily: "Poppins-Bold",
    color: "#83A2FF",
    marginTop: "1%",
  },
  buttonText: {
    fontFamily: "Poppins-Bold",
    fontSize: 15,
    color: "white",
  },
});

// used by "All Set Screen"
export const allSetStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    fontFamily: "Poppins-ExtraBold",
    fontSize: 32,
    fontWeight: "bold",
    alignSelf: "center",
    paddingVertical: 20,
    paddingTop: "40%",
  },
  image: {
    // display: "flex",
    width: "49%",
    height: "50%",
    marginTop: "28%",
    marginBottom: "2%",
    alignSelf: "center",
  },
  button: {
    borderRadius: 10,
    marginTop: 10,
    width: "66%",
    display: "flex",
    paddingVertical: 5,
    alignSelf: "center",
  },
  buttonText: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  animation: {
    width: "100%",
    aspectRatio: 1,
  },
});

export const appHeaderBarStyles = StyleSheet.create({
  appbar: {
    flex: 0,
    backgroundColor: "cornflowerblue",
    marginTop: "-2%",
    justifyContent: "center",
  },
});

export const translateStyles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#CDF5FD",
  },
  textBox: {
    flex: 1,
    zIndex: 1,
    // borderWidth: 1,
    // borderColor: "#CDF5FD",
    borderRadius: 15,
    backgroundColor: "white",
    paddingTop: 5,
    paddingHorizontal: 10,
    marginHorizontal: "2%",
    marginBottom: "1%",
    fontSize: 16,
  },
  languageLabel: {
    paddingTop: "1%",
    paddingLeft: "4%",
    fontSize: 20,
    color: "gray",
    textAlign: "left",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    marginTop: "20%",
    marginBottom: "20%",
    alignSelf: "center",
  },
});

export const savedPhrases = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#CDF5FD",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    marginTop: "20%",
    marginBottom: "20%",
    marginLeft: "10%",
    marginRight: "10%",
    alignSelf: "center",
  },
  savedPhrasesList: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: "1.5%",
    marginVertical: "1.25%",
    borderRadius: 20,
  },
});

export const shadows = StyleSheet.create({
  shadow4: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 4,
  },
});

// THEMES
export const signinTheme = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: {
    ...DefaultTheme.colors,
    // primary: "#51c3f5",
    primary: "#87C4FF",
    // primary: "#F5587B",
    secondary: "#5272F2",
    text: "black",
    // outline: "#51c3f5",
    outline: "#FFBDD4",
    backgroundColor: "#5272F2",
    elevation: {
      // level1: "#39A7FF",
      level1: "#3BC4E2",
    },
  },
};

export const settingsTheme = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: {
    ...DefaultTheme.colors,
    // primary: "#51c3f5",
    primary: "#87C4FF",
    // primary: "#F5587B",
    secondary: "#5272F2",
    text: "black",
    // outline: "#51c3f5",
    outline: "#FFBDD4",
    backgroundColor: "#5272F2",
    elevation: {
      // level1: "#39A7FF",
      level1: "#3BC4E2",
    },
  },
};

export const phraseTheme = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: {
    ...DefaultTheme.colors,
    // primary: "#51c3f5",
    primary: "#5272F2",
    // primary: "#F5587B",
    secondary: "#5272F2",
    text: "black",
    // outline: "#51c3f5",
    outline: "#FFBDD4",
    backgroundColor: "#5272F2",
    elevation: {
      level1: "white",
    },
  },
};

export const translationTheme = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: {
    ...DefaultTheme.colors,
    // primary: "#51c3f5",
    primary: "#5272F2",
    // primary: "#F5587B",
    secondary: "#5272F2",
    text: "black",
    // outline: "#51c3f5",
    outline: "#FFBDD4",
    backgroundColor: "#5272F2",
    elevation: {
      level1: "white",
    },
  },
};

// // Fonts
// const baseFont = {
//   fontFamily: "Poppins-Regular",
//   fontSize: 12,
//   color: "black",
// };

// const baseVariants = configureFonts({ config: baseFont });

// const fontConfig = {
//   default: {
//     regular: {
//       fontFamily: "Poppins-Regular",
//       fontSize: 14,
//       fontWeight: "normal",
//     },
//     bold: {
//       fontFamily: "Poppins-Bold",
//       fontSize: 14,
//       fontWeight: "normal",
//     },
//     extraBold: {
//       fontFamily: "Poppins-ExtraBold",
//       fontSize: 14,
//       fontWeight: "normal",
//     },
//     light: {
//       fontFamily: "Poppins-Light",
//       fontSize: 14,
//       fontWeight: "normal",
//     },
//     thin: {
//       fontFamily: "Poppins-Thin",
//       fontSize: 14,
//       fontWeight: "normal",
//     },
//   },
// };

// export const fonts = configureFonts({
//   config: {
//     ...baseVariants,
//   },
// });
