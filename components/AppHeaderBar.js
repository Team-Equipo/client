import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";
import { getHeaderTitle } from "@react-navigation/elements";

export default function RegistrationBar({ navigation, route, options, back }) {
  const title = getHeaderTitle(options, route.name);
  return (
    <Appbar.Header style={styles.appbar}>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} color="white" titleStyle={styles.title} />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  appbar: {
    flex: 0,
    backgroundColor: "cornflowerblue",
    marginTop: "-2%",
    justifyContent: "center",
  },
});
