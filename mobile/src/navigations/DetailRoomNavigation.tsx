import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { Image, SafeAreaView, StatusBar, Text, View } from 'react-native';
import Home from '../screens/Home';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ArrowRightOnRectangleIcon } from 'react-native-heroicons/outline';
import Popover from 'react-native-popover-view';
import { USER_DATA_STORED } from '../constants/AppConstant';
import PaymentHistoryScreen from '../screens/PaymentHistoryScreen';
import RoommatesScreen from '../screens/RoommatesScreen';
const Tab = createMaterialTopTabNavigator();
export default function DetailRoomNavigation({ navigation }) {
    const onLogout = async () => {
        AsyncStorage.removeItem(USER_DATA_STORED).then(() => {
            navigation.replace('LoginV2');
        });
    };
    return (
        <SafeAreaView
            style={{
                flex: 1,
                paddingTop: StatusBar.currentHeight,
                backgroundColor: 'white',
            }}
        >
            <View style={{ flex: 1 }}>
                {/* Header */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // marginBottom: 20,
                        marginHorizontal: 22,
                        // marginTop: 10,
                    }}
                >
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'blue' }}>IRoom</Text>
                    {/* <ChevronLeftIcon stroke={"black"} /> */}
                    <View style={{ flex: 1 }}>
                        <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold' }}>Trang chủ</Text>
                    </View>

                    <Popover
                        from={
                            <TouchableOpacity>
                                <Image
                                    source={require('../../assets/profile.jpg')}
                                    style={{ height: 32, width: 32, borderRadius: 32 / 2 }}
                                />
                            </TouchableOpacity>
                        }
                    >
                        <TouchableOpacity
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 120,
                                borderWidth: 1,
                                borderColor: 'black',
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                            }}
                            onPress={onLogout}
                        >
                            <ArrowRightOnRectangleIcon size={15} stroke={'black'} />
                            <Text style={{ fontSize: 14, marginLeft: 3 }}>Đăng xuất</Text>
                        </TouchableOpacity>
                    </Popover>
                </View>
                <Tab.Navigator>
                    <Tab.Screen name="Info" component={Home} options={{ tabBarLabel: 'Thông tin' }} />
                    <Tab.Screen name="Roommates" component={RoommatesScreen} options={{ tabBarLabel: 'Thành viên' }} />
                    <Tab.Screen name="History" component={PaymentHistoryScreen} options={{ tabBarLabel: 'Lịch sử' }} />
                </Tab.Navigator>
            </View>
        </SafeAreaView>
    );
}
