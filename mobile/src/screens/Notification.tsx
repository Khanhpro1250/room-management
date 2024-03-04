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

export default function Notification() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
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
            marginTop: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {/* <Bars3Icon style={{ marginEnd: 10 }} stroke={"blue"} /> */}
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "blue" }}>
              Thông báo
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
            <Text>Tất cả thông báo</Text>
            <ScrollView>
              {/* <RentCost title="Bóng đèn bị hỏng" room="P.406" /> */}
              <Announcement
                title="Thông báo"
                content="Không được gây mất trật tự sau 10 giờ đêm"
                user="Admin"
                date="10/09/2023"
                priority="Cao"
              />
              <Announcement
                title="Thông báo"
                content="Sau 12h đêm, không được sử dụng mát giặt gây ồn ào, ảnh hướng đến những người xung quanh."
                address=""
                user="Admin"
                date="10/09/2023"
                priority="Cao"
              />
              <Announcement
                title="Thông báo"
                content="Xe đi về sắp xếp gọn ràng, để đúng vạch kẽ, không để xe tại các vị trí không có vạch kẻ. Xe nào để không đúng ô kẻ quá 3 lần, chúng tôi xin từ chối phục vụ."
                address=""
                user="Admin"
                date="10/09/2023"
                priority="Trung bình"
              />
              <Announcement
                title="Thông báo"
                content="Nghiêm cấm các hành vi: tổ chức mua bán, giao dịch tại phòng trọ các mặt hàng nhà nước nghiêm cấm, không được phép nuôi thú cưng, không tổ chức đánh bạc, môi giới mại dâm, mang vũ khí, chất cấm vào trọ."
                address=""
                user="Admin"
                date="10/09/2023"
                priority="Thấp"
              />
              <Announcement
                title="Thông báo"
                content="Thông báo tiền phòng tháng 2, năm 2024"
                address=""
                user="Admin"
                date="10/09/2023"
                priority="Cao"
              />
              <Announcement
                title="Thông báo"
                content="Thông báo tiền phòng tháng 1, năm 2024"
                address=""
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
