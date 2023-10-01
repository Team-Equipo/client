import { StyleSheet } from "react-native";

export const signinStyles = StyleSheet.create({
  image: {
    width: 128,
    height: 128,
    marginTop: 12,
    marginBottom: 32,
    alignSelf: "center", // Center the image horizontally
  },
  backArea: {
    backgroundColor: "#dbf4ff",
    borderRadius: 16,
    padding: 24,
    marginTop: 24,
  },
  topbar: {
    color: "black",
    fontWeight: "bold",
    justifyContent: "space-around",
    alignItems: "center",
  },
  title: {
    color: "cornflowerblue",
    fontWeight: "bold",
    justifyContent: "space-around",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
    alignItems: "center",
  },
  label: {
    color: "gray",
    justifyContent: "space-around",
    marginTop: 5,
    marginBottom: 5,
  },
  link: {
    fontWeight: "bold",
    color: "blue",
  },
  signInButton: {
    justifyContent: "space-around",
    backgroundColor: "blue",
    marginVertical: 5,
  },
  oauthContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  oauthImageContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    alignSelf: "flex-start",
    marginHorizontal: 15,
    marginTop: 10,
    padding: 8,
    borderRadius: 32,
  },
  oauthImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
});
