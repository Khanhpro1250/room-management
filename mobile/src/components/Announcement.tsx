import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
interface Props {
  title: String;
  content: String;
  address: String;
  user: String;
  status: String;
  date: String;
  priority: String;
}
export default function Announcement(props) {
  return (
    <TouchableOpacity>
      <View
        style={{
          flex: 1,
          backgroundColor: "#F4F4F4",
          borderRadius: 10,
          paddingVertical: 10,
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
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                {props.title}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 12,
                color: "white",
                backgroundColor:
                  props.priority === "Cao"
                    ? "red"
                    : props.priority === "Trung bình"
                    ? "gold"
                    : "green",
                borderRadius: 10,
                paddingVertical: 2,
                paddingHorizontal: 10,
              }}
            >
              {props.priority}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 13 }}>{props.content}</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 12 }}>{props.address}</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 12 }}>Quản lý: 0949696722 </Text>
            </View>
            <Text style={{ fontSize: 12, color: "green" }}>{props.date}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
