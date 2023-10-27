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

  /* Hardcode a list of test phrases. */
  const phrases = [
    { text: "Hola mundo", id: 1 },
    { text: "Hola universo", id: 2 },
    { text: "El universo dice hola", id: 3 },
  ];

  return (
    <>
      {mode === "topical" ? (
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
                <View
                  style={{ width: useWindowDimensions().width * 0.8, flex: 1 }}
                >
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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  zIndex: 1,
                }}
              >
                <Text
                  style={{
                    paddingLeft: "1.5%",
                    paddingBottom: "0.5%",
                    fontSize: 15,
                  }}
                >
                  Enter Topic
                </Text>
                <View style={{ marginBottom: -20, marginRight: -10 }}>
                  <DropDownPicker
                    arrowIconStyle={{ marginLeft: -20 }}
                    tickIconStyle={{ marginLeft: -16, marginRight: -20 }}
                    style={{
                      width: 100,
                      borderColor: "transparent",
                      backgroundColor: "transparent",
                      marginTop: -15,
                    }}
                    dropDownContainerStyle={{
                      width: 150,
                      alignContent: "center",
                      borderRadius: 0,
                      borderColor: "lightgray",
                      marginTop: -25,
                    }}
                    open={open}
                    value={mode}
                    items={modes}
                    setOpen={setOpen}
                    setValue={setMode}
                    setItems={setModes}
                    onChange={(option) => {
                      this.setState({ textInputValue: option.label });
                    }}
                  />
                </View>
              </View>
              <View
                style={[
                  styles.textBox,
                  {
                    flex: 0,
                    flexDirection: "row",
                    padding: 0,
                    paddingLeft: "1%",
                    borderColor: "lightgray",
                  },
                ]}
              >
                <TextInput icon="magnify" style={{ flex: 1 }} />
                <Button>Submit</Button>
              </View>
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
      ) : mode === "translate" ? (
        <Translation />
      ) : null}
    </>
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
