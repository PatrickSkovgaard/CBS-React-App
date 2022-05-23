import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Button, ImageBackground, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../App";
import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import Screen2 from "../screens/Screen2";
import Screen3 from "../screens/Screen3";
import SignInScreen from "../screens/SignInScreen";
import SignupScreen from "../screens/SignupScreen";
import TodoScreen from "../screens/TodoScreen";
import { logout } from "../store/actions/user.actions";
import { StackParamList } from "../typings/navigations";



const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator();


function ChatStackNavigator() {

  const dispatch = useDispatch();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Screen1" component={ChatScreen} 
      options={{
        headerTitle: () => (<Text>Logout button</Text>),
        headerRight: () => (
          <Button
            onPress={() => dispatch(logout())}
            title="logout!"
            color="#0a0"
          />
        )
      }}
      />
      <Stack.Screen name="Screen2" component={Screen2} />
      <Stack.Screen name="Screen3" component={Screen3} />
    </Stack.Navigator>
  );
}



export default function Navigation(){
  
const isSignedIn = useSelector((state: RootState) => state.user.loggedInUser)
const token = useSelector((state: any) => state.user.idToken)

sessionStorage.setItem("token", token)
sessionStorage.setItem("isSignedIn", isSignedIn)


  return (
    
    <NavigationContainer>
      <ImageBackground source={require("../dark_background.jpg")} resizeMode="cover"></ImageBackground>
    {isSignedIn !== null ? (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Chat" component={ChatStackNavigator} />
          <Tab.Screen name="todo" component={TodoScreen} />
          {/* <Tab.Screen name="Discover" component={DiscoverScreen} /> */}
          {/* <Tab.Screen name="Menu" component={MenuScreen} /> */}
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