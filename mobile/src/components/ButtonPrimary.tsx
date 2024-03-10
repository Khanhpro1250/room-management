import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface Props {
  color?: string;
  fontColor?: string;
  title?: string;
  onPressBtn?: () => void;
  disable?: number;
}
export default function ButtonPrimary(props: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={props.onPressBtn}
      style={{
        backgroundColor: props.color,
        borderRadius: 8,
        height: 56,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 15,
        cursor: "pointer",
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
