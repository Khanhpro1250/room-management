import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { ChevronRightIcon } from 'react-native-heroicons/outline';
export default function PaymentHistoryScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
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
                    marginVertical: 10,
                    marginHorizontal: 22,
                }}
            >
                <View>
                    <Text style={styles.title}>Hóa đơn tháng 3/2024 </Text>
                    <Text style={{ fontSize: 12, color: 'red' }}>Chưa thanh toán </Text>
                </View>
                <TouchableOpacity onPress={() => {}}>
                    <ChevronRightIcon stroke={'grey'} />
                </TouchableOpacity>
            </View>

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
                    marginVertical: 10,
                    marginHorizontal: 22,
                }}
            >
                <View>
                    <Text style={styles.title}>Hóa đơn tháng 2/2024 </Text>
                    <Text style={{ fontSize: 12, color: 'red' }}>Đã thanh toán </Text>
                </View>
                <TouchableOpacity onPress={() => {}}>
                    <ChevronRightIcon stroke={'grey'} />
                </TouchableOpacity>
            </View>

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
                    marginVertical: 10,
                    marginHorizontal: 22,
                }}
            >
                <View>
                    <Text style={styles.title}>Hóa đơn tháng 1/2024 </Text>
                    <Text style={{ fontSize: 12, color: 'red' }}>Đã thanh toán </Text>
                </View>
                <TouchableOpacity onPress={() => {}}>
                    <ChevronRightIcon stroke={'grey'} />
                </TouchableOpacity>
            </View>

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
                    marginVertical: 10,
                    marginHorizontal: 22,
                }}
            >
                <View>
                    <Text style={styles.title}>Hóa đơn tháng 12/2023 </Text>
                    <Text style={{ fontSize: 12, color: 'red' }}>Đã thanh toán </Text>
                </View>
                <TouchableOpacity onPress={() => {}}>
                    <ChevronRightIcon stroke={'grey'} />
                </TouchableOpacity>
            </View>
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
