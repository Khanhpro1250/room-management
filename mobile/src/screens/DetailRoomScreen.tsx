import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { RadioButton } from "react-native-paper";
import { ChevronRightIcon, HomeIcon } from "react-native-heroicons/outline";
import ServicesCard from "../components/ServicesCard";

export default function DetailRoomScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 22 }}>
      <View
        style={{
          elevation: 10,
          shadowColor: "black",
          backgroundColor: "white",
          borderRadius: 10,
          padding: 25,
          marginVertical: 20,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            alignSelf: "center",
            color: "gold",
          }}
        >
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
            <Text style={styles.title}>Diện tích</Text>
            <Text style={styles.info}>22 m</Text>
            <Text style={styles.title}>Phòng ngủ</Text>
            <Text style={styles.info}>1</Text>
            <Text style={styles.title}>Số người tối đa</Text>
            <Text style={styles.info}>2</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.title}>Tầng</Text>
            <Text style={styles.info}>4</Text>
            <Text style={styles.title}>Phòng khách</Text>
            <Text style={styles.info}>0</Text>
            <Text style={styles.title}>Tiền cọc</Text>
            <Text style={styles.info}>2.000.000 đ</Text>
          </View>
        </View>
      </View>
      {/* Hop dong */}
      <View
        style={{
          alignItems: "center",
          elevation: 3,
          shadowColor: "black",
          backgroundColor: "white",
          borderRadius: 10,
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={styles.title}>Hợp đồng #000078</Text>
          <Text>Từ 15-09-2023 đến 15-09-2024</Text>
        </View>
        <TouchableOpacity>
          <ChevronRightIcon stroke={"grey"} />
        </TouchableOpacity>
      </View>
      {/* Dich vu */}
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 16, marginVertical: 10 }}>
          Dịch vụ có phí
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <ServicesCard />
          <ServicesCard />
          <ServicesCard />
          <ServicesCard />
          <ServicesCard />
          <ServicesCard />
        </View>
      </View>
      <Text style={{ fontWeight: "bold", fontSize: 16, marginVertical: 10 }}>
        Dịch vụ miễn phí
      </Text>
      <Text style={{ fontWeight: "bold", fontSize: 16, marginVertical: 10 }}>
        Dịch vụ có phí
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
  },
  info: {
    fontSize: 13,
    color: "grey",
    fontWeight: "bold",
  },
});
