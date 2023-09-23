import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface Props {
  color?: string;
  fontColor?: string;
  title?: string;
  onPressBtn: () => void;
  disable?: number;
}
export default function ButtonPrimary(props: Props) {
  return (
    <TouchableOpacity
      activeOpacity={props.disable != 0 ? 1 : 0.7}
      onPress={props.disable != 0 ? null : props.onPressBtn}
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
