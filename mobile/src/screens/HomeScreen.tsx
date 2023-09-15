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
import RentCost from "../components/RentCost";
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
            marginBottom: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Bars3Icon style={{ marginEnd: 10 }} stroke={"blue"} />
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "blue" }}>
              Home
            </Text>
          </View>
          <Image
            source={require("../../assets/profile.jpg")}
            style={{ height: 32, width: 32, borderRadius: 32 / 2 }}
          />
        </View>
        {/* content */}
        <View style={{ flex: 1 }}>
          {/* Bottom content */}
          <View style={{ flex: 1 }}>
            <Text>All Session</Text>
            <ScrollView>
              <RentCost title="Bóng đèn bị hỏng" room="P.406" />
              <Announcement
                title="Khóa cửa chính bị kẹt"
                room="Tất cả"
                address="52B5, Phước Kiểng, Nhà Bè"
                user="Admin"
                date="10/09/2023"
                priority="Cao"
              />
              <Announcement
                title="Nhắc nhở làm ồn"
                room="P.104"
                address="52B5, Phước Kiểng, Nhà Bè"
                user="Admin"
                date="10/09/2023"
                priority="Cao"
              />
              <Announcement
                title="Tường bị rạn nứt"
                room="Tất cả"
                address="52B5, Phước Kiểng, Nhà Bè"
                user="Admin"
                date="10/09/2023"
                priority="Trung bình"
              />
              <Announcement
                title="Không được bỏ rác phía trước"
                room="P.206"
                address="52B5, Phước Kiểng, Nhà Bè"
                user="Admin"
                date="10/09/2023"
                priority="Thấp"
              />
              <Announcement
                title="Cẩn thận trộm cắp"
                room="Tất cả"
                address="52B5, Phước Kiểng, Nhà Bè"
                user="Admin"
                date="10/09/2023"
                priority="Cao"
              />
              <Announcement
                title="Tường bị rạn nứt"
                room="P.112"
                address="52B5, Phước Kiểng, Nhà Bè"
                user="Admin"
                date="10/09/2023"
                priority="Cao"
              />
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
