import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { ChevronLeftIcon, ShareIcon } from 'react-native-heroicons/outline';

export default function BillDetailScreen({ navigation }) {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                paddingTop: StatusBar.currentHeight,
                backgroundColor: 'white',
            }}
        >
            <View style={{ flex: 1, marginTop: 20 }}>
                {/* Header */}
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
                {/* Content */}
                <View
                    style={{
                        elevation: 3,
                        shadowColor: 'black',
                        backgroundColor: '#D7F9F9',
                        borderRadius: 10,
                        paddingBottom: 30,
                        flex: 1,
                    }}
                >
                    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>HÓA ĐƠN TIỀN NHÀ</Text>
                        <Text style={{ fontWeight: 'bold' }}>Tháng 2/2024</Text>
                        <Text style={{ fontSize: 13 }}>Từ ngày 21/12/2023 đến ngày 24/12/2023</Text>
                    </View>
                    <View style={{ backgroundColor: 'white', paddingVertical: 20 }}>
                        <View style={{ marginHorizontal: 20 }}>
                            <Text style={{ fontWeight: 'bold' }}>Họ và tên: Nguyễn Nhật Linh</Text>
                            <Text style={{ fontWeight: 'bold' }}>Phòng: P0191</Text>
                            <Text style={{ fontWeight: 'bold' }}>Ngày vào: 24/12/2022</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: 'white', marginTop: 2, paddingVertical: 10 }}>
                        <View style={{ marginHorizontal: 20 }}>
                            <Text>Nước: CS cũ: 123 - CS mới: 124 - SD: 1;</Text>
                            <Text>Điện: CS cũ: 1145 - CS mới: 1148 - SD: 3;</Text>
                            <Text>Xe máy: 2</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>Tiền nhà:</Text>
                                <Text>2.222.222 đ</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ backgroundColor: 'white', marginTop: 2, paddingVertical: 10 }}>
                        <View style={{ marginHorizontal: 20 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>TỔNG CỘNG</Text>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>1.044.000đ</Text>
                            </View>
                            <Text style={{ color: 'green', fontSize: 12 }}>
                                Bằng chữ: một triệu không trăm bốn mươi bốn nghìn đồng
                            </Text>
                            <Text style={{ color: 'red', alignSelf: 'flex-end', fontWeight: 'bold', marginTop: 20 }}>
                                Trạng thái: Đã thanh toán
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({});
