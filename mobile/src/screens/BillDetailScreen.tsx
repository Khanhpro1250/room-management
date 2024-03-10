import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChevronLeftIcon, ClipboardDocumentIcon } from 'react-native-heroicons/outline';
import { USER_DATA_STORED } from '../constants/AppConstant';
import { useMergeState } from '../hooks/useMergeState';
import { requestApi } from '../lib/axios';
import Clipboard from '@react-native-clipboard/clipboard';
// import Toast from 'react-native-simple-toast';

export default function BillDetailScreen({ route, navigation }) {
    const { calculateId, status, statusName } = route.params;
    const statusColor = status === 'PAID' ? '#265679' : '#FF0000';
    const [state, setState] = useMergeState({
        loading: false,
        billDetail: {} as any,
        user: {} as any,
    });

    const fetchCustomerData = async () => {
        if (!!calculateId) {
            const res = await requestApi(
                'get',
                `http://localhost:5179/api/room/calculate-charge/detail/${calculateId}`,
            );
            if (res.data.success) {
                setState({ loading: false, billDetail: res.data.result });
            }
        }
    };

    useEffect(() => {
        fetchCustomerData();
        AsyncStorage.getItem(USER_DATA_STORED).then(async storage => {
            if (storage) {
                const userStorage = JSON.parse(storage);
                setState({ user: userStorage });
            }
        });
    }, []);

    return (
        <SafeAreaView
            style={{
                padding: 10,
                backgroundColor: 'white',
            }}
        >
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 20,
                        marginHorizontal: 22,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <ChevronLeftIcon stroke={'black'} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold' }}>Hóa đơn</Text>
                    </View>
                </View>
            </View>
            <View
                style={{
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderColor: '#265679',
                    borderLeftWidth: 6,
                    borderRadius: 10,
                    padding: 10,
                    marginVertical: 10,
                }}
            >
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Thông tin chủ trọ</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                    }}
                >
                    <Text>Họ và tên:</Text>
                    <Text>{state.user?.houseOwn?.fullName}</Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                    }}
                >
                    <Text>Số điện thoại:</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>{state.user?.houseOwn?.phoneNumber}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                Clipboard.setString(state.user?.houseOwn?.phoneNumber);
                                // Toast.show('Copied to clipboard!', Toast.SHORT);
                            }}
                        >
                            <ClipboardDocumentIcon stroke={'grey'} size={18} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                    }}
                >
                    <Text>Ngân hàng:</Text>
                    <Text>{state.user?.houseOwn?.bankBranch}</Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                    }}
                >
                    <Text>Số tài khoản:</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>{state.user?.houseOwn?.bankAccount} </Text>
                        <TouchableOpacity
                            onPress={() => {
                                Clipboard.setString(state.user?.houseOwn?.bankAccount);
                                // Toast.show('Copied to clipboard!', Toast.SHORT);
                            }}
                        >
                            <ClipboardDocumentIcon stroke={'grey'} size={18} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                    }}
                >
                    <Text>Chủ tài khoản:</Text>
                    <Text>{state.user?.houseOwn?.bankAccountName}</Text>
                </View>
            </View>
            <View
                style={{
                    elevation: 3,
                    shadowColor: 'black',
                    borderRadius: 10,
                    padding: 10,
                    flex: 1,
                    justifyContent: 'center',
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderColor: '#265679',
                }}
            >
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        marginBottom: 10,
                    }}
                >
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>HÓA ĐƠN TIỀN NHÀ</Text>
                    <Text style={{ fontWeight: 'bold' }}>
                        Tháng {state.billDetail?.month}/{state.billDetail?.year}
                    </Text>
                    <Text style={{ fontSize: 13 }}>
                        Từ ngày {state.billDetail?.calculateFromDate} đến ngày {state.billDetail?.calculateToDate}
                    </Text>
                </View>
                <View style={{ backgroundColor: 'white', paddingHorizontal: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>Họ và tên: {state.billDetail?.customerName}</Text>
                    <Text style={{ fontWeight: 'bold' }}>Phòng: {state.billDetail?.roomCode}</Text>
                    <Text style={{ fontWeight: 'bold' }}>Ngày vào: {state.billDetail?.dateCustomerMoveIn}</Text>
                </View>
                <View style={{ height: 1, backgroundColor: 'gray', marginTop: 10, marginBottom: 10 }} />
                <View style={{ backgroundColor: 'white', marginTop: 2, padding: 10 }}>
                    {state?.billDetail?.calculateChargeDetails?.map((item, index) => {
                        return (
                            <View
                                key={index}
                                style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}
                            >
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                    }}
                                >
                                    <Text style={{ fontSize: 12 }}>{item?.title}</Text>
                                    {item?.isHasDescription && (
                                        <Text style={{ fontSize: 12, marginLeft: 3 }}>({item?.description})</Text>
                                    )}
                                </View>
                                <Text style={{ fontSize: 12, marginLeft: 3 }}>{item?.cost}đ</Text>
                            </View>
                        );
                    })}
                </View>
                <View style={{ height: 1, backgroundColor: 'gray', marginTop: 10, marginBottom: 10 }} />
                <View style={{ backgroundColor: 'white', marginTop: 2, padding: 10 }}>
                    <View style={{ marginHorizontal: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>TỔNG CỘNG</Text>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{state?.billDetail?.totalCost}đ</Text>
                        </View>
                        <Text style={{ color: 'green', fontSize: 12, fontStyle: 'italic', textAlign: 'right' }}>
                            (Bằng chữ: {state?.billDetail?.totalCostWord})
                        </Text>
                        <Text style={{ color: 'red', alignSelf: 'flex-end', fontWeight: 'bold', marginTop: 20 }}>
                            <Text
                                style={{
                                    fontSize: 11,
                                    fontWeight: 'bold',
                                    color: `${statusColor}`,
                                    backgroundColor: `${statusColor}20`,
                                    padding: 5,
                                    borderRadius: 5,
                                    width: 'auto',
                                }}
                            >
                                {statusName}
                            </Text>
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({});
