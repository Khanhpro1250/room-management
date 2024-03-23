import axios from 'axios';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { ChevronLeftIcon, LightBulbIcon } from 'react-native-heroicons/outline';
import ButtonPrimary from '../components/ButtonPrimary';
import { Colors } from '../utils/Colors';
import { validateEmail } from '../utils/Validate';
import { useMergeState } from '../hooks/useMergeState';
import { requestApi } from '../lib/axios';
import Loading from '../components/Loading';

export default function LoginScreen({ navigation }) {
    const [state, setState] = useMergeState({
        email: '',
        loading: false,
        error: -1,
        errorText: '',
    });

    const onClick = async () => {
        if (!!state.errorText) return;
        setState({ loading: true });
        const res = await requestApi('post', 'https://khanh123.bsite.net/api/identity/sent-opt-customer-login', {
            email: state.email,
        });
        if (res.data.success) {
            setState({ loading: false });
            navigation.navigate('OTPVerification', { email: state.email });
        } else {
            setState({ errorText: 'Không tim thấy email này', loading: false });
        }

        // navigation.navigate("OTPVerification");
    };

    const onChangeText = text => {
        const isValidEmail = text && validateEmail(text);
        if (!isValidEmail) {
            setState({ errorText: 'Invalid email' });
        } else {
            setState({ errorText: '', email: text });
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
                    onPress={() => {
                        navigation.goBack();
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
                <Text style={styles.headerText}>Hello! Welcome back</Text>
                <Text>
                    Please enter the email address linked with your account. We will send OTP verification for you.
                </Text>
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
                        onChangeText={onChangeText}
                        placeholder="Enter your email"
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
                <Text style={{ color: 'red' }}>{state.errorText}</Text>
                {state.loading ? <ActivityIndicator /> : <Text></Text>}
                <ButtonPrimary title="Send Code" color={Colors.btnPrimary} onPressBtn={onClick} />

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
        color: '#1E232C',
    },
});
