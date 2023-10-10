// TripInfo.js
import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { TextInput, Button, withTheme, HelperText } from "react-native-paper";
import { PaperSelect } from "react-native-paper-select";
import InfoBox from "../components/InfoBox";

import HideKeyboard from "../components/HideKeyboard";
import { AuthContext } from "../contexts/AuthContext";

const TripInfo = ({ navigation }) => {
  const [country, setCountry] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [dest, setDest] = React.useState("");
  const [plan, setPlan] = React.useState("");
  const [planDetails, setPlanDetails] = React.useState("");
  const [planPromptVisible, setPlanPromptVisible] = React.useState(false); // open/close travel plan input box
  const [planPrompt, setPlanPrompt] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

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

  // return whether the text follows the MM/DD/YYYY format
  const validDate = (dateText) => {
    return /^\d{2}\/\d{2}\/\d{4}$/.test(dateText);
  };

  // ensure key info is entered before going to next screen
  const validateInfo = () => {
    if (
      country != "" &&
      region != "" &&
      dest != "" &&
      validDate(startDate) &&
      validDate(endDate) &&
      plan != ""
    ) {
      signIn({ username, password });
    }
  };

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
          <InfoBox
            inputMode="numeric"
            label="Start Date (MM/DD/YYYY)"
            value={startDate}
            onChangeText={(text) => setStartDate(text)}
          />
          {!validDate(startDate) && startDate != "" ? (
            <HelperText type="error">Invalid date format</HelperText>
          ) : null}
          <InfoBox
            inputMode="numeric"
            label="End Date (MM/DD/YYYY)"
            value={endDate}
            onChangeText={(text) => setEndDate(text)}
          />
          {!validDate(endDate) && endDate != "" ? (
            <HelperText type="error">Invalid date format</HelperText>
          ) : null}
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

          <View paddingTop="1%" paddingRight="0.5%" paddingLeft="0.5%">
            <Button mode="contained" onPress={validateInfo}>
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
