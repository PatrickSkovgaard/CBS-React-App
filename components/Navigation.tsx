import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Button, ImageBackground, StyleSheet, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../App";
import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import Screen2 from "../screens/ChatroomMessageScreen";
import SignInScreen from "../screens/SignInScreen";
import SignupScreen from "../screens/SignupScreen";
import { logout } from "../store/actions/user.actions";
import { StackParamList } from "../typings/navigations";



const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator();


function ChatStackNavigator() {

  const dispatch = useDispatch();
  

  return (
    <Stack.Navigator>
      <Stack.Screen name="Chatrooms" component={ChatScreen}
      options={{
        animation: "default",
        headerStyle: {
          backgroundColor: "#358"
        },
        contentStyle: {
          opacity: 50,
          height: 10
        },
        headerBackTitleStyle: {
          fontFamily: "Times New Roman"
        },
     /*   headerSearchBarOptions:{                   //Måske lav en funktion i ChatScreen, til at hente søgte chatrooms
          onSearchButtonPress: 
        },*/
        headerTitleStyle: {
          fontFamily: "Times New Roman",
          fontSize: 25
        },
        headerTitleAlign: "center",
        headerRight: () => (
          <Button
            onPress={() => dispatch(logout())}
            title="logout!"
            color="#3c3"
          />
        )
      }}
      />
      <Stack.Screen name="ChatroomMessageScreen" component={Screen2}
      options={{
        headerRight: () => (
          <Button
            onPress={() => dispatch(logout())}
            title="logout!"
            color="#3c3"
          />
        )
      }}
      />
 
</Stack.Navigator>
 );}



export default function Navigation(){
  
const isSignedIn = useSelector((state: RootState) => state.user.loggedInUser)
const token = useSelector((state: any) => state.user.idToken)

sessionStorage.setItem("token", token)
sessionStorage.setItem("isSignedIn", isSignedIn)


  return (
    
    <NavigationContainer>
    {isSignedIn !== null ? (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Chat" component={ChatStackNavigator} />
       </Tab.Navigator>
      ) : (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Sign in" component={SignInScreen} />
          <Tab.Screen name="Sign up" component={SignupScreen} />
        </Tab.Navigator>
      )
    }    
      </NavigationContainer>
  );
}