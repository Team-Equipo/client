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
import {
  Text,
  Modal,
  Portal,
  Button,
  withTheme,
  useTheme,
} from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import Translation from "./Translation";
import CollapsibleView from "@eliav2/react-native-collapsible-view";

import HideKeyboard from "../components/HideKeyboard";

const Phrases = ({ navigation }) => {
  const [searchedTopic, setSearchedTopic] = useState("Select a topic...");
  const [phrases, setPhrases] = useState([]);
  const [response, setResponse] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("topical");
  const [modes, setModes] = useState([
    { label: "Topical", value: "topical" },
    { label: "Translate", value: "translate" },
  ]);

  function handleTopicSelect(item) {
    setSearchedTopic("Topic: " + item.text);
    setPhrases([
      { text: 'Spanish phrase 1 for topic "' + item.text + '"', id: 1 },
      { text: 'Spanish phrase 2 for topic "' + item.text + '"', id: 2 },
      { text: 'Spanish phrase 3 for topic "' + item.text + '"', id: 3 },
    ]);
  }

  function showModal(item) {
    setModalVisible(true);
    setResponse(
      "Your Phrase:\n" +
        item.text +
        "\n\n" +
        "English Translation:\n[Translation of " +
        item.text +
        "]",
    );
  }

  function savePhrase() {
    setModalVisible(false);
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

  const theme = useTheme();

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
              paddingBottom: 15,
              marginTop: "10%",
              marginBottom: "10%",
              marginLeft: "10%",
              marginRight: "10%",
              flex: 1,
              alignSelf: "center",
            }}
          >
            <View style={{ width: useWindowDimensions().width * 0.8, flex: 1 }}>
              <Text style={{ fontSize: 25 }}>{response}</Text>
            </View>
            <Button mode="contained" onPress={savePhrase}>
              Save Phrase
            </Button>
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
            style={[styles.textBox, { backgroundColor: "white" }]}
            title={searchedTopic}
            titleStyle={{ alignItems: "flex-start" }}
            noArrow={true}
          >
            <View
              style={{
                paddingTop: 5,
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <FlatList
                numColumns={10}
                columnWrapperStyle={{
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
                //horizontal={true}
                data={topics}
                renderItem={({ item }) => (
                  <Button
                    style={{ marginLeft: 2, marginRight: 2, marginBottom: 4 }}
                    onPress={() => handleTopicSelect(item)}
                    mode="outlined"
                    textColor="black"
                    contentStyle={{
                      marginBottom: -7,
                      marginTop: -7,
                      marginLeft: -3,
                      marginRight: -3,
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
          </CollapsibleView>
          <View style={[styles.textBox, { flex: 1, backgroundColor: "white" }]}>
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
    borderWidth: 1,
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
