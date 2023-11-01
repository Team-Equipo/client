// Phrases.js
import React, { useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Text, Modal, Portal, Button, withTheme } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import Translation from "./Translation";
import CollapsibleView from "@eliav2/react-native-collapsible-view";

import HideKeyboard from "../components/HideKeyboard";

const Phrases = ({ navigation }) => {
  const [response, setResponse] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("topical");
  const [modes, setModes] = useState([
    { label: "Topical", value: "topical" },
    { label: "Translate", value: "translate" },
  ]);

  function showModal(item) {
    setModalVisible(true);
    setResponse("Here is a sample response to " + item.text);
  }

  /* Hardcode a list of topics. */
  const topics = [
    { text: "Ordering food", id: 1 },
    { text: "Asking for directions", id: 2 },
    { text: "Shopping", id: 3 },
    { text: "Greetings", id: 4 },
    { text: "Goodbyes", id: 5 },
    { text: "Pleasantries", id: 6 },
  ];

  /* Hardcode a list of test phrases. */
  const phrases = [
    { text: "Hola mundo", id: 1 },
    { text: "Hola universo", id: 2 },
    { text: "El universo dice hola", id: 3 },
  ];

  const topTopics = topics.slice(0, 3);
  const expandedTopics = topics.slice(3, topics.length);

  return (
    <HideKeyboard>
      <SafeAreaView style={{ flexDirection: "column", flex: 1 }}>
        <Portal style={{}}>
          <Modal
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
            contentContainerStyle={{
              backgroundColor: "white",
              borderRadius: 10,
              padding: 20,
              marginTop: "10%",
              marginBottom: "10%",
              marginLeft: "10%",
              marginRight: "10%",
              flex: 1,
              alignSelf: "center",
            }}
          >
            <View style={{ width: useWindowDimensions().width * 0.8, flex: 1 }}>
              <Text>{response}</Text>
            </View>
          </Modal>
        </Portal>
        <View
          style={{
            flex: 1,
            paddingTop: "1%",
            paddingLeft: "0.5%",
            paddingRight: "0.5%",
          }}
        >
          <CollapsibleView
            style={[styles.textBox]}
            isRTL={true}
            title={
              <View
                style={{
                  width: "95%",
                  height: "100%",
                  flexDirection: "column",
                }}
              >
                <Text
                  style={{
                    width: "100%",
                    textAlign: "center",
                    marginBottom: 3,
                    color: "gray",
                  }}
                >
                  Recommended Topics:
                </Text>
                <FlatList
                  style={{ marginLeft: 0 }}
                  centerContent={true}
                  horizontal={true}
                  data={topTopics}
                  renderItem={({ item }) => (
                    <Button
                      style={{ marginLeft: 2, marginRight: 2 }}
                      mode={"contained-tonal"}
                      onPress={() => showModal(item)}
                      contentStyle={{
                        marginBottom: -7,
                        marginTop: -7,
                        marginLeft: -15,
                        marginRight: -15,
                      }}
                      labelStyle={{
                        fontSize: 14,
                      }}
                    >
                      {item.text}
                    </Button>
                  )}
                />
              </View>
            }
          >
            <Text>Hi</Text>
          </CollapsibleView>
          <View style={[styles.textBox, { flex: 1 }]}>
            <FlatList
              data={phrases}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => showModal(item)}>
                  <Text>{item.text}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </SafeAreaView>
    </HideKeyboard>
  );
};

const styles = StyleSheet.create({
  textBox: {
    borderWidth: 2,
    borderColor: "lightgray",
    borderRadius: 10,
    padding: "1%",
    marginLeft: "1%",
    marginRight: "1%",
    marginBottom: "1%",
    fontSize: 16,
  },
});

export default withTheme(Phrases);
