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
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function OTPVerificationScreen({ navigation }) {
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
          onPress={async () => {
            await AsyncStorage.setItem("isLoggin", "true");
            navigation.navigate("HomeUINavigation");
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
        <Text style={styles.headerText}>OTP Verification</Text>
        <Text>
          Enter the Verification code we just sent on your email address.
        </Text>
        <InputText placeholder="Enter your code" />
        <TouchableOpacity
          onPress={() => navigation.navigate("HomeUINavigation")}
          style={{
            backgroundColor: "#1E232C",
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
            Verify
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 20,
            justifyContent: "center",
          }}
        >
          <Text>Didn't received code? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("HomeUINavigation")}
          >
            <Text style={{ color: "grey" }}>Resend</Text>
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
