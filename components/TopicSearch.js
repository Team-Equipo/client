// TopicSearch.js
import CollapsibleView from "@eliav2/react-native-collapsible-view";
import React, { useState } from "react";
import { View, Text, FlatList, TextInput, Dimensions } from "react-native";
import { Chip, IconButton, Divider } from "react-native-paper";

import { shadows, phraseStyles } from "../styles/globalStyles";

const TopicSearch = ({
  topicsExpanded,
  onFocus,
  onBlur,
  typedTopic,
  onChangeText,
  onClear,
  selectedTopic,
  handleTopicDeselect,
  handleTopicSelect,
  topics,
}) => {
  const windowDimensions = Dimensions.get("window");

  return (
    <CollapsibleView
      expanded={topicsExpanded}
      style={{
        ...(topicsExpanded ? shadows.shadow4 : null),
        padding: 0,
        zIndex: 1,
        borderColor: "transparent",
        marginBottom: -3,
      }}
      title={
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "white",
            borderRadius: 30,
            borderColor: "lightgrey",
            borderWidth: 1,
            overflow: "hidden",
          }}
        >
          {selectedTopic ? (
            <View
              style={{
                ...(topicsExpanded ? shadows.shadow4 : null),
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 5,
              }}
            >
              <Chip
                style={phraseStyles.topicBox}
                mode="elevated"
                textStyle={{
                  fontSize: 15,
                  color: "white",
                }}
              >
                {selectedTopic}
              </Chip>
              <IconButton
                icon="close"
                style={{ margin: 0 }}
                onPress={handleTopicDeselect}
              />
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 15,
              }}
            >
              <TextInput
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: 15,
                  width: windowDimensions.width - 85,
                  marginRight: 10,
                }}
                placeholder="Type a topic..."
                value={typedTopic}
                onFocus={onFocus}
                onBlur={onBlur}
                onChangeText={onChangeText}
              />
              <IconButton
                icon="close"
                style={{ margin: 0 }}
                onPress={onClear}
              />
            </View>
          )}
        </View>
      }
      titleStyle={{
        alignItems: "flex-start",
      }}
      noArrow
      activeOpacityFeedback={1}
      collapsibleContainerStyle={{
        ...shadows.shadow4,
        width: "101%",
        marginTop: 3,
        position: "absolute",
        top: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          borderRadius: 15,
          borderColor: "lightgrey",
          borderWidth: 1,
          backgroundColor: "white",
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins-Regular",
            fontSize: 15,
            marginTop: 5,
            marginBottom: 3,
            color: "darkgrey",
            width: "100%",
            textAlign: "center",
          }}
        >
          Pre-Generated Topics
        </Text>
        <Divider marginHorizontal={10} />
        <FlatList
          style={{
            padding: 3,
          }}
          numColumns={100}
          columnWrapperStyle={{
            flexWrap: "wrap",
            justifyContent: "center",
            flexDirection: "row",
          }}
          data={topics}
          keyboardShouldPersistTaps="always"
          renderItem={({ item }) => (
            <Chip
              style={phraseStyles.topicBox}
              onPress={() => handleTopicSelect(item)}
              mode="elevated"
              ellipsizeMode="clip"
              textStyle={{
                fontSize: 15,
                color: "white",
              }}
            >
              {item.text.length === 10 ? " " + item.text + " " : item.text}
            </Chip>
          )}
        />
      </View>
    </CollapsibleView>
  );
};

export default TopicSearch;
