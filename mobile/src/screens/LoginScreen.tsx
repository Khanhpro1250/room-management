import axios from "axios";
import React, { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ChevronLeftIcon, LightBulbIcon } from "react-native-heroicons/outline";
import ButtonPrimary from "../components/ButtonPrimary";
import { Colors } from "../utils/Colors";
import { validateEmail } from "../utils/Validate";
import { useMergeState } from "../hooks/useMergeState";
import { requestApi } from "../lib/axios";

export default function LoginScreen({ navigation }) {
  const headers = {
    Accept: "*/*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  const [state, setState] = useMergeState({
    email: "",
    loading: false,
    error: -1,
    errorText: "",
  });

  const onClick = async () => {
    if (state.errorText) return;
    const res = await requestApi(
      "post",
      "/api/identity/sent-opt-customer-login",
      {
        email: state.email,
      }
    );

    // navigation.navigate("OTPVerification");
  };

  const onChangeText = (text) => {
    const isValidEmail = text && validateEmail(text);
    if (!isValidEmail) {
      setState({ errorText: "Invalid email" });
    } else {
      setState({ errorText: "", email: text });
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "white",
      }}
    >
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        {/* button back */}
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#E8ECF4",
            width: 41,
            height: 41,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <ChevronLeftIcon stroke="black" />
          {/* Header Text */}
        </TouchableOpacity>
        {/* Header Text */}
        <Text style={styles.headerText}>Hello! Welcome back</Text>
        <Text>
          Please enter the email address linked with your account. We will send
          OTP verification for you.
        </Text>
        <View
          style={{
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#E8ECF4",
            height: 56,
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 8,
          }}
        >
          <TextInput
            onChangeText={onChangeText}
            placeholder="Enter your email"
            style={{ flex: 1, fontSize: 15, marginStart: 15, outline: "none" }}
          />
          <TouchableOpacity style={{ display: "none" }}>
            <LightBulbIcon
              stroke={"grey"}
              //@ts-ignore
              style={{ marginHorizontal: 8 }}
            />
          </TouchableOpacity>
        </View>
        <Text style={{ color: "red" }}>{state.errorText}</Text>
        {state.loading ? <ActivityIndicator /> : <Text></Text>}
        <ButtonPrimary
          title="Send Code"
          color={Colors.btnPrimary}
          onPressBtn={onClick}
        />

        {/* <View
          style={{
            flexDirection: "row",
            marginVertical: 20,
            justifyContent: "center",
          }}
        >
          <Text>Remember Password </Text>
          <TouchableOpacity>
            <Text style={{ color: "grey" }}>Login</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  headerText: {
    fontSize: 30,
    color: "#1E232C",
  },
});
