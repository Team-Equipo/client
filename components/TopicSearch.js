// TopicSearch.js
import CollapsibleView from "@eliav2/react-native-collapsible-view";
import React, { useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { Chip, IconButton, Divider } from "react-native-paper";

import { shadows, phraseStyles } from "../styles/globalStyles";

const TopicSearch = ({
  topicsExpanded,
  onFocus,
  onBlur,
  onPress,
  onEndEditing,
  selectedTopic,
  handleTopicDeselect,
  handleTopicSelect,
  topics,
  textInputEnabled = true,
  navigation,
}) => {
  const windowDimensions = Dimensions.get("window");
  const textInputRef = useRef(null);

  const clearTextInput = () => {
    if (textInputRef.current) {
      textInputRef.current.clear();
    }
  };

  return (
    <CollapsibleView
      expanded={topicsExpanded}
      style={{
        ...(topicsExpanded ? shadows.shadow4 : null),
        padding: 0,
        zIndex: 1,
        borderColor: "transparent",
        marginBottom: -3,
        elevation: 0,
      }}
      title={
        <TouchableWithoutFeedback onPress={!textInputEnabled ? onPress : null}>
          <View
            style={{
              ...(topicsExpanded ? shadows.shadow4 : null),
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
                {!textInputEnabled ? (
                  <Text
                    style={{
                      fontFamily: "Poppins-Regular",
                      fontSize: 15,
                      width: windowDimensions.width - 85,
                      marginRight: 10,
                      color: "darkgray",
                    }}
                  >
                    Search for a topic...
                  </Text>
                ) : (
                  <TextInput
                    ref={textInputRef}
                    style={{
                      fontFamily: "Poppins-Regular",
                      fontSize: 15,
                      width: windowDimensions.width - 85,
                      marginRight: 10,
                      zIndex: 0,
                    }}
                    placeholder="Search for a topic..."
                    placeholderTextColor="darkgray"
                    editable={textInputEnabled}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onEndEditing={onEndEditing}
                  />
                )}
                <IconButton
                  icon="close"
                  style={{ margin: 0, zIndex: 10 }}
                  onPress={
                    textInputEnabled ? clearTextInput : handleTopicDeselect
                  }
                />
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      }
      titleStyle={{
        alignItems: "flex-start",
      }}
      noArrow
      activeOpacityFeedback={1}
      collapsibleContainerStyle={{
        elevation: 4,
        width: "101%",
        marginTop: 3,
        position: "absolute",
        top: "100%",
        borderRadius: 15,
      }}
    >
      <View
        style={{
          ...(topicsExpanded ? shadows.shadow4 : null),
          flexDirection: "column",
          justifyContent: "center",
          borderRadius: 15,
          borderColor: "lightgrey",
          borderWidth: 1,
          backgroundColor: "white",
        }}
      >
        {textInputEnabled ? (
          <>
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
          </>
        ) : null}
        <FlatList
          style={{
            padding: 3,
          }}
          ListHeaderComponent={
            <View
              style={{
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <Chip
                style={{ ...phraseStyles.topicBox, backgroundColor: "red" }}
                onPress={() => navigation.navigate("EmergencyPhrases")}
                mode="elevated"
                ellipsizeMode="clip"
                textStyle={{
                  fontSize: 15,
                  color: "white",
                  textAlign: "center",
                }}
              >
                Emergency Phrases
              </Chip>
            </View>
          }
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
              {item.length % 5 === 0 ? " " + item + " " : item}
            </Chip>
          )}
        />
      </View>
    </CollapsibleView>
  );
};

export default TopicSearch;
