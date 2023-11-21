// TripInfo.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, SafeAreaView, KeyboardAvoidingView, Image } from "react-native";
import {
  TextInput,
  Button,
  withTheme,
  PaperProvider,
  Text,
} from "react-native-paper";

import HideKeyboard from "../components/HideKeyboard";
import { settingsStyle, settingsTheme } from "../styles/globalStyles";

const TripInfo = ({ navigation }) => {
  const [region, setRegion] = React.useState("");
  const [plan, setPlan] = React.useState("");

  const handleSetPlan = (text) => {
    setPlan(text);
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
              Where do you plan to travel, NAME?
            </Text>
            <Image
              // source={require("../assets/girl1.png")}
              source={require("../assets/airplane.png")}
              style={settingsStyle.image}
              resizeMode="contain"
            />
            <TextInput
              mode="outlined"
              label="Destination"
              value={region}
              right={<TextInput.Icon icon="map-marker" color="#3BC4E2" />}
              outlineStyle={{ borderRadius: 24, borderColor: "#CDF5FD" }}
              style={settingsStyle.textInput}
              onChangeText={(text) => setRegion(text)}
            />
            <View paddingTop="1%" paddingRight="0.5%" paddingLeft="0.5%">
              {/* <Button
                mode="contained"
                onPress={() => signIn({ username, password })}
              >
                Submit
              </Button> */}
              <Button
                mode="elevated"
                textColor="white"
                onPress={handleSetPlan}
                labelStyle={{ fontWeight: "bold" }}
                style={settingsStyle.button}
              >
                <Text style={settingsStyle.buttonText}>Submit</Text>
              </Button>
            </View>
          </View>
        </HideKeyboard>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
};

export default withTheme(TripInfo);
