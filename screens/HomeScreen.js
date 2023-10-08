import * as React from "react";
import { StyleSheet, View, Button } from "react-native";

import Search from "../components/Search";
import { AuthContext } from "../contexts/AuthContext";

export default function HomeScreen({ navigation }) {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Search />
      <Button
        title="Expand Translate"
        onPress={() => navigation.navigate("Translate")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    alignItems: "center",
  },
  button: {
    marginTop: 10,
    width: "70%",
  },
});
