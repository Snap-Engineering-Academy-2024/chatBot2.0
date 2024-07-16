import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";

const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "React Native Chatbot",
  avatar: "https://pbs.twimg.com/media/GLlFnFyWoAAZmXA.jpg",
};

let triviaQuestions = [
  "Hello, welcome to simple trivia! Say 'Yes' when you're ready to play!",
  "Question 1: The poor have me, the rich want me, and if you eat me you'll die. What am I?",
  "Question 2: I can't be saved, though people try. When fun is had, they say I fly. They say I'm money: I can be spent, I can be wasted, But never lent. What am I?",
  "Question 3: What is '2 + 2'?",
];

const triviaAnswers = ["yes", "nothing", "time", "a string"];

let activeQuestion = 0;

export default function BeesChatbot() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (messages.length < 1) {
      // Add a "starting message" when chat UI first loads
      addBotMessage(
        "Hello, welcome to simple trivia! Say 'Yes' when you're ready to play!"
      );
    }
  }, []);

  const addNewMessage = (newMessages) => {
    setMessages((previousMessages) => {
      // console.log("PREVIOUS MESSAGES:", previousMessages);
      // console.log("NEW MESSAGE:", newMessages);
      return GiftedChat.append(previousMessages, newMessages);
    });
  };

  const addBotMessage = (text) => {
    addNewMessage([
      {
        _id: Math.round(Math.random() * 1000000),
        text: text,
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);
  };

  const respondToUser = (userMessages) => {
    if (userMessages[0].text.toLowerCase() === triviaAnswers[activeQuestion]) {
      let successMessage = activeQuestion === 0 ? "Groovy!" : "Correct!";
      addBotMessage(successMessage);
      activeQuestion = (activeQuestion + 1) % triviaQuestions.length;
      addBotMessage(triviaQuestions[activeQuestion]);
    } else {
      if (activeQuestion === 0) {
        addBotMessage("You pile of bricks! Do you want to play or don't you?!");
        return;
      } else {
        addBotMessage("Incorrect!");
      }

      addBotMessage(triviaQuestions[activeQuestion]);
    }
  };

  const onSend = useCallback((messages = []) => {
    addNewMessage(messages);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => {
        onSend(messages);
        // Wait a sec before responding
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

// Workaround to hide an unnessary warning about defaultProps
const error = console.error;
console.error = (...args) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};