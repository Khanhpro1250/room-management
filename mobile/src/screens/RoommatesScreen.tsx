import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { ChevronRightIcon } from 'react-native-heroicons/outline';
import { useFonts, Mali_300Light, Mali_400Regular, Mali_700Bold } from '@expo-google-fonts/mali';
export default function RoommatesScreen({ navigation }) {
    let [fontsLoaded] = useFonts({
        Mali_300Light,
        Mali_400Regular,
        Mali_700Bold,
    });

    if (!fontsLoaded) {
        return null;
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#D7F9F9' }}>
            <View
                style={{
                    alignItems: 'center',
                    elevation: 3,
                    shadowColor: 'black',
                    backgroundColor: 'white',
                    marginBottom: 5,
                    padding: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <View>
                    <Text style={styles.title}>Nguyễn Nhật Linh</Text>
                    <Text style={styles.content}>Ngày sinh: 29-08-2001</Text>
                    <Text style={styles.content}>CCCD: 387643921</Text>
                    <Text style={styles.content}>Số điện thoại: 0945786999</Text>
                    <Text style={styles.content}>Biển số xe: 66F199999</Text>
                </View>
                <TouchableOpacity>
                    <ChevronRightIcon stroke={'grey'} />
                </TouchableOpacity>
            </View>
            {/* nguoi thue 2 */}
            <View
                style={{
                    alignItems: 'center',
                    elevation: 3,
                    shadowColor: 'black',
                    backgroundColor: 'white',
                    marginBottom: 5,
                    padding: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <View>
                    <Text style={styles.title}>Huỳnh Công Khanh</Text>
                    <Text style={styles.content}>Ngày sinh: 13-03-2001</Text>
                    <Text style={styles.content}>CCCD: 387443921</Text>
                    <Text style={styles.content}>Số điện thoại: 0945786999</Text>
                    <Text style={styles.content}>Biển số xe: 66F199999</Text>
                </View>
                <TouchableOpacity>
                    <ChevronRightIcon stroke={'grey'} />
                </TouchableOpacity>
            </View>
            {/* nguoi thue 3 */}
            <View
                style={{
                    alignItems: 'center',
                    elevation: 3,
                    shadowColor: 'black',
                    backgroundColor: 'white',
                    padding: 10,
                    marginBottom: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <View>
                    <Text style={styles.title}>Trần Anh Khoa</Text>
                    <Text style={styles.content}>Ngày sinh: 12-12-2001</Text>
                    <Text style={styles.content}>CCCD: 387649807</Text>
                    <Text style={styles.content}>Số điện thoại: 0945786999</Text>
                    <Text style={styles.content}>Biển số xe: 66F199999</Text>
                </View>
                <TouchableOpacity>
                    <ChevronRightIcon stroke={'grey'} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    title: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    info: {
        fontSize: 13,
        color: 'grey',
        fontWeight: 'bold',
    },
    content: {},
});
