import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useState } from "react";
import Translation from "./Translation";
import SavedPhrases from "./SavedPhrases";
import Activities from "./Activities";
import { Button, withTheme, useTheme, Text } from "react-native-paper";

const Tab = createMaterialTopTabNavigator();

const HomeScreen = ({ navigation, route, options, back }) => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Phraseology"
      screenOptions={{
        tabBarIndicatorContainerStyle: {
          padding: 0,
          marginTop: 0,
        },
        tabBarStyle: {
          marginTop: -10,
          backgroundColor: theme.colors.primary,
        },
        tabBarIndicatorStyle: {
          backgroundColor: "darkblue",
          height: 3,
        },
        tabBarActiveTintColor: "white",
        swipeEnabled: false,
      }}
    >
      <Tab.Screen
        name="Phraseology"
        component={Translation}
        options={{ tabBarLabel: "Phraseology" }}
      />
      <Tab.Screen
        name="Activities"
        component={Activities}
        options={{ tabBarLabel: "Activities" }}
      />
      <Tab.Screen
        name={"SavedPhrases"}
        component={SavedPhrases}
        options={{ tabBarLabel: "Saved" }}
      />
    </Tab.Navigator>
  );
};

export default withTheme(HomeScreen);
