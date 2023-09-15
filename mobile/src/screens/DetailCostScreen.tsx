import { View, Text, StatusBar } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  HomeIcon,
  PencilSquareIcon,
  ShareIcon,
} from "react-native-heroicons/outline";

export default function DetailCostScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginTop: 10,
        backgroundColor: "white",
      }}
    >
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <ChevronLeftIcon stroke={"black"} />
          <View style={{ flex: 1 }}>
            <Text
              style={{ alignSelf: "center", fontSize: 20, fontWeight: "bold" }}
            >
              Hóa đơn
            </Text>
          </View>
          <ShareIcon stroke={"black"} />
        </View>
        {/* content */}
        <View>
          {/* date hop dong */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontWeight: "bold" }}>#000078</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>09-2023</Text>
              <CalendarDaysIcon stroke={"green"} />
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <HomeIcon stroke={"black"} style={{ marginEnd: 10 }} />
            <Text style={{ fontWeight: "bold", color: "black" }}>
              Phòng P.406
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <PencilSquareIcon stroke={"black"} style={{ marginEnd: 10 }} />
            <Text style={{ fontSize: 13, color: "grey" }}>
              Kỳ hóa đơn từ 01-09-2023 đến 31-09-2023
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <PencilSquareIcon stroke={"black"} style={{ marginEnd: 10 }} />
            <Text style={{ fontSize: 13, color: "grey" }}>
              Hạn thanh toán từ ngày 01-9-2023 đến 05-09-2023
            </Text>
          </View>
          {/* rent cost */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Tiền phòng</Text>
            <Text>2.000.000 đ</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Tiền dịch vụ</Text>
            <Text>1.0078.445 đ</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Giảm giá</Text>
            <Text>0 đ</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Tổng</Text>
            <Text style={{ fontWeight: "bold", color: "olive" }}>
              3.088.000 d
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontWeight: "bold" }}>Trạng thái</Text>
            <View>
              <Text
                style={{
                  color: "white",
                  backgroundColor: "red",
                  borderRadius: 5,
                  padding: 4,
                }}
              >
                Chưa thanh toán
              </Text>
            </View>
          </View>
          {/* electric */}
          <Text style={{ fontWeight: "bold", color: "olive" }}>ĐIỆN</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View>
              <Text>Chỉ số cũ</Text>
              <Text style={{ fontWeight: "bold" }}>555</Text>
            </View>
            <View>
              <Text>Chỉ số mới</Text>
              <Text style={{ fontWeight: "bold" }}>777</Text>
            </View>
            <View>
              <Text>Tiêu thụ</Text>
              <Text style={{ fontWeight: "bold" }}>222</Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Đơn giá</Text>
            <Text style={{ fontWeight: "bold" }}>3.500 đ</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Thành tiền</Text>
            <Text style={{ fontWeight: "bold" }}>388.500 đ</Text>
          </View>
          {/* water */}
          <Text style={{ fontWeight: "bold", color: "olive" }}>NƯỚC</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View>
              <Text>Chỉ số cũ</Text>
              <Text style={{ fontWeight: "bold" }}>112</Text>
            </View>
            <View>
              <Text>Chỉ số mới</Text>
              <Text style={{ fontWeight: "bold" }}>114</Text>
            </View>
            <View>
              <Text>Tiêu thụ</Text>
              <Text style={{ fontWeight: "bold" }}>2</Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Đơn giá</Text>
            <Text style={{ fontWeight: "bold" }}>20.000 đ</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Thành tiền</Text>
            <Text style={{ fontWeight: "bold" }}>40.000 đ</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
