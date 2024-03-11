import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { ChevronRightIcon } from 'react-native-heroicons/outline';
import { useMergeState } from '../hooks/useMergeState';
import { USER_DATA_STORED } from '../constants/AppConstant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestApi } from '../lib/axios';
import Loading from '../components/Loading';
import CalculateItem from '../components/CalculateItem';
export default function PaymentHistoryScreen({ navigation }) {
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

    if (state.loading) return <Loading />;

    return (
        <ScrollView style={{ padding: 10, flex: 1 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginVertical: 10 }}>Lịch sử thanh toán</Text>
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
    );
}
