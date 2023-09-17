import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import WelcomScreen from "./src/screens/WelcomeScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import OTPVerificationScreen from "./src/screens/OTPVerificationScreen";
import CreateNewPassWordScreen from "./src/screens/CreateNewPasswordScreen";
import ChangePasswordScreen from "./src/screens/ChangePasswordScreen";
import HomeUINavigation from "./src/navigations/HomeUINavigation";
import DetailCostScreen from "./src/screens/DetailCostScreen";
import DetailRoomScreen from "./src/screens/DetailRoomScreen";
import DetailRoomNavigation from "./src/navigations/DetailRoomNavigation";
import ProfileScreen from "./src/screens/ProfileScreen";
import CreateRequestScreen from "./src/screens/CreateRequestScreen";
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeUINavigation"
          component={HomeUINavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddRequest"
          component={CreateRequestScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailRoom"
          component={DetailRoomNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailCost"
          component={DetailCostScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ChangePassword"
          component={ChangePasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateNewPassword"
          component={CreateNewPassWordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OTPVerification"
          component={OTPVerificationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Welcome"
          component={WelcomScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
