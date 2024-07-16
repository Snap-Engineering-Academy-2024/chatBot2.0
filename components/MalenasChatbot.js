import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";

const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "React Native Chatbot",
  avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtNE-Yn-eQZxEtxjoz4akhS27ukQI1_ynggg&s",
};

let riddles = [
  "Ello there, welcome to the Path of Riddles! Say 'Start' when you're ready to play!",
  "You start the path of riddles and 200ft in you see a bridge. Once you attempt to cross the bridge, a troll appears! He says you can't cross until you answer his riddle ~ Troll: I’m tall when I’m young, and I’m short when I’m old. What am I?",

]

const riddleAnswers = ["candle", "no", "no"];

let currentRiddle = 0;

export default function MalenasChatbot() {
  const [messages, setMessages] = useState([]);
  const [counter, setCounter] = useState(0);


  useEffect(() => {
    if (messages.length < 1) {
      // Add a "starting message" when chat UI first loads
      addBotMessage(
        "Ello there, welcome to the Path of Riddles! Say 'Start' when you're ready to play!"
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
    //console.log("Recent user msg:", userMessages[0].text);

    if (userMessages[0].text.toLowerCase() === riddleAnswers[currentRiddle]) {
      let successMessage = currentRiddle === 0 ? "Yes!" : "Correct!";
      addBotMessage(successMessage);
      currentRiddle = (currentRiddle + 1) % riddles.length;
      addBotMessage(riddles[currentRiddle]);
    } else {
      if (currentRiddle === 0) {
        addBotMessage("Don't be scared, say 'Start' when you're ready to start playing");
        return;
      } else {
        addBotMessage("Incorrect!");
      }

      addBotMessage(riddles[currentRiddle]);
    }
    
// if (counter == 0)
// {
//     if (userMessages[0].text.toLowerCase() == 'start') //toLower
//     {
//         addBotMessage("You start the path of riddles and 200ft in you see a bridge. Once you attempt to cross the bridge, a troll appears! He says you can't cross until you answer his riddle ~ Troll: I’m tall when I’m young, and I’m short when I’m old. What am I?");
//         setCounter(counter + 1);
//     }
//     else 
//     {
//       addBotMessage("Don't be scared, say 'Start' when you're ready to start playing");
//     }
//   }
//   else if (counter == 1)
//   {
//     if (userMessages[0].text.toLowerCase() == 'candle')
//           {
//             addBotMessage("Troll: 'ARGH! You're correct :( You may cross the bridge.' ~ You cross the bridge and start walking further into ");
//             setCounter(counter + 1);
//           }
//           else 
//           {
//             addBotMessage("Womp Womp you're wrong :( Try again !");
//           }
//   }
//   else if (counter == 2)
//   {
//     if (userMessages[0].text.toLowerCase() == 'no')
//     {
//       addBotMessage("Correct! Question 3 - Is Luis Balding?");
//       setCounter(counter + 1);
//     }
//     else
//     {
//       addBotMessage("Wrong:(");
//     }
//   }
//   else if (counter == 3)
//     {
//       if (userMessages[0].text.toLowerCase() == 'no')
//       {
//         addBotMessage("Correct! WOW");
//         setCounter(counter + 1);
//       }
//       else
//       {
//         addBotMessage("Boom Boom Pow!");
//       }
//     }

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