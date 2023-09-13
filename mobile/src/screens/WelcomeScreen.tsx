import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";
import ButtonPrimary from "../components/ButtonPrimary";
import { Colors } from "../utils/Colors";

export default function WelcomeScreen() {
  return (
    <ImageBackground
      style={{ flex: 1 }}
      resizeMode="cover"
      source={require("../../assets/colorful.jpg")}
    >
      <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
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
          <ButtonPrimary title={"Log in"} color={Colors.btnPrimary} />
          <ButtonPrimary title={"Register"} color="white" fontColor="black" />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
