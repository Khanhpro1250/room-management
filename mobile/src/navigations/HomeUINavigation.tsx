import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Notification from "../screens/Notification";
import ChatScreen from "../screens/ChatScreen";
import {
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
  ChatBubbleBottomCenterIcon,
  ChatBubbleLeftEllipsisIcon,
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
          name="Notification"
          component={Notification}
          options={{
            headerShown: false,
            //   tabBarBadge: 3,
            tabBarIcon: ({ color, size }) => (
              <ChatBubbleLeftEllipsisIcon stroke={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={DetailRoomNavigation}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <HomeIcon stroke={color} size={size} />
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
