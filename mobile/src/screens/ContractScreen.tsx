import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { ChevronLeftIcon, ShareIcon } from 'react-native-heroicons/outline';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

export default function ContractScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: '#D7F9F9' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 15 }}>
                <Image
                    source={require('../../assets/contract.png')}
                    style={{ height: 48, width: 48, borderRadius: 32 / 2 }}
                />
                <Text style={{ fontWeight: 'bold' }}>Hợp đồng (#200254)</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: 50,
                            backgroundColor: 'green',
                            marginHorizontal: 5,
                        }}
                    />
                    <Text style={{ fontSize: 12 }}>Trong thời hạn hợp đồng</Text>
                </View>
            </View>
            <ScrollView
                style={{
                    elevation: 3,
                    shadowColor: 'black',

                    borderRadius: 10,
                    paddingBottom: 30,
                }}
            >
                {/* name */}
                <View style={styles.line}>
                    <Text style={styles.title}>Tổng số thành viên</Text>
                    <Text style={{ width: '70%' }}>3</Text>
                </View>

                <View style={styles.line}>
                    <Text style={styles.title}>Đại diện cọc</Text>
                    <Text style={{ width: '70%' }}>Nguyễn Nhật Linh</Text>
                </View>
                {/* Ngay sinh */}
                <View style={styles.line}>
                    <Text style={styles.title}>Số điện thoại</Text>
                    <Text style={{ width: '70%' }}>0949696722</Text>
                </View>
                {/* CCCD */}
                <View style={styles.line}>
                    <Text style={styles.title}>Số tiền cọc</Text>
                    <Text style={{ width: '70%' }}>2000000 đ</Text>
                </View>
                {/* Email */}
                <View style={styles.line}>
                    <Text style={styles.title}>Chu kỳ thu tiền</Text>
                    <Text style={{ width: '70%' }}>1 tháng / 1 lần</Text>
                </View>
                {/* Số điện thoại */}
                <View style={styles.line}>
                    <Text style={styles.title}>Ngày lập hợp đồng</Text>
                    <Text style={{ width: '70%' }}>29/09/2023</Text>
                </View>
                {/* Phong */}
                <View style={styles.line}>
                    <Text style={styles.title}>Ngày kết thúc hợp đồng</Text>
                    <Text style={{ width: '70%' }}>31/12/2024</Text>
                </View>

                <View style={styles.line}>
                    <Text style={styles.title}>Thời gian hợp đồng</Text>
                    <Text style={{ width: '70%' }}>6 tháng</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'grey',
        width: '30%',
    },
    content: {
        fontFamily: 'Mali_400Regular',
    },
    line: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 15,
        marginBottom: 1,
        borderColor: 'grey',
        marginHorizontal: 5,
    },
});
