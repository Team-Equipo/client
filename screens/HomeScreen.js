// HomeScreen.js
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CommonActions } from "@react-navigation/native";
import React from "react";
import { BottomNavigation, withTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Phrases from "./Phrases";
import SavedPhrases from "./SavedPhrases";
import Translation from "./Translation";

const Tab = createBottomTabNavigator();

/**
 * Represents the Home screen component.
 *
 * @param {object} navigation - The navigation object.
 * @param {object} route - The route object.
 * @param {object} options - The options object.
 * @param {function} back - The back function.
 * @returns {JSX.Element} The rendered Home screen component.
 */

// This is the function that will render the bottom navigation bar
const HomeScreen = ({ navigation, route, options, back }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          style={{ backgroundColor: "#F0F0F0" }}
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
            return <Icon name="download" size={25} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default withTheme(HomeScreen);
