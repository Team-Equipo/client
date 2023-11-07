import { StyleSheet } from "react-native";
import { DefaultTheme } from "react-native-paper";

// STYLES
export const phraseStyles = StyleSheet.create({
  textBox: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 10,
    padding: "1%",
    marginLeft: "1%",
    marginRight: "1%",
    marginBottom: "1%",
    fontSize: 16,
  },
});

export const signinStyles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    alignItems: "center",
  },
  textInputWrapper: {
    width: "80%",
    display: "flex",
  },
  descText: {
    fontWeight: "bold",
    color: "white",
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
    paddingVertical: "80%",
    // borderRadius: 32,
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
