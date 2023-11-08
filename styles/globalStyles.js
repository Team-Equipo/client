// import * as Font from "expo-font";
import { StyleSheet } from "react-native";
import { DefaultTheme } from "react-native-paper";

// const customFonts = {
//   "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
//   "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
//   "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
//   "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
//   "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
// };

// await Font.loadAsync(customFonts);

// STYLES
// mostly used in Phrases.js
export const phraseStyles = StyleSheet.create({
  textBox: {
    borderColor: "white",
    borderRadius: 15,
    padding: "2%",
    marginHorizontal: "2%",
    marginBottom: "2%",
    fontSize: 18,
    backgroundColor: "white",
  },
  topicBox: {
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 1,
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

// mostly usde in Signin.js
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
    // backgroundColor: "white",
    // marginHorizontal: 15,
    // marginTop: 10,
    // padding: 10,
    // borderRadius: 32,
  },
  textInputWrapper: {
    width: "80%",
    display: "flex",
  },
  textInput: {
    display: "flex",
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    width: "80%",
    display: "flex",
    gap: 10,
  },
  divText: {
    textAlign: "center",
    color: "gray",
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

// THEMES
export const signinTheme = {
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
      level1: "#39A7FF",
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
