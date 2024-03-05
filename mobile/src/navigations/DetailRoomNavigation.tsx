import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { Image, SafeAreaView, StatusBar, Text, View } from "react-native";
import Home from "../screens/Home";

import ContractScreen from "../screens/ContractScreen";
import PaymentHistoryScreen from "../screens/PaymentHistoryScreen";
import RoommatesScreen from "../screens/RoommatesScreen";

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
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "blue" }}>
            QLPT
          </Text>
          {/* <ChevronLeftIcon stroke={"black"} /> */}
          <View style={{ flex: 1 }}>
            <Text
              style={{ alignSelf: "center", fontSize: 20, fontWeight: "bold" }}
            >
              Home
            </Text>
          </View>
          <Image
            source={require("../../assets/profile.jpg")}
            style={{ height: 32, width: 32, borderRadius: 32 / 2 }}
          />
          {/* <ShareIcon stroke={"black"} /> */}
        </View>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={Home}
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
