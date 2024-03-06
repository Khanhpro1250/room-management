import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useRef } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { ChevronLeftIcon, LightBulbIcon } from 'react-native-heroicons/outline';
import { USER_DATA_STORED } from '../constants/AppConstant';
import { useMergeState } from '../hooks/useMergeState';
import { requestApi } from '../lib/axios';
import Loading from '../components/Loading';
export default function OTPVerificationScreen({ route, navigation }) {
    const { email } = route.params;
    const inputRef = useRef<any>(null);
    const [state, setState] = useMergeState({
        loading: false,
        otpCode: '',
        errorText: '',
    });

    const onChangeText = val => {
        setState({ otpCode: val });
    };

    const onSubmit = async () => {
        if (!!!state.otpCode) return;
        setState({ loading: true });
        const res = await requestApi('post', 'http://localhost:5179/api/identity/validation-otp-customer', {
            otpCode: state.otpCode,
            email,
        });
        if (res.data.success) {
            setState({ loading: false });
            AsyncStorage.setItem(USER_DATA_STORED, JSON.stringify(res.data.result));
            navigation.navigate('HomeUINavigation');
        } else {
            setState({ errorText: 'Không tim thấy email này', loading: false });
        }
    };

    const resentOtp = async () => {
        setState({ loading: true });
        const res = await requestApi('post', 'http://localhost:5179/api/identity/sent-opt-customer-login', {
            email: email,
        });
        if (res.data.success) {
            setState({ loading: false });
        } else {
            setState({ errorText: 'Không tim thấy email này', loading: false });
        }
    };

    if (state.loading) return <Loading />;
    return (
        <SafeAreaView
            style={{
                flex: 1,
                paddingTop: StatusBar.currentHeight,
                backgroundColor: 'white',
            }}
        >
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                {/* button back */}
                <TouchableOpacity
                    onPress={async () => {
                        await AsyncStorage.setItem('isLoggin', 'true');
                        navigation.navigate('HomeUINavigation');
                    }}
                    style={{
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: '#E8ECF4',
                        width: 41,
                        height: 41,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 20,
                    }}
                >
                    <ChevronLeftIcon stroke="black" />
                    {/* Header Text */}
                </TouchableOpacity>
                {/* Header Text */}
                <Text style={styles.headerText}>OTP Verification</Text>
                <Text>Enter the Verification code we just sent on your email address.</Text>
                <View
                    style={{
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#E8ECF4',
                        height: 56,
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 8,
                    }}
                >
                    <TextInput
                        ref={inputRef}
                        onChangeText={onChangeText}
                        maxLength={6}
                        placeholder="Enter code in your email"
                        style={{ flex: 1, fontSize: 15, marginStart: 15 }}
                    />
                    <TouchableOpacity style={{ display: 'none' }}>
                        <LightBulbIcon
                            stroke={'grey'}
                            //@ts-ignore
                            style={{ marginHorizontal: 8 }}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={onSubmit}
                    style={{
                        backgroundColor: '#1E232C',
                        borderRadius: 8,
                        height: 56,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginVertical: 15,
                    }}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 15,
                        }}
                    >
                        Verify
                    </Text>
                </TouchableOpacity>
                <View
                    style={{
                        flexDirection: 'row',
                        marginVertical: 20,
                        justifyContent: 'center',
                    }}
                >
                    <Text>Didn't received code? </Text>
                    <TouchableOpacity onPress={resentOtp}>
                        <Text style={{ color: 'grey' }}>Resend</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    headerText: {
        fontSize: 30,
        color: '#1E232C',
    },
});
