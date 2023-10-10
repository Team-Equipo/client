// TripInfo.js
import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { TextInput, Button, withTheme } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";
import { PaperSelect } from "react-native-paper-select";
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
    { _id: "1", value: "School" },
    { _id: "2", value: "Work" },
    { _id: "3", value: "Family" },
    { _id: "4", value: "Recreational" },
    { _id: "5", value: "Other" },
  ];

  // list of prompts in response to dropdown selection
  const planPrompts = {
    School: "Describe your school's program.",
    Work: "Describe your work.",
    Family: "What will you be doing with your family?",
    Recreational: "What do you see yourself doing?",
    Other: "Please describe your plans.",
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
          rowGap={2}
          paddingRight={2}
          paddingLeft={2}
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
          <PaperSelect
            label="Purpose of Trip"
            arrayList={planList}
            textInputMode="outlined"
            value={plan}
            multiEnable={false}
            onSelection={(value) => {
              handleSetPlan(value.text);
            }}
            selectedArrayList={[]}
            errorText=""
            hideSearchBox={true}
            textInputProps={{ outlineColor: "lightgray" }}
          />
          <View>
            {planPromptVisible ? (
              <View paddingLeft="1%" paddingRight="1%">
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
