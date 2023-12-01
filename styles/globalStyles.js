import { StyleSheet } from "react-native";
import { DefaultTheme, configureFonts } from "react-native-paper";

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
    borderRadius: 40,
    backgroundColor: "#F084B4",
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
    // backgroundColor: "#CDF5FD",
    backgroundColor: "#F0F0F0",
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

// used in SignInScreen.js and SignUpScreen.js
export const signStyles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
  container: {
    marginTop: 10,
    flex: 1,
    alignItems: "center",
  },
  image: {
    display: "flex",
    width: "50%",
    height: "36%",
    marginTop: "15%",
    marginBottom: "3%",
    alignSelf: "center",
  },
  imageGirl: {
    display: "flex",
    width: "50%",
    height: "46%",
    marginTop: "15%",
    marginBottom: "3%",
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
    fontFamily: "Poppins-Bold",
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
  signupText: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  divText: {
    fontFamily: "Poppins-Light",
    textAlign: "center",
    color: "#ADC4CE",
    margin: 3,
  },
  bottomText: {
    fontFamily: "Poppins-Regular",
    color: "gray",
    fontSize: 13,
  },
  signinTouchable: {
    fontFamily: "Poppins-Bold",
    color: "#3BC4E2",
    fontSize: 13,
    fontWeight: "bold",
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
  page: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
  titleText: {
    fontFamily: "Poppins-ExtraBold",
    fontSize: 23,
    alignSelf: "center",
    paddingVertical: 10,
    // paddingTop: "20%",
  },
  titleText2: {
    fontFamily: "Poppins-ExtraBold",
    fontSize: 23,
    alignSelf: "center",
    paddingVertical: 10,
    // paddingTop: "20%",
    color: "#2C3333",
  },
  titleText3: {
    fontFamily: "Poppins-ExtraBold",
    fontSize: 23,
    alignSelf: "center",
    paddingVertical: 10,
    // paddingTop: "20%",
    color: "#2E4F4F",
  },
  squareImage: {
    display: "flex",
    width: "60%",
    height: "undefined",
    aspectRatio: "1",
    marginTop: "2%",
    marginBottom: "8%",
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
    paddingTop: "24%",
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
    // backgroundColor: "cornflowerblue",
    backgroundColor: "#F0F0F0",
    marginTop: "-2%",
    justifyContent: "center",
  },
});

export const translateStyles = StyleSheet.create({
  background: {
    flex: 1,
    // backgroundColor: "#CDF5FD",
    backgroundColor: "#F0F0F0",
  },
  textBox: {
    flex: 1,
    zIndex: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  languageLabel: {
    paddingTop: 5,
    fontSize: 20,
    color: "black",
    textAlign: "center",
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
    // backgroundColor: "#CDF5FD",
    backgroundColor: "#F0F0F0",
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
    primary: "#87C4FF",
    secondary: "#5272F2",
    text: "black",
    outline: "#FFBDD4",
    backgroundColor: "#FFFFFF",
    elevation: {
      level1: "#3BC4E2",
    },
  },
};

export const headerTheme = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: {
    ...DefaultTheme.colors,
    primary: "#56CBF4",
    text: "black",
    outline: "#FFBDD4",
    backgroundColor: "#F0F0F0",
    elevation: {
      level1: "#3BC4E2",
    },
  },
};

export const settingsTheme = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: {
    ...DefaultTheme.colors,
    primary: "#87C4FF",
    secondary: "#5272F2",
    text: "black",
    outline: "#FFBDD4",
    backgroundColor: "#FFFFFF",
    elevation: {
      level1: "#3BC4E2",
    },
  },
};

export const phraseTheme = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: {
    ...DefaultTheme.colors,
    primary: "#5272F2",
    secondary: "#5272F2",
    text: "black",
    outline: "#FFBDD4",
    backgroundColor: "#FFFFFF",
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
    primary: "#5272F2",
    secondary: "#5272F2",
    text: "black",
    outline: "#FFBDD4",
    backgroundColor: "#FFFFFF",
    elevation: {
      level1: "white",
    },
  },
};

// Fonts
const baseFont = {
  fontFamily: "Poppins-Regular",
  fontSize: 12,
  color: "#2C3333",
};

const baseVariants = configureFonts({ config: baseFont });

export const fonts = configureFonts({
  config: {
    ...baseVariants,
  },
});
