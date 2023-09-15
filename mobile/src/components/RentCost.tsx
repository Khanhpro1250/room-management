import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  CalendarDaysIcon,
  CurrencyDollarIcon,
  HomeIcon,
  TvIcon,
} from "react-native-heroicons/outline";
interface Props {
  title: String;
  room: String;
  status: String;
}
export default function RentCost(props) {
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
            <View style={{ flexDirection: "row" }}>
              <CalendarDaysIcon
                stroke={"grey"}
                size={18}
                style={{ marginEnd: 5 }}
              />
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>Tháng 9</Text>
            </View>
            <Text style={{ fontSize: 14, fontWeight: "bold", color: "orange" }}>
              3.0005.000 đ
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <HomeIcon stroke={"grey"} size={18} style={{ marginEnd: 5 }} />

            <Text style={{ fontSize: 13 }}>
              Phòng P.406 - Kieu Lien Apartment
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row" }}>
              <CurrencyDollarIcon
                stroke={"grey"}
                size={18}
                style={{ marginEnd: 5 }}
              />
              <Text style={{ fontSize: 12 }}>Tiền phòng</Text>
            </View>

            <Text style={{ fontSize: 12, fontWeight: "bold" }}>
              2.000.000 đ
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row" }}>
              <TvIcon stroke={"grey"} size={18} style={{ marginEnd: 5 }} />
              <Text style={{ fontSize: 12 }}>Tiền dịch vụ</Text>
            </View>

            <Text style={{ fontSize: 12, fontWeight: "bold" }}>500.000 đ</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 12 }}>Trạng thái</Text>
            <Text
              style={{
                fontSize: 12,
                color: "white",
                backgroundColor: "red",
                borderRadius: 10,
                padding: 2,
              }}
            >
              Chưa thanh toán
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
