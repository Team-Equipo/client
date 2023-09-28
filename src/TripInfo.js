// TripInfo.js
import React from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import {
  Appbar,
  Title,
  Snackbar,
  TextInput,
  Button,
  withTheme,
  Text,
} from "react-native-paper";

const TripInfo = ({ navigation }) => {
  const [country, setCountry] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [dest, setDest] = React.useState("");
  const [dates, setDates] = React.useState("");
  const [plans, setPlans] = React.useState("");

  return (
    <SafeAreaView style={{ flexDirection: "column", flex: 1 }}>
      <View
        rowGap="0.5%"
        paddingRight="0.5%"
        paddingLeft="0.5%"
        style={{ flex: 0 }}
      >
        <TextInput
          mode="outlined"
          label="Country of Destination"
          dense={true}
          value={country}
          outlineColor="lightgray"
          onChangeText={(text) => setCountry(text)}
        />
        <TextInput
          mode="outlined"
          label="Region of Destination"
          dense={true}
          value={region}
          outlineColor="lightgray"
          onChangeText={(text) => setRegion(text)}
        />
        <TextInput
          mode="outlined"
          label="City/Municipality"
          dense={true}
          value={dest}
          outlineColor="lightgray"
          onChangeText={(text) => setDest(text)}
        />
        <TextInput
          mode="outlined"
          label="Filler"
          dense={true}
          //value={firstLanguage}
          outlineColor="lightgray"
          //onChangeText={(text) => setFirstLanguage(text)}
        />
      </View>

      <View
        paddingTop="1%"
        paddingRight="1%"
        paddingLeft="1%"
        style={{ flex: 0 }}
      >
        <Button
          mode="contained"
          //onPress={() => }//navigation.navigate('TripInfo')}
        >
          Submit
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 20,
    justifyContent: "space-around",
    textAlign: "center",
  },

  /*image: {
    width: 256,
    height: 256,
    marginTop: 12,
    marginBottom: 12,
    alignSelf: "center", // Center the image horizontally
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
  },*/
});

export default withTheme(TripInfo);
