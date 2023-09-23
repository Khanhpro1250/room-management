import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import { LightBulbIcon } from "react-native-heroicons/outline";

// props: placeholder, isPassword
interface Props {
  placeholder?: string;
  isPassword?: boolean;
}
export default function InputText(props: Props) {
  const [email, setEmail] = useState("");
  return (
    <View
      style={{
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E8ECF4",
        height: 56,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 8,
      }}
    >
      <TextInput
        onChangeText={(text) => {
          setEmail(text);
        }}
        placeholder={props.placeholder}
        style={{ flex: 1, fontSize: 15, marginStart: 15 }}
      />
      <TouchableOpacity style={{ display: props.isPassword ? "flex" : "none" }}>
        <LightBulbIcon stroke={"grey"} style={{ marginHorizontal: 8 }} />
      </TouchableOpacity>
    </View>
  );
}
