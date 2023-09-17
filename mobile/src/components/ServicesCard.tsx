import { View, Text } from "react-native";
import React from "react";
import { HomeIcon } from "react-native-heroicons/outline";

interface props {
  name: String;
  price: String;
  color: String;
}
export default function ServicesCard(props) {
  return (
    <View
      style={{
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
        shadowColor: "black",
        backgroundColor: props.color,
        marginVertical: 5,
        height: 80,
        width: 120,
        padding: 3,
      }}
    >
      <HomeIcon stroke={"black"} />
      <Text style={{ fontSize: 12 }}>{props.name}</Text>
      <Text style={{ fontSize: 12 }}>{props.price}</Text>
    </View>
  );
}
