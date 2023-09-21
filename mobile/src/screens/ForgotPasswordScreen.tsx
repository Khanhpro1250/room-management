import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import InputText from "../components/InputText";
import ButtonPrimary from "../components/ButtonPrimary";
import { Colors } from "../utils/Colors";
import axios from "axios";

export default function ForgotPasswordScreen({ navigation }) {
  const headers = {
    Accept: "*/*",
    "Content-Type": "application/json",
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
        <Text style={styles.headerText}>Hello! Register to get</Text>
        <Text>
          Don't worry! It occurs. Please enter the email address linked with
          your account.
        </Text>
        <InputText placeholder="Enter your email" />
        <ButtonPrimary
          title="Send Code"
          color={Colors.btnPrimary}
          onPressBtn={async () => {
            await axios
              .get(`https://api.genderize.io/`)
              .then((res) => {
                console.log(res);
                console.log(res.data);
              })
              .catch((erro) => {
                console.log(erro);
              });
            console.log("btn");
          }}
        />
        <View
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
        </View>
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
