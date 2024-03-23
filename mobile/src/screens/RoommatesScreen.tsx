import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useMergeState } from '../hooks/useMergeState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_DATA_STORED } from '../constants/AppConstant';
import { requestApi } from '../lib/axios';
import Loading from '../components/Loading';
import { ScrollView } from 'react-native-gesture-handler';
import { TicketIcon } from 'react-native-heroicons/outline';
import { DateUtil } from '../utils/DateUtil';
export default function RoommatesScreen({ navigation }) {
    const [state, setState] = useMergeState({
        loading: false,
        user: {} as any,
    });

    const fetchCustomerData = async () => {
        AsyncStorage.getItem(USER_DATA_STORED).then(async storage => {
            if (storage) {
                const userStorage = JSON.parse(storage);
                const res = await requestApi(
                    'get',
                    `https://khanh123.bsite.net/api/customer/detail/${userStorage?.id}`,
                );
                if (res.data.success) {
                    setState({ loading: false, user: res.data.result });
                }
            }
        });
    };

    useEffect(() => {
        fetchCustomerData();
    }, []);

    if (state.loading) return <Loading />;

    return (
        <View style={{ padding: 10, flex: 1 }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginVertical: 10 }}>Tổng thành viên: </Text>
                <Text style={{ fontStyle: 'italic', fontSize: 13 }}>({state.user?.members?.length + 1 ?? 1})</Text>
            </View>
            <ScrollView
                style={{
                    height: '85%',
                }}
            >
                <View
                    style={{
                        position: 'relative',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#265679',
                        borderLeftWidth: 6,
                        borderRadius: 10,
                        padding: 15,
                        marginVertical: 10,
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                    }}
                >
                    <View style={{ width: '100%' }}>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '100%',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    color: '#265679',
                                    flex: 1,
                                }}
                            >
                                {state.user?.fullName}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 11,
                                    fontWeight: 'bold',
                                    color: '#30394f',
                                    backgroundColor: `#30394f20`,
                                    padding: 2,
                                    borderRadius: 5,
                                }}
                            >
                                Người đại diện
                            </Text>
                        </View>
                        <View style={{ height: 1, backgroundColor: 'gray', marginTop: 10 }} />
                        <View
                            style={{
                                display: 'flex',
                                marginTop: 10,
                                gap: 5,
                            }}
                        >
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: '#265679',
                                    }}
                                >
                                    CCCD/CMND:
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: '#a3a8ad',
                                        marginLeft: 5,
                                        fontStyle: 'italic',
                                    }}
                                >
                                    {state.user?.identityNo}
                                </Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: '#265679',
                                    }}
                                >
                                    Ngày cấp:
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: '#a3a8ad',
                                        marginLeft: 5,
                                        fontStyle: 'italic',
                                    }}
                                >
                                    {DateUtil.formatDate(state.user?.issueDate)}
                                </Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: '#265679',
                                    }}
                                >
                                    Nơi cấp:
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: '#a3a8ad',
                                        marginLeft: 5,
                                        fontStyle: 'italic',
                                    }}
                                >
                                    {state.user?.issuePlace}
                                </Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: '#265679',
                                    }}
                                >
                                    Số xe:
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: '#a3a8ad',
                                        marginLeft: 5,
                                        fontStyle: 'italic',
                                    }}
                                >
                                    {state.user?.vehicleNumber ?? '--/--'}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                {state.user?.members?.map((item, index) => {
                    return (
                        <View
                            key={index}
                            style={{
                                position: 'relative',
                                borderStyle: 'solid',
                                borderWidth: 1,
                                borderColor: '#218f61',
                                borderLeftWidth: 6,
                                borderRadius: 10,
                                padding: 15,
                                marginVertical: 10,
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                            }}
                        >
                            <View style={{ width: '100%' }}>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        width: '100%',
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: 'bold',
                                            color: '#265679',
                                            flex: 1,
                                        }}
                                    >
                                        {item?.name}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 11,
                                            fontWeight: 'bold',
                                            color: '#218f61',
                                            backgroundColor: `#218f6120`,
                                            padding: 2,
                                            borderRadius: 5,
                                        }}
                                    >
                                        Thành viên
                                    </Text>
                                </View>
                                <View style={{ height: 1, backgroundColor: 'gray', marginTop: 10 }} />
                                <View
                                    style={{
                                        display: 'flex',
                                        marginTop: 10,
                                        gap: 5,
                                    }}
                                >
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                color: '#265679',
                                            }}
                                        >
                                            CCCD/CMND:
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                color: '#a3a8ad',
                                                marginLeft: 5,
                                                fontStyle: 'italic',
                                            }}
                                        >
                                            {item?.identityNo}
                                        </Text>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                color: '#265679',
                                            }}
                                        >
                                            Số điện thoại:
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                color: '#a3a8ad',
                                                marginLeft: 5,
                                                fontStyle: 'italic',
                                            }}
                                        >
                                            {item?.phoneNumber}
                                        </Text>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                color: '#265679',
                                            }}
                                        >
                                            Số xe:
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                color: '#a3a8ad',
                                                marginLeft: 5,
                                                fontStyle: 'italic',
                                            }}
                                        >
                                            {item?.vehicleNumber ?? '--/--'}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}
