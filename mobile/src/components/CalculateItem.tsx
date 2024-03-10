import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ArrowLongRightIcon } from 'react-native-heroicons/outline';

interface props {
    id: string;
    fromDate: string;
    toDate: string;
    monthDate: string;
    totalCost: number;
    status: string;
    statusName: string;
    isCurrent: boolean;
    navigation: any;
}
const CalculateItem: React.FC<props> = ({ navigation, ...props }) => {
    const statusColor = props.status === 'PAID' ? '#265679' : '#FF0000';
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('BillDetail', {
                    calculateId: props?.id,
                    status: props?.status,
                    statusName: props.statusName,
                });
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
                {props.isCurrent && (
                    <Text
                        style={{
                            backgroundColor: '#eb5031',
                            color: '#fff',
                            padding: 2,
                            borderRadius: 5,
                            fontSize: 9,
                            fontWeight: 'bold',
                            position: 'absolute',
                            top: -8,
                            alignItems: 'center',
                        }}
                    >
                        Now
                    </Text>
                )}
                <View>
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            color: '#265679',
                        }}
                    >
                        Tiền nhà tháng {props?.monthDate}
                    </Text>
                    <Text
                        style={{
                            fontSize: 12,
                            color: '#333',
                        }}
                    >
                        Từ ngày {props?.fromDate} đến ngày {props?.toDate}
                    </Text>
                </View>
                <View
                    style={{
                        position: 'relative',
                    }}
                >
                    <Text
                        style={{
                            fontSize: 11,
                            fontWeight: 'bold',
                            color: `${statusColor}`,
                            backgroundColor: `${statusColor}20`,
                            padding: 2,
                            borderRadius: 5,
                        }}
                    >
                        {props?.statusName}
                    </Text>
                    <Text
                        style={{
                            fontSize: 12,
                            color: '#333',
                            textAlign: 'right',
                        }}
                    >
                        {Intl.NumberFormat('vi-VN', { maximumFractionDigits: 2 }).format(props?.totalCost)}đ
                    </Text>
                    <View
                        style={{
                            position: 'absolute',
                            bottom: -13,
                            right: 0,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 10,
                                color: '#265679',
                                marginRight: 3,
                            }}
                        >
                            Chi tiết
                        </Text>
                        <ArrowLongRightIcon stroke={'#265679'} size={12} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CalculateItem;
