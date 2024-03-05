import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      style={{ flex: 1 }}
      resizeMode="cover"
      source={require("../../assets/colorful.jpg")}
    >
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: StatusBar.currentHeight,
          marginHorizontal: 22,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 22,
          }}
        >
          <Text style={{ fontSize: 40 }}>Management App</Text>
          <Text style={{ fontSize: 25, color: "rgba(30, 35, 44, 0.8)" }}>
            Welcome to our hostel management app!
          </Text>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.setItem("isFirst", "true");
              navigation.navigate("ForgotPassword");
            }}
            style={{
              backgroundColor: "black",
              borderRadius: 8,
              height: 56,
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 15,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 15,
              }}
            >
              Log in
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
