import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import RoomManagementScreen from "../screens/RoomManagementScreen";
import ChatScreen from "../screens/ChatScreen";
import {
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
  ChatBubbleBottomCenterIcon,
  ClipboardDocumentListIcon,
  HomeIcon,
} from "react-native-heroicons/outline";
import ButtonPrimary from "../components/ButtonPrimary";
import { Colors } from "../utils/Colors";
import DetailRoomNavigation from "./DetailRoomNavigation";
import RequestsScreen from "../screens/RequestsScreen";

const Tab = createBottomTabNavigator();
export default function HomeUINavigation() {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
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
          component={DetailRoomNavigation}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <BuildingStorefrontIcon stroke={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Request"
          component={RequestsScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <ClipboardDocumentListIcon stroke={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
