import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { RadioButton } from "react-native-paper";
import { HomeIcon } from "react-native-heroicons/outline";

export default function DetailRoomScreen() {
  return (
    <View>
      <Text style={{ fontWeight: "bold", fontSize: 20, alignSelf: "center" }}>
        3.000.000 đ
      </Text>
      {/* dich vu */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text>Diện tích</Text>
          <Text>22 m</Text>
          <Text>Phòng ngủ</Text>
          <Text>1</Text>
          <Text>Số người tối đa</Text>
          <Text>2</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text>Tầng</Text>
          <Text>4</Text>
          <Text>Phòng khách</Text>
          <Text>0</Text>
          <Text>Tiền cọc</Text>
          <Text>2.000.000 đ</Text>
        </View>
      </View>
      {/* Hop dong */}
      <View style={{ alignItems: "center" }}>
        <Text>Hợp đồng #000078</Text>
        <Text>Từ 15-09-2023 đến 15-09-2024</Text>
        <TouchableOpacity
          style={{
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "grey",
            padding: 10,
          }}
        >
          <Text style={{ color: "green" }}>Xem chi tiết</Text>
        </TouchableOpacity>
      </View>
      {/* gender */}
      <View style={{ flexDirection: "row" }}>
        <Text>Gender</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <RadioButton value="first" status={"unchecked"} />
          <Text>Nam</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <RadioButton value="first" status={"checked"} />
          <Text>Nữ</Text>
        </View>
      </View>
      {/* Dich vu */}
      <View>
        <Text>Dich vu co phi</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <HomeIcon stroke={"black"} />
            <Text>Máy lạnh</Text>
            <Text>200.000 đ/ Phòng</Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <HomeIcon stroke={"black"} />
            <Text>Máy lạnh</Text>
            <Text>200.000 đ/ Phòng</Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <HomeIcon stroke={"black"} />
            <Text>Máy lạnh</Text>
            <Text>200.000 đ/ Phòng</Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <HomeIcon stroke={"black"} />
            <Text>Máy lạnh</Text>
            <Text>200.000 đ/ Phòng</Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <HomeIcon stroke={"black"} />
            <Text>Máy lạnh</Text>
            <Text>200.000 đ/ Phòng</Text>
          </View>
        </View>
      </View>
      <Text>Dịch vụ miễn phí</Text>
      <Text>Dữ liệu trống</Text>
    </View>
  );
}
