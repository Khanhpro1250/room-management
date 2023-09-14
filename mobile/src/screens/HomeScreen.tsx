import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { Bars3Icon } from "react-native-heroicons/outline";
import Announcement from "../components/Announcement";

export default function HomeScreen() {
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
        {/* header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Bars3Icon style={{ marginHorizontal: 10 }} stroke={"black"} />
            <Text>Home</Text>
          </View>
          <Image
            source={require("../../assets/profile.jpg")}
            style={{ height: 32, width: 32, borderRadius: 32 / 2 }}
          />
        </View>
        {/* content */}
        <View style={{ flex: 1 }}>
          {/* Top content */}
          <View
            style={{
              flex: 1,
              marginBottom: 30,
              justifyContent: "center",
            }}
          >
            <Text>Ưu tiên</Text>
            <Announcement
              title="Tiền phòng"
              room="P.406 Tháng 10"
              status="Trạng thái: Chưa thanh toán"
            />
          </View>
          {/* Bottom content */}
          <View style={{ flex: 3 }}>
            <Text>All Session</Text>
            <ScrollView>
              <Announcement
                title="Nhắc nhở"
                room="P.406"
                status="Huỳnh Khanh và Trang Đoàn"
              />
              <Announcement
                title="Nhắc nhở"
                room="P.406"
                status="Huỳnh Khanh và Phương Ngân"
              />
              <Announcement
                title="Tiền phòng"
                room="P.406 Tháng 10"
                status="Trạng thái: Chưa thanh toán"
              />
              <Announcement
                title="Tiền phòng"
                room="P.406 Tháng 10"
                status="Trạng thái: Chưa thanh toán"
              />
              <Announcement
                title="Tiền phòng"
                room="P.406 Tháng 10"
                status="Trạng thái: Chưa thanh toán"
              />
              <Announcement
                title="Tiền phòng"
                room="P.406 Tháng 10"
                status="Trạng thái: Chưa thanh toán"
              />
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
