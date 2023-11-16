import { LinearGradient } from "expo-linear-gradient";
import * as React from "react";
import {
  Image,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput, Button, PaperProvider, Text } from "react-native-paper";

import { allSetStyle, signinTheme } from "../styles/globalStyles";

export default function AllSetScreen() {
  return (
    <PaperProvider>
      <View style={allSetStyle.container}>
        <LinearGradient
          // colors={["#0014FF", "#00A9FF", "#A0E9FF", "#FFFFFF"]}
          // locations={[0.01, 0.2, 0.5, 0.7]}
          // colors={["#0014FF", "#A0E9FF", "#FFFFFF"]}
          // locations={[0.01, 0.2, 0.7]}
          colors={["#FFFFFF", "#FFFFFF", "#FFFFFF"]}
          locations={[0.01, 0.2, 0.7]}
        >
          <Image
            source={require("../assets/talking.png")}
            style={allSetStyle.image}
          />
          <Text style={allSetStyle.titleText}>You are All Set!</Text>
          <Button
            mode="elevated"
            textColor="white"
            labelStyle={{ fontWeight: "bold" }}
            style={allSetStyle.button}
          >
            Take me to the next step!
          </Button>
        </LinearGradient>
      </View>
    </PaperProvider>
  );
}
