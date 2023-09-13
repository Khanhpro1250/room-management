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
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  SparklesIcon,
} from "react-native-heroicons/outline";
import InputText from "../components/InputText";
import ButtonPrimary from "../components/ButtonPrimary";
import {Colors} from "../utils/Colors";
export default function LoginScreen() {
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
        </TouchableOpacity>
        {/* Header Text */}
        <Text style={styles.headerText}>Welcome back! Glad</Text>
        <Text style={styles.headerText}>to see you, Again!</Text>
        {/* Role Boss vs Guest */}
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#EDEEEF",
            borderRadius: 10,
            height: 36,
            justifyContent: "center",
            marginVertical: 30,
            padding: 2,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Boss</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 10,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Guest</Text>
          </TouchableOpacity>
        </View>
        {/* TextInput email vs password */}
        <InputText placeholder="Enter your email" />
        <InputText placeholder="Enter your password" isPassword={true} />
        {/* Forgot password */}
        <TouchableOpacity style={{ alignItems: "flex-end" }}>
          <Text
            style={{
              fontSize: 14,
              color: "#6A707C",
              marginTop: 5,
              marginBottom: 20,
            }}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>
        {/* Button Login */}
        <ButtonPrimary title="Login" color={Colors.btnPrimary} />
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
          <Text>Don't have an account? </Text>
          <TouchableOpacity>
            <Text style={{ color: "grey" }}>Register Now</Text>
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
