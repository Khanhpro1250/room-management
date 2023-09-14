import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import RoomManagementScreen from "../screens/RoomManagementScreen";
import ChatScreen from "../screens/ChatScreen";
import {
  BuildingOfficeIcon,
  ChatBubbleBottomCenterIcon,
  HomeIcon,
} from "react-native-heroicons/outline";
import ButtonPrimary from "../components/ButtonPrimary";
import { Colors } from "../utils/Colors";

const Tab = createBottomTabNavigator();
export default function HomeUINavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: "white",
        },
        // tabBarActiveTintColor: "tomato",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          //   tabBarBadge: 3,
          tabBarIcon: ({ color, size }) => (
            <HomeIcon stroke={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Room"
        component={RoomManagementScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <BuildingOfficeIcon stroke={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <ChatBubbleBottomCenterIcon stroke={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
