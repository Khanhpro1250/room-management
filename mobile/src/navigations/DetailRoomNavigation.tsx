import { View, Text, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { ChevronLeftIcon, ShareIcon } from "react-native-heroicons/outline";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DetailRoomScreen from "../screens/DetailRoomScreen";
import UserInformationScreen from "../screens/UserInformationScreen";

const Tab = createMaterialTopTabNavigator();
export default function DetailRoomNavigation() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginTop: 10,
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
            name="UserInfor"
            component={UserInformationScreen}
            options={{ tabBarLabel: "Người thuê" }}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
}
