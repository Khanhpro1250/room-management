import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { ChevronRightIcon } from 'react-native-heroicons/outline';
export default function PaymentHistoryScreen({ navigation }) {
    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#D7F9F9' }}>
            <TouchableOpacity
                style={styles.line}
                onPress={() => {
                    navigation.navigate('BillDetail');
                }}
            >
                <View>
                    <Text style={styles.title}>Hóa đơn tháng 3/2024 </Text>
                    <Text style={{ fontSize: 12, color: 'red' }}>Chưa thanh toán </Text>
                </View>
                <TouchableOpacity onPress={() => {}}>
                    <ChevronRightIcon stroke={'grey'} />
                </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.line}
                onPress={() => {
                    navigation.navigate('BillDetail');
                }}
            >
                <View>
                    <Text style={styles.title}>Hóa đơn tháng 2/2024 </Text>
                    <Text style={{ fontSize: 12, color: 'red' }}>Chưa thanh toán </Text>
                </View>
                <TouchableOpacity onPress={() => {}}>
                    <ChevronRightIcon stroke={'grey'} />
                </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.line}
                onPress={() => {
                    navigation.navigate('BillDetail');
                }}
            >
                <View>
                    <Text style={styles.title}>Hóa đơn tháng 1/2024 </Text>
                    <Text style={{ fontSize: 12, color: 'red' }}>Chưa thanh toán </Text>
                </View>
                <TouchableOpacity onPress={() => {}}>
                    <ChevronRightIcon stroke={'grey'} />
                </TouchableOpacity>
            </TouchableOpacity>
        </ScrollView>
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
    line: {
        alignItems: 'center',
        elevation: 3,
        shadowColor: 'black',
        backgroundColor: 'white',
        marginBottom: 2,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
