import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
interface Props {
  title: String;
  room: String;
  status: String;
}
export default function Announcement(props) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F4F4F4",
        borderRadius: 20,
        height: 150,
        marginVertical: 5,
      }}
    >
      <View
        style={{
          marginHorizontal: 10,
          justifyContent: "center",
          marginVertical: 10,
        }}
      >
        <Text style={{ fontSize: 22 }}>{props.title}</Text>
        <Text style={{ fontSize: 12 }}>{props.room}</Text>
        <Text style={{ fontSize: 12 }}>{props.status}</Text>
        <TouchableOpacity style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 16, color: "green" }}>Xem ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
