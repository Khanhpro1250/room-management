import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ContractScreen() {
    return (
        <View>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        backgroundColor: '#28803520',
                        color: '#288035',
                        // padding: 10,
                        display: 'flex',
                        borderRadius: 50,
                        width: 40,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontWeight: 'bold',
                        fontSize: 20,
                    }}
                >
                    #
                </Text>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        marginLeft: 10,
                    }}
                >
                    HD10012312
                </Text>
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
