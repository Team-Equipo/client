// TripInfo.js
import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { TextInput, Button, withTheme } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";
import DropDown from "react-native-paper-dropdown";
import InfoBox from "../components/InfoBox";

import HideKeyboard from "../components/HideKeyboard";
import { AuthContext } from "../contexts/AuthContext";

const TripInfo = ({ navigation }) => {
  const [country, setCountry] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [dest, setDest] = React.useState("");
  const [dates, setDates] = React.useState("");
  const [plan, setPlan] = React.useState("");
  const [planDetails, setPlanDetails] = React.useState("");
  const [dropVisible, setDropVisibility] = React.useState(false); // open/close dropdown
  const [planPromptVisible, setPlanPromptVisible] = React.useState(false); // open/close travel plan input box
  const [planPrompt, setPlanPrompt] = React.useState("");
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { signIn } = React.useContext(AuthContext);

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
    <HideKeyboard>
      <SafeAreaView>
        <View
          style={{ height: "100%" }}
          rowGap="0.5%"
          paddingRight="0.5%"
          paddingLeft="0.5%"
        >
          <InfoBox
            label="Country of Destination"
            value={country}
            onChangeText={(text) => setCountry(text)}
          />
          <InfoBox
            label="Region of Destination"
            value={region}
            onChangeText={(text) => setRegion(text)}
          />
          <InfoBox
            label="City/Municipality"
            value={dest}
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
                  onChangeText={(text) => setPlanDetails(text)}
                />
              </View>
            ) : null}
          </View>

          <View paddingTop="1%" paddingRight="0.5%" paddingLeft="0.5%">
            <Button
              mode="contained"
              onPress={() => signIn({ username, password })}
            >
              Submit
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </HideKeyboard>
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
