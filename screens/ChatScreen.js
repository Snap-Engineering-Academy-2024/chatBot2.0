import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform, Text } from "react-native";
import BasicChatbot from "../components/BasicChatbot";
import BakersChatbot from "../components/BakersChatbot";
import MalenasChatbot from "../components/MalenasChatbot";
import BeesChatbot from "../components/BeesChatbot";



// prettier-ignore
export const CHATBOTS = {
  "BasicChatbot": {
    id: "BasicChatbot",
    name: "EmojisMovieGPT",
    imageUrl: "https://loremflickr.com/140/140",
    component: BasicChatbot,
  },

  "BakersChatbot": {
    id: "BakersChatbot",
    name: "Baker's Dog Trivia",
    imageUrl: "https://img.freepik.com/free-vector/cute-dog-robot-cartoon-character-animal-technology-isolated_138676-3143.jpg?w=150",
    component: BakersChatbot,
  },

  "MalenasChatbot": {
    id: "MalenasChatbot",
    name: "Malena's Mysteries",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcqJS1MnlHOqVyt7ThrsCPHsUd710P_bWuFA&s",
    component: MalenasChatbot,
  },

  "BeesChatbot": {
    id: "BeesChatbot",
    name: "Bee's Trivia Game",
    imageUrl: "data:image/jpeg;base64,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",
    component: BeesChatbot,
  }

};

export default function ChatScreen({ route }) {
  const { chatbotName } = route.params;

  const makeChatbotComponent = (chatbotName) => {
    if (CHATBOTS[chatbotName]) {
      const Chatbot = CHATBOTS[chatbotName].component;
      return <Chatbot />;
    } else {
      return <Text>No Chatbot Found with name '{chatbotName}'</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {makeChatbotComponent(chatbotName)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
