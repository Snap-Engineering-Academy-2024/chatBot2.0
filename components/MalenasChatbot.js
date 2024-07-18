//Created a function to hold response-> called response 
import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, SafeAreaView, Platform } from "react-native";
import { getChat } from "../utils/getChatGPT";

const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "React Native Chatbot",
  // name: "assistant",

  avatar: "data:image/png;base64,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",
};

const prompt = [
  {
    role: "system",
    content:
      "Welcome the user first saying 'Hello, and welcome curious detective' and then go straight into game more!, I want you to simulate a choose-your-own adventure/mystery style book where there is something to be found or a task to be completed. You will create the story, content, happenings of this book. You will output the pages, and, like a real gamebook, you will offer choices that branch off the story, and i will type in which choice i want to take. The story should last 7 rounds only and if the mystery/story is not solved by that time or the player doesn’t go down the correct path the player will lose. I want there to be three choices to choose from for each round (two of the choices are false , only one choice leads to the end. If the user fails to complete the story (or solve the mystery) properly some bad event happens and they lose (which you will describe to the loser), else if they complete the story properly the winner gets a prize and celebration (That you will choose based off of what the story was, but i want it to be silly). for this game there has to be a you win or you lose situation (the user can't win falsely every time) Understood? Please suggest scenarios for such a book. Once they answer one question move onto the next round. And can you make the story line shorter and easy to read.",
  },
];


export default function BasicChatbot() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([]);
    fetchInitialMessage()
  }, []);
  
  async function fetchInitialMessage() {
    // console.log(process.env.EXPO_PUBLIC_GPT_API);
    const response = await getChat(prompt);
    const message = response.choices[0].message;
    const content = response.choices[0].message.content;

    //console.logs() to check the call to API messages
    // console.log("message: ", message);
    // console.log("content: ", content);
 
    //Print API messages to screen with addbotMessage()
   addBotMessage(content);

 }
  const addNewMessage = (newMessages) => {
   
    setMessages((previousMessages) => {
      // console.log("PREVIOUS MESSAGES:", previousMessages);
      // console.log("NEW MESSAGE:", newMessages);
      return GiftedChat.append(previousMessages, newMessages);
    });

  };

  //for addBotMessage pass 'content' and use object to print 'text' to screen by assigning it's value of text
  const addBotMessage = (content) => {

    addNewMessage([
      {
        _id: Math.round(Math.random() * 1000000),
        text: content,
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);

  };

  const respondToUser = async (newMessages) => {
  const allMessages = [...messages.map((msg) => ({role: msg.user._id === 1 ? "user" : "assistant", content: msg.text})).reverse(), 
    {role: 'user', content: newMessages[0].text}, 
  ];

     const response = await getChat([...prompt, ...allMessages]);
     const content = response.choices[0].message.content;
   
    addBotMessage(content);
  }

  const onSend = useCallback((messages = []) => {
    addNewMessage(messages);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => {
        onSend(messages);
        setTimeout(() => respondToUser(messages), 1000);
      }}
      user={{
        _id: 1,
        name: "Baker",
      }}
      renderUsernameOnMessage={true}
    />
  );
}