// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, View } from "react-native";
// import { useSpotifyAuth } from "./utils";
// import { Themes } from "./assets/Themes";
// import "react-native-gesture-handler";
// import { createStackNavigator } from "@react-navigation/stack";
// import { NavigationContainer } from "@react-navigation/native";
// import HomeScreen from "./screens/HomeScreen";
// import ChatScreen from "./screens/ChatScreen";

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="HomeScreen" component={HomeScreen} />
//         <Stack.Screen name="ChatScreen" component={ChatScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//     // <HomeScreen />
//   );
// }

// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, SafeAreaView } from 'react-native';
// import { supabase } from './utils/supabase';

// export default function App() {
//   const [todos, setTodos] = useState([]);

//   useEffect(() => {
//     const getTodos = async () => {
//       try {
//         const { data: todos, error } = await supabase.from('todos').select();

//         if (error) {
//           console.error('Error fetching todos:', error.message);
//           return;
//         }

//         if (todos && todos.length > 0) {
//           setTodos(todos);
//         }
//       } catch (error) {
//         console.error('Error fetching todos:', error.message);
//       }
//     };

//     getTodos();
//   }, []);

//   return (
//     <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Todo List</Text>
//       <FlatList
//         data={todos}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => <Text key={item.id}>{item.title}</Text>}
//       />
//     </SafeAreaView>
//   );
// };

import { useState, useEffect } from 'react'
import { supabase } from './utils/supabase';
import Auth from './components/Auth'
import Account from './components/Account'
import { View } from 'react-native'
import { Session } from '@supabase/supabase-js'

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <View>
      {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
    </View>
  )
}

