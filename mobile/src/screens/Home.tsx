import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { CurrencyDollarIcon, HomeIcon, UserIcon } from 'react-native-heroicons/outline';
import CalculateItem from '../components/CalculateItem';
import ServicesCard from '../components/ServicesCard';
import { USER_DATA_STORED } from '../constants/AppConstant';
import { useMergeState } from '../hooks/useMergeState';
import { requestApi } from '../lib/axios';
import { DateUtil } from '../utils/DateUtil';
// import moment from 'moment';

export default function DetailRoomScreen({ navigation }) {
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
                    `http://localhost:5179/api/customer/mobile/detail/${userStorage?.id}`,
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

    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 22 }}>
            <ScrollView>
                <View style={{ width: '100%' }}>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            paddingVertical: 10,
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: '#037ffc20',
                                width: 50,
                                height: 50,
                                borderRadius: 50,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 10,
                            }}
                        >
                            <HomeIcon stroke={'#265679'} />
                        </View>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                // justifyContent: 'space-between',
                                width: '100%',
                            }}
                        >
                            <View
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    width: '50%',
                                }}
                            >
                                <Text style={styles.title}>Phòng {state.user?.room?.roomCode}</Text>
                            </View>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: 'grey',
                                        width: 'auto',
                                    }}
                                >
                                    {Intl.NumberFormat('vi-VN', { maximumFractionDigits: 2 }).format(
                                        state.user?.room?.price,
                                    )}
                                    đ/tháng
                                </Text>
                            </View>
                        </View>
                    </View>
                    {/* INFO */}
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
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                marginBottom: 10,
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#a3a8ad',
                                        fontSize: 12,
                                    }}
                                >
                                    NGƯỜI THUÊ
                                </Text>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <UserIcon
                                        size={15}
                                        stroke={'#265679'}
                                        style={{
                                            marginRight: 5,
                                        }}
                                    />
                                    <Text
                                        style={{
                                            color: '#265679',
                                            fontSize: 14,
                                        }}
                                    >
                                        {state.user.fullName}
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    width: '40%',
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#a3a8ad',
                                        fontSize: 12,
                                    }}
                                >
                                    MÃ SỐ HỢP ĐỒNG
                                </Text>
                                <View>
                                    <Text
                                        style={{
                                            color: '#265679',
                                            fontSize: 14,
                                        }}
                                    >
                                        {state.user?.contract?.contractNumber}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                marginBottom: 10,
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#a3a8ad',
                                        fontSize: 12,
                                    }}
                                >
                                    TIỀN CỌC
                                </Text>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <CurrencyDollarIcon
                                        size={15}
                                        stroke={'#265679'}
                                        style={{
                                            marginRight: 5,
                                        }}
                                    />
                                    <Text
                                        style={{
                                            color: '#265679',
                                            fontSize: 14,
                                        }}
                                    >
                                        {Intl.NumberFormat('vi-VN', { maximumFractionDigits: 2 }).format(
                                            state.user?.deposit,
                                        )}
                                        đ
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    width: '40%',
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#a3a8ad',
                                        fontSize: 12,
                                    }}
                                >
                                    THỜI GIAN THUÊ
                                </Text>
                                <View>
                                    <Text
                                        style={{
                                            color: '#265679',
                                            fontSize: 14,
                                        }}
                                    >
                                        {state?.user?.contract?.month} tháng
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                marginBottom: 10,
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#a3a8ad',
                                        fontSize: 12,
                                    }}
                                >
                                    NGÀY HIỆU LỰC
                                </Text>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: '#265679',
                                            fontSize: 14,
                                        }}
                                    >
                                        {DateUtil.formatDate(state.user?.contract?.effectDate)}
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    width: '40%',
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#a3a8ad',
                                        fontSize: 12,
                                    }}
                                >
                                    NGÀY HẾT HẠN
                                </Text>
                                <View>
                                    <Text
                                        style={{
                                            color: '#eb3d2a',
                                            fontSize: 14,
                                        }}
                                    >
                                        {DateUtil.formatDate(state.user?.contract?.expiredDate)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* Dich vu */}
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginVertical: 10 }}>Dịch vụ</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'space-around',
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
                    {/* Dich vu */}
                    <ScrollView>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginVertical: 10 }}>Chi phí thanh toán</Text>
                        {state.user?.calculateCharges?.map((item, index) => {
                            return (
                                <CalculateItem
                                    key={index}
                                    id={item?.id}
                                    navigation={navigation}
                                    fromDate={item?.fromDate}
                                    toDate={item?.toDate}
                                    monthDate={item?.monthDate}
                                    totalCost={item?.totalCost}
                                    status={item?.status}
                                    statusName={item?.statusName}
                                    isCurrent={item?.isCurrent}
                                />
                            );
                        })}
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#265679',
    },
    info: {
        fontSize: 13,
        color: 'grey',
        fontWeight: 'bold',
    },
});
