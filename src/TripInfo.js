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
import DropDown from "react-native-paper-dropdown";
import { DatePickerInput } from "react-native-paper-dates";

const TripInfo = ({ navigation }) => {
  const [country, setCountry] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [dest, setDest] = React.useState("");
  const [dates, setDates] = React.useState("");
  const [plan, setPlan] = React.useState("");
  const [dropVisible, setDropVisibility] = React.useState(false); // open/close dropdown
  const [planPromptVisible, setPlanPromptVisible] = React.useState(false); // open/close travel plan input box
  const [planPrompt, setPlanPrompt] = React.useState("");
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();

  // list of choices for travel plan dropdown
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

  // list of prompts in response to dropdown selection
  const planPrompts = {
    school: "Describe your school's program.",
    work: "Describe your work.",
    family: "What will you be doing with your family?",
    recreational: "What do you see yourself doing?",
    other: "Please describe your plans.",
  };

  // display the right text prompt in response to dropdown
  const handleSetPlan = (text) => {
    setPlan(text);
    if (text != null) {
      setPlanPromptVisible(true);
      setPlanPrompt(planPrompts[text]);
    } else {
      setPlanPromptVisible(false);
    }
  };

  return (
    <SafeAreaView>
      <View
        style={{ height: "100%" }}
        rowGap="0.5%"
        paddingRight="0.5%"
        paddingLeft="0.5%"
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
        <View style={{ height: "6%" }}>
          <DatePickerInput
            locale="en"
            label="Select Start Date"
            mode="outlined"
            presentationStyle="formsheet"
            value={startDate}
            onChange={setStartDate}
          />
        </View>
        <View style={{ height: "6%" }}>
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
        <View>
          {planPromptVisible ? (
            <View paddingTop="1%" paddingLeft="1%" paddingRight="1%">
              <TextInput
                label={planPrompt}
                mode="flat"
                dense={true}
                underlineColor="lightgray"
              />
            </View>
          ) : null}
        </View>

        <View paddingTop="1%" paddingRight="0.5%" paddingLeft="0.5%">
          <Button mode="contained">Submit</Button>
        </View>
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
});

export default withTheme(TripInfo);
