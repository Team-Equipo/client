import React from "react";
import { AsyncStorage } from "react-native";
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
import DropDown from "react-native-paper-dropdown";
import { DatePickerInput } from "react-native-paper-dates";
import { ScrollView } from "react-native";
import { Appbar } from "react-native-paper";

function updateinfo() {
  /*This is just a placeholder for now*/
  console.log("updated");
}

const planList = [
  {
    label: "School",
    value: "school",
  },
  {
    label: "Work",
    value: "work",
  },
  {
    label: "Family",
    value: "family",
  },
  {
    label: "Recreational",
    value: "recreational",
  },
  {
    label: "Other",
    value: "other",
  },
];
const handleSetPlan = (text) => {
  setPlan(text);
  if (text != null) {
    setPlanPromptVisible(true);
    setPlanPrompt(planPrompts[text]);
  } else {
    setPlanPromptVisible(false);
  }
};

const UserInfo = ({ navigation }) => {
  const [name, setName] = React.useState("Chris");
  const [ageInput, setAgeInput] = React.useState("23"); // text that appears in input box
  const [age, setAge] = React.useState(); // actual age value saved
  const [nationality, setNationality] = React.useState("Korean");
  const [firstLanguage, setFirstLanguage] = React.useState("Korean");
  const [education, setEducation] = React.useState("College");
  const [interests, setInterests] = React.useState("Workout");
  const [foods, setFoods] = React.useState("KFC");
  const [country, setCountry] = React.useState("Mexico");
  const [region, setRegion] = React.useState("");
  const [dest, setDest] = React.useState("");
  const [dates, setDates] = React.useState("");
  const [plan, setPlan] = React.useState("");
  const [planDetails, setPlanDetails] = React.useState("");
  const [dropVisible, setDropVisibility] = React.useState(false); // open/close dropdown
  const [planPromptVisible, setPlanPromptVisible] = React.useState(false); // open/close travel plan input box
  const [planPrompt, setPlanPrompt] = React.useState("");
  const [startDate, setStartDate] = React.useState(new Date(2024, 0, 1));
  const [endDate, setEndDate] = React.useState(new Date(2024, 5, 12));

  // only allow numerical input
  const handleAgeInput = (text) => {
    const numericRegex = /^[0-9]*$/;
    if (numericRegex.test(text)) {
      setAgeInput(text);
      setAge(parseInt(text, 10));
    }
  };

  const handleUserSubmit = () => {
    if (
      name != "" &&
      age != -1 &&
      nationality != "" &&
      firstLanguage != "" &&
      education != ""
    ) {
      navigation.navigate("TripInfo");
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={{ flexDirection: "column", flex: 1 }}>
        <Appbar.Header style={styles.appbar}>
          <Appbar.Content title="Settings" style={styles.title} />
        </Appbar.Header>
        <View
          rowGap="0.5%"
          paddingRight="0.5%"
          paddingLeft="0.5%"
          style={{ flex: 0 }}
        >
          <TextInput
            mode="outlined"
            label="Name"
            dense={true}
            value={name}
            outlineColor="lightgray"
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            mode="outlined"
            label="Age"
            dense={true}
            value={ageInput}
            outlineColor="lightgray"
            onChangeText={(text) => handleAgeInput(text)}
          />
          <TextInput
            mode="outlined"
            label="Nationality"
            dense={true}
            value={nationality}
            outlineColor="lightgray"
            onChangeText={(text) => setNationality(text)}
          />
          <TextInput
            mode="outlined"
            label="First Language(s)"
            dense={true}
            value={firstLanguage}
            outlineColor="lightgray"
            onChangeText={(text) => setFirstLanguage(text)}
          />
          <TextInput
            mode="outlined"
            label="Educational Background"
            dense={true}
            value={education}
            outlineColor="lightgray"
            onChangeText={(text) => setEducation(text)}
          />
          <TextInput
            mode="outlined"
            label="Interests/Hobbies"
            dense={true}
            multiline={true}
            value={interests}
            outlineColor="lightgray"
            onChangeText={(text) => setInterests(text)}
          />
          <TextInput
            mode="outlined"
            label="Favorite Food(s)"
            dense={true}
            multiline={true}
            value={foods}
            outlineColor="lightgray"
            onChangeText={(text) => setFoods(text)}
          />
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
          <View style={{ marginTop: "0.5%" }}>
            <DatePickerInput
              locale="en"
              label="Select Start Date"
              mode="outlined"
              presentationStyle="formsheet"
              value={startDate}
              onChange={setStartDate}
            />
          </View>

          <View style={{ marginTop: "0.5%" }}>
            <DatePickerInput
              locale="en"
              label="Select End Date"
              mode="outlined"
              presentationStyle="formsheet"
              value={endDate}
              onChange={setEndDate}
            />
          </View>

          <DropDown
            label="Purpose of Trip"
            list={planList}
            mode="outlined"
            value={plan}
            setValue={handleSetPlan}
            visible={dropVisible}
            multiSelect={false}
            showDropDown={() => setDropVisibility(true)}
            onDismiss={() => setDropVisibility(false)}
            dropDownStyle={{ paddingLeft: "1%", paddingRight: "60%" }}
          />
          <View
            paddingTop="1%"
            paddingRight="0.5%"
            paddingLeft="0.5%"
            style={{ flex: 0 }}
          >
            <Button mode="contained" onPress={handleUserSubmit}>
              Apply Changes
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  appbar: {
    flex: 0,
    backgroundColor: "cornflowerblue",
    marginTop: "-2%",
  },
  title: {
    color: "white",
    fontSize: 20,
    justifyContent: "space-around",
    textAlign: "center",
  },
});

export default withTheme(UserInfo);
