import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import DetailRoomNavigation from './src/navigations/DetailRoomNavigation';
import HomeUINavigation from './src/navigations/HomeUINavigation';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';
import CreateNewPassWordScreen from './src/screens/CreateNewPasswordScreen';
import CreateRequestScreen from './src/screens/CreateRequestScreen';
import DetailCostScreen from './src/screens/DetailCostScreen';
import LoginScreen from './src/screens/LoginScreen';
import OTPVerificationScreen from './src/screens/OTPVerificationScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import { useMergeState } from './src/hooks/useMergeState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_DATA_STORED } from './src/constants/AppConstant';
import BillDetailScreen from './src/screens/BillDetailScreen';

const Stack = createStackNavigator();

const App = () => {
    const [state, setState] = useMergeState({
        isLogin: false,
    });
    useEffect(() => {
        AsyncStorage.getItem(USER_DATA_STORED).then(res => {
            console.log('res', res);
            if (res) {
                setState({ isLogin: true });
            }
        });
    }, []);
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {!state.isLogin && (
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                )}
                <Stack.Screen name="HomeUINavigation" component={HomeUINavigation} options={{ headerShown: false }} />
                <Stack.Screen name="BillDetail" component={BillDetailScreen} options={{ headerShown: false }} />

                <Stack.Screen
                    name="OTPVerification"
                    component={OTPVerificationScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="AddRequest" component={CreateRequestScreen} options={{ headerShown: false }} />
                <Stack.Screen name="DetailRoom" component={DetailRoomNavigation} options={{ headerShown: false }} />
                <Stack.Screen name="DetailCost" component={DetailCostScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ headerShown: false }} />
                <Stack.Screen
                    name="CreateNewPassword"
                    component={CreateNewPassWordScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;
