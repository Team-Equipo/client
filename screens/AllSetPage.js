import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import * as React from "react";
import { View, Animated, StyleSheet } from "react-native";
import { Button, PaperProvider, Text } from "react-native-paper";

import { allSetStyle, settingsTheme } from "../styles/globalStyles";

export default function AllSetScreen() {
  const progress = React.useRef(new Animated.Value(0.5)).current;
  const scale = React.useRef(new Animated.Value(1)).current;
  const changeTxtColor = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(changeTxtColor, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: false,
        }),
        Animated.timing(changeTxtColor, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, []);

  const textColor = changeTxtColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["#00A9FF", "#FF6666"],
  });

  // animate object
  React.useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.spring(progress, {
            toValue: 1,
            useNativeDriver: true,
            duration: 4000,
          }),
          Animated.spring(progress, {
            toValue: 0.5,
            useNativeDriver: true,
            duration: 2000,
          }),
        ]),
        Animated.sequence([
          Animated.spring(scale, {
            toValue: 2,
            useNativeDriver: true,
            duration: 4000,
          }),
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
            duration: 2000,
          }),
        ]),
      ]),
    ).start();
  }, []);

  return (
    <PaperProvider theme={settingsTheme}>
      <View style={allSetStyle.container}>
        <LinearGradient
          colors={["#6DCCFC", "#B4BDFF", "#FFFFFF"]}
          locations={[0.01, 0.02, 0.25]}
          style={{ height: "100%" }}
        >
          <View>
            <Animated.Text
              style={[allSetStyle.titleText, { color: textColor }]}
            >
              You are All Set!
            </Animated.Text>
            {/* <Animated.View
              style={[
                styles.square,
                {
                  borderRadius: progress.interpolate({
                    inputRange: [0.5, 1],
                    outputRange: [SIZE / 4, SIZE / 2],
                  }),
                  opacity: progress,
                  transform: [
                    { scale },
                    {
                      rotate: progress.interpolate({
                        inputRange: [0.5, 1],
                        outputRange: ["0deg", "360deg"],
                      }),
                    },
                  ],
                },
              ]}
            /> */}
            <View style={allSetStyle.animationContainer}>
              <LottieView
                source={require("../assets/animation/FileAnimation.json")}
                style={allSetStyle.animation}
                autoPlay
                loop
              />
            </View>
            <Button
              mode="elevated"
              textColor="white"
              labelStyle={{ fontWeight: "bold" }}
              style={allSetStyle.button}
            >
              <Text style={allSetStyle.buttonText}>
                Take me to the next step!
              </Text>
            </Button>
          </View>
        </LinearGradient>
      </View>
    </PaperProvider>
  );
}

const SIZE = 96.0;

const styles = StyleSheet.create({
  square: {
    width: SIZE,
    height: SIZE,
    marginVertical: "28%",
    backgroundColor: "#83A2FF",
    alignSelf: "center",
  },
});
