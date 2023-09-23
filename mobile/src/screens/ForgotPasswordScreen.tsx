import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useState } from "react";
import { ChevronLeftIcon, LightBulbIcon } from "react-native-heroicons/outline";
import InputText from "../components/InputText";
import ButtonPrimary from "../components/ButtonPrimary";
import { Colors } from "../utils/Colors";
import axios from "axios";
import { validateEmail } from "../utils/Validate";

export default function ForgotPasswordScreen({ navigation }) {
  const headers = {
    Accept: "*/*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(null);
  const [erro, setErro] = useState(-1);
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
            onChangeText={(text) => {
              validateEmail(text) ? setErro(0) : setErro(1);
              setEmail(text);
            }}
            placeholder="Enter your email"
            style={{ flex: 1, fontSize: 15, marginStart: 15 }}
          />
          <TouchableOpacity style={{ display: "none" }}>
            <LightBulbIcon stroke={"grey"} style={{ marginHorizontal: 8 }} />
          </TouchableOpacity>
        </View>
        <Text style={{ color: "red" }}>
          {erro == 1
            ? "Email chưa chính xác"
            : erro == 0
            ? "Email chính xác"
            : ""}
        </Text>
        {isLoading ? <ActivityIndicator /> : <Text></Text>}
        <ButtonPrimary
          disable={erro}
          title="Send Code"
          color={Colors.btnPrimary}
          onPressBtn={async () => {
            setLoading(true);
            await axios
              .get(`https://localhost:7179/api/house/test-send-mail`, {
                params: { mail: email },
                headers,
              })
              .then((res) => {
                console.log(res);
                console.log(res.data);
              })
              .catch((erro) => {
                console.log(erro);
              });
            setLoading(false);
            navigation.navigate("OTPVerification");
          }}
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
