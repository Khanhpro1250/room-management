import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';
import React, { useEffect } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChevronRightIcon, ClipboardDocumentIcon } from 'react-native-heroicons/outline';
import ServicesCard from '../components/ServicesCard';
import { USER_DATA_STORED } from '../constants/AppConstant';
import { useMergeState } from '../hooks/useMergeState';
import { DateUtil } from '../utils/DateUtil';
// import moment from 'moment';

export default function DetailRoomScreen({ navigation }) {
    const [state, setState] = useMergeState({
        user: {} as any,
    });
    useEffect(() => {
        AsyncStorage.getItem(USER_DATA_STORED).then(res => {
            if (res) {
                console.log('res', JSON.parse(res));
                setState({ user: JSON.parse(res) });
            }
        });
    }, []);
    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 22 }}>
            <ScrollView>
                <View
                    style={{
                        elevation: 10,
                        shadowColor: 'black',
                        backgroundColor: 'whitesmoke',
                        borderRadius: 10,
                        padding: 25,
                        marginVertical: 20,
                    }}
                >
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 30,
                            alignSelf: 'center',
                            color: 'red',
                        }}
                    >
                        {state.user?.room?.roomCode}
                    </Text>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 20,
                            alignSelf: 'center',
                            color: 'gold',
                        }}
                    >
                        {Intl.NumberFormat('vi-VN', { maximumFractionDigits: 2 }).format(state.user?.room?.price)}đ
                    </Text>
                    {/* dich vu */}
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                        }}
                    >
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.title}>Diện tích</Text>
                            <Text style={styles.info}>{state.user?.room?.acreage}m2</Text>
                            <Text style={styles.title}>Số người tối đa</Text>
                            <Text style={styles.info}>2</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.title}>Nhà</Text>
                            <Text style={styles.info}>{state.user?.room?.roomCode}</Text>
                            <Text style={styles.title}>Số thành viên</Text>
                            <Text style={styles.info}>{state.user?.room?.member?.length ?? 0}</Text>
                            <Text style={styles.title}>Tiền đã cọc</Text>
                            <Text style={styles.info}>
                                {' '}
                                {Intl.NumberFormat('vi-VN', { maximumFractionDigits: 2 }).format(state.user?.deposit)}đ
                            </Text>
                        </View>
                    </View>
                </View>
                {/* Hop dong */}
                <View
                    style={{
                        alignItems: 'center',
                        elevation: 3,
                        shadowColor: 'black',
                        backgroundColor: 'moccasin',
                        borderRadius: 10,
                        padding: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <View>
                        <Text style={styles.title}>Hợp đồng #{state.user?.contract?.contractNumber}</Text>
                        <Text>
                            Từ {DateUtil.formatDate(state.user?.contract?.effectDate)} đến{' '}
                            {DateUtil.formatDate(state.user?.contract?.expiredDate)} ({state.user?.contract?.month}{' '}
                            tháng)
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Contract')}>
                        <ChevronRightIcon stroke={'grey'} />
                    </TouchableOpacity>
                </View>
                {/* Dich vu */}
                <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, marginVertical: 10 }}>Dịch vụ</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                        }}
                    >
                        {state.user?.services?.map((item, index) => {
                            const fnHashCode = (str: string) => {
                                let hash = 0;
                                if (!str) return str;
                                for (let i = 0; i < str.length; i++) {
                                    hash = str.charCodeAt(i) + ((hash << 5) - hash);
                                }
                                return hash;
                            };

                            const intToRGB = (i: any) => {
                                const c = (i & 0x0098aa82).toString(16).toUpperCase();
                                return '00000'.substring(0, 6 - c.length) + c;
                            };

                            const hashCode = fnHashCode(item.serviceCode);
                            const strbg = intToRGB(hashCode);
                            return (
                                <ServicesCard
                                    key={index}
                                    serviceCode={item.serviceCode}
                                    name={item.serviceName}
                                    price={`${Intl.NumberFormat('vi-VN', { maximumFractionDigits: 2 }).format(
                                        item.price,
                                    )}đ/${JSON.parse(item.serviceUnit)?.[0]}`}
                                    color={`#${strbg}`}
                                />
                            );
                        })}
                    </View>
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Thông tin chủ trọ</Text>
                    <Text style={styles.info}>Họ và tên: {state.user?.houseOwn?.fullName}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.info}>Số điện thoại: {state.user?.houseOwn?.phoneNumber}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                Clipboard.setStringAsync(state.user?.houseOwn?.phoneNumber);
                                Alert.alert('Thành công', state.user?.houseOwn?.phoneNumber);
                            }}
                        >
                            <ClipboardDocumentIcon stroke={'grey'} size={18} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.info}>Ngân hàng: {state.user?.houseOwn?.bankBranch}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.info}>STK: {state.user?.houseOwn?.bankAccount}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                Clipboard.setStringAsync(state.user?.houseOwn?.bankAccount);
                                Alert.alert('Thành công', state.user?.houseOwn?.bankAccount);
                            }}
                        >
                            <ClipboardDocumentIcon stroke={'grey'} size={18} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.info}>Tên: {state.user?.houseOwn?.bankAccountName}</Text>
                </View>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
    },
    info: {
        fontSize: 13,
        color: 'grey',
        fontWeight: 'bold',
    },
});
