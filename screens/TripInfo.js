// TripInfo.js
import React from "react";
import { View, SafeAreaView, KeyboardAvoidingView } from "react-native";
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
    school: "Describe your school's program",
    work: "Describe your work",
    family: "What will you be doing with your family?",
    recreational: "What do you see yourself doing?",
    other: "Please describe your plans",
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
      <KeyboardAvoidingView behavior="position">
        <HideKeyboard>
          <View
            rowGap={2}
            paddingRight={2}
            paddingLeft={2}
            style={settingsStyle.textInputWrapper}
          >
            <Text style={[settingsStyle.titleText, { paddingTop: "36%" }]}>
              Tell us about your Plan
            </Text>
            <TextInput
              mode="outlined"
              label="Country of Destination"
              value={country}
              right={<TextInput.Icon icon="airplane-landing" color="#3BC4E2" />}
              outlineStyle={{ borderRadius: 24, borderColor: "#CDF5FD" }}
              style={settingsStyle.textInput}
              onChangeText={(text) => setCountry(text)}
            />
            <TextInput
              mode="outlined"
              label="Region of Destination"
              value={region}
              right={<TextInput.Icon icon="map-marker" color="#3BC4E2" />}
              outlineStyle={{ borderRadius: 24, borderColor: "#CDF5FD" }}
              style={settingsStyle.textInput}
              onChangeText={(text) => setRegion(text)}
            />
            <TextInput
              mode="outlined"
              label="City/Municipality"
              value={dest}
              right={
                <TextInput.Icon icon="city-variant-outline" color="#3BC4E2" />
              }
              outlineStyle={{ borderRadius: 24, borderColor: "#CDF5FD" }}
              style={settingsStyle.textInput}
              onChangeText={(text) => setDest(text)}
            />
            <TextInput
              mode="outlined"
              label="Start Date (YYYY/MM/DD)"
              value={startDate}
              right={<TextInput.Icon icon="calendar" color="#3BC4E2" />}
              outlineStyle={{ borderRadius: 24, borderColor: "#CDF5FD" }}
              style={settingsStyle.textInput}
              onChangeText={(text) => setStartDate(text)}
            />
            <TextInput
              mode="outlined"
              label="End Date (YYYY/MM/DD)"
              value={endDate}
              right={<TextInput.Icon icon="calendar" color="#3BC4E2" />}
              outlineStyle={{ borderRadius: 24, borderColor: "#CDF5FD" }}
              style={settingsStyle.textInput}
              onChangeText={(text) => setEndDate(text)}
            />
            {/* <View style={{ height: "6%" }}>
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
            </View> */}
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
              dropDownStyle={settingsStyle.textInput}
              dropDownItemSelectedStyle={settingsStyle.textInput}
            />
            <View>
              {planPromptVisible ? (
                <View paddingTop="1%" paddingLeft="1%" paddingRight="1%">
                  <TextInput
                    label={planPrompt}
                    mode="outlined"
                    outlineStyle={{ borderRadius: 24, borderColor: "#CDF5FD" }}
                    style={settingsStyle.textInput}
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
        </HideKeyboard>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
};

export default withTheme(TripInfo);
