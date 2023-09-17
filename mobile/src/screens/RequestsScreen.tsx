import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { ChevronLeftIcon, ShareIcon } from "react-native-heroicons/outline";
import Request from "../components/Request";
import { Button } from "react-native-paper";

export default function RequestsScreen({ navigation }) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "white",
      }}
    >
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ flex: 1, marginTop: 15 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Danh sách yêu cầu
            </Text>
            <Button
              mode="contained"
              buttonColor="violet"
              onPress={() => {
                navigation.navigate("AddRequest");
              }}
            >
              <Text>Thêm</Text>
            </Button>
          </View>

          <ScrollView>
            <Request
              title="Khóa cửa chính bị kẹt"
              address="52B5, Phước Kiểng, Nhà Bè"
              user="Nguyễn Nhật Linh"
              date="10/09/2023"
              priority="Cao"
              status="Chưa xử lí"
            />
            <Request
              title="Toilet bị hư"
              address="52B5, Phước Kiểng, Nhà Bè"
              user="Nguyễn Nhật Linh"
              date="12/09/2023"
              priority="Trung bình"
              status="Đã xử lí"
            />
            <Request
              title="Thay ổ khóa mới"
              address="52B5, Phước Kiểng, Nhà Bè"
              user="Nguyễn Nhật Linh"
              date="15/09/2023"
              priority="Trung bình"
              status="Đã xử lí"
            />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
