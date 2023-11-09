import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import {
  BottomNavigation,
  Button,
  withTheme,
  useTheme,
  Text,
} from "react-native-paper";
import { CommonActions } from "@react-navigation/native";

import Phrases from "./Phrases";
import SavedPhrases from "./SavedPhrases";
import Translation from "./Translation";
import { signinTheme } from "../styles/globalStyles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation, route, options, back }) => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title;

            return label;
          }}
        />
      )}
    >
      <Tab.Screen
        name="Find Phrases"
        component={Phrases}
        options={{
          tabBarLabel: "Find Phrases",
          tabBarIcon: () => {
            return <Icon name="archive-search" size={25} />;
          },
        }}
      />
      <Tab.Screen
        name="Translation"
        component={Translation}
        options={{
          tabBarLabel: "Translation",
          tabBarIcon: () => {
            return <Icon name="translate" size={25} />;
          },
        }}
      />
      <Tab.Screen
        name="SavedPhrases"
        component={SavedPhrases}
        options={{
          tabBarLabel: "Saved",
          tabBarIcon: () => {
            return <Icon name="bookmark" size={25} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default withTheme(HomeScreen);
