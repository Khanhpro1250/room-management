import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ShareIcon } from "react-native-heroicons/outline";
import Request from "../components/Request";
import { ActivityIndicator, Button } from "react-native-paper";
import Axios from "axios";
type Request = {
  title: string;
  content: string;
  status: string;
};
export default function RequestsScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Request[]>([]);
  const getRequests = () => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    try {
      Axios.get("http://413a-42-113-221-18.ngrok-free.app/api/request/index", {
        headers,
      })
        .then((response) => {
          console.log("Api:", response.data.result.items);
          setData(response.data.result.items);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRequests();
    // const headers = {
    //   "Content-Type": "application/json",
    // };
    // Axios.get("http://10.0.2.2:7179/api/request/index", { headers })
    //   .then((res) => {
    //     console.log("123123123", res);
    //   })
    //   .catch((error) => console.log(error));
  }, []);

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
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              data.map((x, id) => {
                return (
                  <Request key={id} address={x.title} priority={x.status} />
                );
              })
            )}
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
