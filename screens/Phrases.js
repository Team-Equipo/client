// Phrases.js
import React from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Modal, Portal, Button, withTheme } from "react-native-paper";

import HideKeyboard from "../components/HideKeyboard";

const UserInfo = ({ navigation }) => {
  const [response, setResponse] = React.useState("");

  const [modalVisible, setModalVisible] = React.useState(false);

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
            <TextInput placeholder="Enter topic..." style={{ flex: 1 }} />
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

export default withTheme(UserInfo);
