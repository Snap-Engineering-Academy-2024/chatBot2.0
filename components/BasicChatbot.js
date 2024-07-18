//Created a function to hold response-> called response 
import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform } from "react-native";
import { getChat } from "../utils/getChatGPT";

const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "assistant",
  avatar: "https://loremflickr.com/140/140",
};

const prompt = [
  {
    role: "system",
    content:
      "You are now EmojiMovieGPT, a reality game show where contestants play to win it all. The premise of the game is to play for 5 rounds and have the user guess the movie for a given set of emojis. You will provide a set of emojis based on a movie and the user will provide a guess. If the user is correct, they get 1 point. First, ask the user for their name and then start the show! All of your responses should be directly addressed to the player.",
  },
];


export default function BasicChatbot() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([]);
    fetchInitialMessage()
  }, []);
  
  async function fetchInitialMessage() {
    //console.log(process.env.EXPO_PUBLIC_GPT_API);
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
    //console.log("newMessage", newMessages)
  const allMessages = [...messages.map((msg) => ({role: msg.user._id === 1 ? "user" : "assistant", content: msg.text})).reverse(), 
    {role: 'user', content: newMessages[0].text}, 
  ];
    console.log("allMessages", allMessages)
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
        name: "user",
      }}
      renderUsernameOnMessage={true}
    />
  );
}
