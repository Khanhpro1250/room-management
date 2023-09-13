import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useRef } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import InputText from "../components/InputText";
import ButtonPrimary from "../components/ButtonPrimary";
import { Colors } from "../utils/Colors";
import { TextInput } from "react-native-gesture-handler";
import { Button, InputItem, List } from "@ant-design/react-native";

const ChangePasswordScreen = () => {
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
        <Text style={styles.headerText}>Change Password</Text>
        <Text>
          Your new password must be unique from those previously used.
        </Text>
        {/* <InputText
          onChange={() => {
            console.log(passwordRef.current);
          }}
          ref={passwordRef}
          placeholder="Current Password"
        /> */}
        <InputText placeholder="Current Password" />
        <InputText placeholder="New Password" />
        <InputText placeholder="Confirm Password" />
        <ButtonPrimary title="Change Password" color={Colors.btnPrimary} />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  headerText: {
    fontSize: 30,
    color: "#1E232C",
  },
});

export default ChangePasswordScreen;
