import { View, Text } from "react-native";
import React from "react";
import { HomeIcon } from "react-native-heroicons/outline";

export default function ServicesCard() {
  return (
    <View
      style={{
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
        shadowColor: "black",
        backgroundColor: "white",
        marginVertical: 5,
        height: 80,
        padding: 3,
      }}
    >
      <HomeIcon stroke={"black"} />
      <Text style={{ fontSize: 12 }}>Máy lạnh</Text>
      <Text style={{ fontSize: 12 }}>200.000 đ/ Phòng</Text>
    </View>
  );
}
