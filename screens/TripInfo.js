// TripInfo.js
import React from "react";
import { View, SafeAreaView } from "react-native";
import {
  TextInput,
  Button,
  withTheme,
  PaperProvider,
  Text,
} from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";
import DropDown from "react-native-paper-dropdown";

import HideKeyboard from "../components/HideKeyboard";
import { AuthContext } from "../contexts/AuthContext";
import { settingsStyle, settingsTheme } from "../styles/globalStyles";

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
  // const { signIn } = React.useContext(AuthContext);

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
    <PaperProvider theme={settingsTheme}>
      <HideKeyboard>
        <SafeAreaView>
          <View
            style={{ height: "100%" }}
            rowGap={2}
            paddingRight={2}
            paddingLeft={2}
          >
            <Text style={settingsStyle.titleText}>
              Tell us about your Travel Plan
            </Text>
            <TextInput
              mode="outlined"
              label="Country of Destination"
              dense={true}
              value={country}
              right={<TextInput.Icon icon="airplane-landing" color="#3BC4E2" />}
              outlineStyle={{ borderRadius: 24, borderColor: "#CDF5FD" }}
              style={settingsStyle.textInput}
              onChangeText={(text) => setCountry(text)}
            />
            <TextInput
              mode="outlined"
              label="Region of Destination"
              dense={true}
              value={region}
              right={<TextInput.Icon icon="airplane-landing" color="#3BC4E2" />}
              outlineStyle={{ borderRadius: 24, borderColor: "#CDF5FD" }}
              style={settingsStyle.textInput}
              onChangeText={(text) => setRegion(text)}
            />
            <TextInput
              mode="outlined"
              label="City/Municipality"
              dense={true}
              value={dest}
              right={
                <TextInput.Icon icon="city-variant-outline" color="#3BC4E2" />
              }
              outlineStyle={{ borderRadius: 24, borderColor: "#CDF5FD" }}
              style={settingsStyle.textInput}
              onChangeText={(text) => setDest(text)}
            />
            <View style={{ height: "6%" }}>
              <DatePickerInput
                locale="en"
                label="Select Start Date"
                mode="outlined"
                presentationStyle="formsheet"
                value={startDate}
                outlineStyle={{ borderRadius: 24, borderColor: "#CDF5FD" }}
                style={settingsStyle.textInput}
                onChange={setStartDate}
              />
            </View>
            <View style={{ height: "6%" }}>
              <DatePickerInput
                locale="en"
                label="Select End Date"
                mode="outlined"
                presentationStyle="formsheet"
                outlineStyle={{ borderRadius: 24, borderColor: "#CDF5FD" }}
                style={settingsStyle.textInput}
                value={endDate}
                onChange={setEndDate}
              />
            </View>
            <DropDown
              label="Purpose of Trip"
              list={planList}
              mode="outlined"
              value={plan}
              outlineStyle={{ borderRadius: 24, borderColor: "#CDF5FD" }}
              style={settingsStyle.textInput}
              setValue={handleSetPlan}
              visible={dropVisible}
              multiSelect={false}
              showDropDown={() => setDropVisibility(true)}
              onDismiss={() => setDropVisibility(false)}
              dropDownStyle={settingsStyle.textInput}
              dropDownItemSelectedStyle={settingsStyle.textInput}
              // dropDownItemStyle={settingsStyle.textInput}
            />
            <View>
              {planPromptVisible ? (
                <View paddingTop="1%" paddingLeft="1%" paddingRight="1%">
                  <TextInput
                    label={planPrompt}
                    mode="outlined"
                    outlineStyle={{ borderRadius: 24, borderColor: "#CDF5FD" }}
                    style={settingsStyle.textInput}
                    dense={true}
                    underlineColor="lightgray"
                    onChangeText={(text) => setPlanDetails(text)}
                  />
                </View>
              ) : null}
            </View>

            <View paddingTop="1%" paddingRight="0.5%" paddingLeft="0.5%">
              {/* <Button
                mode="contained"
                onPress={() => signIn({ username, password })}
              >
                Submit
              </Button> */}
              <Button
                mode="elevated"
                onPress={() => signIn({ username, password })}
                textColor="white"
                onPress={handleSetPlan}
                labelStyle={{ fontWeight: "bold" }}
                style={settingsStyle.button}
              >
                Submit
              </Button>
            </View>
          </View>
        </SafeAreaView>
      </HideKeyboard>
    </PaperProvider>
  );
};

export default withTheme(TripInfo);
