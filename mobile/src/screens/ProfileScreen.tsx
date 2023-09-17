import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { ChevronLeftIcon, ShareIcon } from "react-native-heroicons/outline";

export default function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "white",
      }}
    >
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 20,
            marginHorizontal: 22,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <ChevronLeftIcon stroke={"black"} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text
              style={{ alignSelf: "center", fontSize: 20, fontWeight: "bold" }}
            >
              Profile
            </Text>
          </View>
          <ShareIcon />
        </View>
        {/* Content */}
        <View
          style={{
            elevation: 3,
            shadowColor: "black",
            backgroundColor: "white",
            borderRadius: 10,
            marginHorizontal: 22,
            paddingBottom: 30,
          }}
        >
          {/* name */}
          <View
            style={{
              flexDirection: "row",
              marginVertical: 5,
              padding: 15,
              borderBottomWidth: 0.3,
              borderColor: "grey",
              marginHorizontal: 5,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "grey",
                width: "30%",
              }}
            >
              Name
            </Text>
            <Text style={{ width: "70%" }}>Nguyễn Nhật Linh</Text>
          </View>
          {/* gioi tinh */}
          <View
            style={{
              flexDirection: "row",
              marginVertical: 5,
              padding: 15,
              borderBottomWidth: 0.3,
              borderColor: "grey",
              marginHorizontal: 5,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "grey",
                width: "30%",
              }}
            >
              Gender
            </Text>
            <Text style={{ width: "70%" }}>Nam</Text>
          </View>
          {/* Ngay sinh */}
          <View
            style={{
              flexDirection: "row",
              marginVertical: 5,
              padding: 15,
              borderBottomWidth: 0.3,
              borderColor: "grey",
              marginHorizontal: 5,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "grey",
                width: "30%",
              }}
            >
              Ngày sinh
            </Text>
            <Text style={{ width: "70%" }}>29-08-2001</Text>
          </View>
          {/* CCCD */}
          <View
            style={{
              flexDirection: "row",
              marginVertical: 5,
              padding: 15,
              borderBottomWidth: 0.3,
              borderColor: "grey",
              marginHorizontal: 5,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "grey",
                width: "30%",
              }}
            >
              CCCD
            </Text>
            <Text style={{ width: "70%" }}>385998776</Text>
          </View>
          {/* Email */}
          <View
            style={{
              flexDirection: "row",
              marginVertical: 5,
              padding: 15,
              borderBottomWidth: 0.3,
              borderColor: "grey",
              marginHorizontal: 5,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "grey",
                width: "30%",
              }}
            >
              Email
            </Text>
            <Text style={{ width: "70%" }}>klasjnk@gmail.com</Text>
          </View>
          {/* Số điện thoại */}
          <View
            style={{
              flexDirection: "row",
              marginVertical: 5,
              padding: 15,
              borderBottomWidth: 0.3,
              borderColor: "grey",
              marginHorizontal: 5,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "grey",
                width: "30%",
              }}
            >
              Phone
            </Text>
            <Text style={{ width: "70%" }}>0966224888</Text>
          </View>
          {/* Phong */}
          <View
            style={{
              flexDirection: "row",
              marginVertical: 5,
              padding: 15,
              borderBottomWidth: 0.3,
              borderColor: "grey",
              marginHorizontal: 5,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "grey",
                width: "30%",
              }}
            >
              Phòng
            </Text>
            <Text style={{ width: "70%" }}>P.406</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
