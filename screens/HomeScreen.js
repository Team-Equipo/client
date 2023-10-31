import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useState } from "react";
import Translation from "./Translation";
import Phrases from "./Phrases";
import SavedPhrases from "./SavedPhrases";
import { Button, withTheme, useTheme, Text } from "react-native-paper";

const Tab = createMaterialTopTabNavigator();

const HomeScreen = ({ navigation, route, options, back }) => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Find Phrases"
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
        name="Find Phrases"
        component={Phrases}
        options={{ tabBarLabel: "Find Phrases" }}
      />
      <Tab.Screen
        name="Translation"
        component={Translation}
        options={{ tabBarLabel: "Translation" }}
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
