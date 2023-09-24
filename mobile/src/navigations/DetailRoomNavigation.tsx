import { View, Text, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { ChevronLeftIcon, ShareIcon } from "react-native-heroicons/outline";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DetailRoomScreen from "../screens/DetailRoomScreen";

import RoommatesScreen from "../screens/RoommatesScreen";
import PaymentHistoryScreen from "../screens/PaymentHistoryScreen";
import ContractScreen from "../screens/ContractScreen";

const Tab = createMaterialTopTabNavigator();
export default function DetailRoomNavigation() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "white",
      }}
    >
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 20,
            marginHorizontal: 22,
            marginTop: 10,
          }}
        >
          <ChevronLeftIcon stroke={"black"} />
          <View style={{ flex: 1 }}>
            <Text
              style={{ alignSelf: "center", fontSize: 20, fontWeight: "bold" }}
            >
              P406
            </Text>
          </View>
          <ShareIcon stroke={"black"} />
        </View>
        <Tab.Navigator>
          <Tab.Screen
            name="DetailRoomScreen"
            component={DetailRoomScreen}
            options={{ tabBarLabel: "Thông tin" }}
          />
          <Tab.Screen
            name="Roommates"
            component={RoommatesScreen}
            options={{ tabBarLabel: "Người thuê" }}
          />
          <Tab.Screen
            name="History"
            component={PaymentHistoryScreen}
            options={{ tabBarLabel: "Lịch sử" }}
          />
          <Tab.Screen
            name="Contract"
            component={ContractScreen}
            options={{ tabBarLabel: "Hợp đồng" }}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
}
