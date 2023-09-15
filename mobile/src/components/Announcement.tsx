import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  ExclamationTriangleIcon,
  HomeIcon,
  MapPinIcon,
  UserIcon,
  UsersIcon,
} from "react-native-heroicons/outline";
interface Props {
  title: String;
  room: String;
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
          height: 130,
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
              <ExclamationTriangleIcon
                color={"grey"}
                size={18}
                style={{ marginEnd: 5 }}
              />
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
            <HomeIcon stroke={"grey"} size={18} style={{ marginEnd: 5 }} />
            <Text style={{ fontSize: 13 }}>{props.room}</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <MapPinIcon stroke={"grey"} size={18} style={{ marginEnd: 5 }} />
            <Text style={{ fontSize: 12 }}>{props.address}</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row" }}>
              <UserIcon stroke={"grey"} size={18} style={{ marginEnd: 5 }} />
              <Text style={{ fontSize: 12 }}>{props.user}</Text>
            </View>
            <Text style={{ fontSize: 12, color: "green" }}>{props.date}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
