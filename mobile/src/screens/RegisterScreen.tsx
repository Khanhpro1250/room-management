import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import InputText from "../components/InputText";
import ButtonPrimary from "../components/ButtonPrimary";
import {Colors} from "../utils/Colors";

export default function RegisterScreen() {
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
        <Text style={styles.headerText}>started</Text>
        <InputText placeholder="Username" />
        <InputText placeholder="Email" />
        <InputText placeholder="Password" />
        <InputText placeholder="Confirm password" />
        <ButtonPrimary title="Register" color={Colors.btnPrimary} />
        {/* Or login with */}
        <View
          style={{
            borderWidth: 0.3,
            borderColor: "grey",
            marginTop: 30,
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              position: "absolute",
              alignSelf: "center",
              top: -12,
              backgroundColor: "white",
              paddingHorizontal: 10,
            }}
          >
            Or Login with
          </Text>
        </View>
        {/* Facebook/gooogle/apple */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginVertical: 20,
          }}
        >
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              width: 105,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/google.png")}
              style={{ height: 36, width: 36 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              width: 105,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/facebook.png")}
              style={{ height: 36, width: 36 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              width: 105,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/apple.png")}
              style={{ height: 36, width: 36 }}
            />
          </TouchableOpacity>
        </View>
        {/* Dont have account */}
        <View
          style={{
            flexDirection: "row",
            marginVertical: 20,
            justifyContent: "center",
          }}
        >
          <Text>Already have an account? </Text>
          <TouchableOpacity>
            <Text style={{ color: "grey" }}>Login Now</Text>
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
