import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

export default function Main() {
  return (
    <View style={styles.container}>
      <Button
        icon="translate"
        mode="contained"
        onPress={() => console.log("Pressed")}
      >
        Lingucidity
      </Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

/*
export default function App() {
  return (
    <PaperProvider theme={{ version: 3 }}>
      <MyFirstScreen /> {
      </PaperProvider>
      );
    }
    
*/
