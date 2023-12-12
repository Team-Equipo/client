import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import Carousel from "react-native-snap-carousel"; // Import the Carousel component
import { settingsStyle } from "../styles/globalStyles";
import { FontAwesome } from "@expo/vector-icons";

const HelpPage = ({ navigation }) => {
  const navigateToMainMenu = () => {
    alert("please add navigation");
    // navigation.navigate('MainMenu');
  };

  const { height, width } = useWindowDimensions();

  const carouselItems = [
    {
      image: require("../assets/images/help1.png"),
      title1: "Section 1: Finding Phrases",
      section1: "1.1 Generate New Phrases for a Topic",
      description1:
        "Tap on the topic selector to list topics, then tap on the topic to generate a list of new phrases",
      section2: "1.2 View Dictionary Definitions",
      description2:
        "Tap on any phrase to view its dictionary definition on WordReference.com",
      section3: "1.3 Change Language",
      description3: "Tap on this icon to switch the language",
      section4: "1.4 Hear a Phrase",
      description4:
        "Tap on this icon to hear the currently shown text spoken aloud",
      section5: "1.5 Save a Phrase",
      description5: "Tap on this icon to save the phrase",
      section6: "1.6 Re-generate Phrases",
      description6:
        "Tap on this icon to regenerate the phrases for the current topic",
    },
    {
      image: require("../assets/images/help2.png"),
      title1: "Section 2: Using Translation",
      section1: "2.1 Swapping Target Language",
      description1: "Tap on the icon to switch the input and output languages",
      section2: "2.2 Translate Input Text",
      description2:
        "Tap on the icon to translate the input text to the target language",
      section3: "2.3 Hear the Translation",
      description3: "Tap on the icon to hear the output text spoken aloud",
      section4: "2.4 View Dictionary Definition",
      description4:
        "Tap on translated word to bring up definition on WordReference.com, tap outside to close",
    },
    {
      image: require("../assets/images/help3.png"),
      title1: "Section 3: Managing Saved Phrases",
      section1: "3.1: View Downloaded Phrases",
      description1: "By default, the app displays all your downloaded phrases",
      section2: "3.2 Change the Order of Saved Phrases",
      description2:
        "Tap and hold on to the phrase’s white space and drag the phrase up or down to change the card’s order",
      section3: "3.3 Change Language",
      description3: "Tap on this icon to switch the language",
      section4: "3.4 Hear a Phrase",
      description4:
        "Tap on this icon to hear the currently shown text spoken aloud",
      section5: "3.5 Removing a Phrase",
      description5: "Tap on the icon to remove a downloaded phrase",
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      {/* Modify the button to go to main menu */}
      {/* <TouchableOpacity onPress={navigateToMainMenu} style={styles.iconContainer}>
        <FontAwesome name="home" size={24} color="black" marginTop={'1%'}/>
      </TouchableOpacity> */}
      <Text style={settingsStyle.titleText5}> {item.title1}</Text>

      <Image source={item.image} style={settingsStyle.squareImage} />

      <View style={styles.txtcontainer}>
        <Text style={settingsStyle.titleText4}>{item.section1}</Text>
        <Text style={settingsStyle.normalText}>{item.description1}</Text>
        <Text style={settingsStyle.titleText4}>{item.section2}</Text>
        <Text style={settingsStyle.normalText}>{item.description2}</Text>
        <Text style={settingsStyle.titleText4}>{item.section3}</Text>
        <Text style={settingsStyle.normalText}>{item.description3}</Text>
        <Text style={settingsStyle.titleText4}>{item.section4}</Text>
        <Text style={settingsStyle.normalText}>{item.description4}</Text>
        <Text style={settingsStyle.titleText4}>{item.section5}</Text>
        <Text style={settingsStyle.normalText}>{item.description5}</Text>
        <Text style={settingsStyle.titleText4}>{item.section6}</Text>
        <Text style={settingsStyle.normalText}>{item.description6}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={carouselItems}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  txtcontainer: {
    display: "flex",
    paddingHorizontal: 20,
    marginBottom: "10%",
    marginTop: "5%",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",

    padding: 20,
  },
  imageContainer: {
    flex: 1,
    marginTop: "20%",
    backgroundColor: "black",
  },
  image: {
    display: "flex",
    width: "60%",
    height: undefined,
    aspectRatio: "0.79",
    marginTop: "2%",
    alignSelf: "center",
  },
});

export default HelpPage;
