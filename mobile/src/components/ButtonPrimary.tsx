import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface Props {
  color?: string;
  fontColor?: string;
  title?: string;
}
export default function ButtonPrimary(props: Props) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: props.color,
        borderRadius: 8,
        height: 56,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 15,
      }}
    >
      <Text
        style={{
          color: props.fontColor ? props.fontColor : "white",
          fontSize: 15,
        }}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}
