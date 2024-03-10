import { View, Text, StatusBar, SafeAreaView, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Bars3Icon, ChevronLeftIcon } from 'react-native-heroicons/outline';
import RentCost from '../components/RentCost';
import Announcement from '../components/Announcement';

export default function Notification() {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                paddingTop: StatusBar.currentHeight,
                backgroundColor: 'white',
            }}
        >
            <View style={{ flex: 1 }}>
                {/* header */}
                <View style={styles.header}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'blue' }}>IRoom</Text>
                    {/* <ChevronLeftIcon stroke={"black"} /> */}
                    <View style={{ flex: 1 }}>
                        <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold' }}>Thông báo</Text>
                    </View>
                    <Image
                        source={require('../../assets/profile.jpg')}
                        style={{ height: 32, width: 32, borderRadius: 32 / 2 }}
                    />
                    {/* <ShareIcon stroke={"black"} /> */}
                </View>
                {/* content */}
                <View style={{ flex: 1 }}>
                    {/* Bottom content */}
                    <View style={{ flex: 1, marginTop: 10 }}>
                        <Text style={{ color: 'green', fontSize: 15, fontWeight: 'bold', marginHorizontal: 22 }}>
                            Tất cả
                        </Text>
                        {/* Content */}
                        <ScrollView style={{ backgroundColor: '#D7F9F9' }}>
                            {/* Line thong bao */}
                            <TouchableOpacity style={styles.line}>
                                <Text style={styles.title}>Thông báo </Text>
                                <Text style={{ fontSize: 12, color: 'red', maxWidth: '80%' }}>
                                    Sau 12h đêm, không được sử dụng máy làm ảnh hưởng đến đời sống sin hoạt của người
                                    khác là việc làm không nên.
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 12 }}>Quản lý: 0949696969</Text>
                                    <Text style={{ fontSize: 12, color: 'green' }}>10/08/2024</Text>
                                </View>
                            </TouchableOpacity>
                            {/* Line thong bao */}
                            <TouchableOpacity style={styles.line}>
                                <Text style={styles.title}>Thông báo </Text>
                                <Text style={{ fontSize: 12, color: 'red', maxWidth: '80%' }}>
                                    Sau 12h đêm, không được sử dụng máy làm ảnh hưởng đến đời sống sin hoạt của người
                                    khác là việc làm không nên.
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 12 }}>Quản lý: 0949696969</Text>
                                    <Text style={{ fontSize: 12, color: 'green' }}>10/08/2024</Text>
                                </View>
                            </TouchableOpacity>

                            {/* Line thong bao */}
                            <TouchableOpacity style={styles.line}>
                                <Text style={styles.title}>Thông báo </Text>
                                <Text style={{ fontSize: 12, color: 'red', maxWidth: '80%' }}>
                                    Sau 12h đêm, không được sử dụng máy làm ảnh hưởng đến đời sống sin hoạt của người
                                    khác là việc làm không nên.
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 12 }}>Quản lý: 0949696969</Text>
                                    <Text style={{ fontSize: 12, color: 'green' }}>10/08/2024</Text>
                                </View>
                            </TouchableOpacity>

                            {/* Line thong bao */}
                            <TouchableOpacity style={styles.line}>
                                <Text style={styles.title}>Thông báo </Text>
                                <Text style={{ fontSize: 12, color: 'red', maxWidth: '80%' }}>
                                    Sau 12h đêm, không được sử dụng máy làm ảnh hưởng đến đời sống sin hoạt của người
                                    khác là việc làm không nên.
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 12 }}>Quản lý: 0949696969</Text>
                                    <Text style={{ fontSize: 12, color: 'green' }}>10/08/2024</Text>
                                </View>
                            </TouchableOpacity>

                            {/* Line thong bao */}
                            <TouchableOpacity style={styles.line}>
                                <Text style={styles.title}>Thông báo </Text>
                                <Text style={{ fontSize: 12, color: 'red', maxWidth: '80%' }}>
                                    Sau 12h đêm, không được sử dụng máy làm ảnh hưởng đến đời sống sin hoạt của người
                                    khác là việc làm không nên.
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 12 }}>Quản lý: 0949696969</Text>
                                    <Text style={{ fontSize: 12, color: 'green' }}>10/08/2024</Text>
                                </View>
                            </TouchableOpacity>

                            {/* Line thong bao */}
                            <TouchableOpacity style={styles.line}>
                                <Text style={styles.title}>Thông báo </Text>
                                <Text style={{ fontSize: 12, color: 'red', maxWidth: '80%' }}>
                                    Sau 12h đêm, không được sử dụng máy làm ảnh hưởng đến đời sống sin hoạt của người
                                    khác là việc làm không nên.
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 12 }}>Quản lý: 0949696969</Text>
                                    <Text style={{ fontSize: 12, color: 'green' }}>10/08/2024</Text>
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </SafeAreaView>
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
        elevation: 3,
        shadowColor: 'black',
        backgroundColor: 'white',
        marginVertical: 1,
        paddingHorizontal: 22,
        paddingVertical: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        marginHorizontal: 22,
        marginTop: 10,
    },
});
