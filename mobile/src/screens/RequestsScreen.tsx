import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Image, SafeAreaView, StatusBar, Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ArrowRightOnRectangleIcon } from 'react-native-heroicons/outline';
import Popover from 'react-native-popover-view/dist/Popover';
import { USER_DATA_STORED } from '../constants/AppConstant';

export default function RequestsScreen({ navigation }) {
    const onLogout = async () => {
        AsyncStorage.removeItem(USER_DATA_STORED).then(() => {
            navigation.replace('LoginV2');
        });
    };
    return (
        <SafeAreaView
            style={{
                flex: 1,
                paddingTop: StatusBar.currentHeight,
                backgroundColor: 'white',
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginHorizontal: 22,
                    // marginTop: 10,
                }}
            >
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'blue' }}>IRoom</Text>
                {/* <ChevronLeftIcon stroke={"black"} /> */}
                <View style={{ flex: 1 }}>
                    <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold' }}>Quy định phòng trọ</Text>
                </View>

                <Popover
                    from={
                        <TouchableOpacity>
                            <Image
                                source={require('../../assets/profile.jpg')}
                                style={{ height: 32, width: 32, borderRadius: 32 / 2 }}
                            />
                        </TouchableOpacity>
                    }
                >
                    <TouchableOpacity
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 120,
                            borderWidth: 1,
                            borderColor: 'black',
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                        }}
                        onPress={onLogout}
                    >
                        <ArrowRightOnRectangleIcon size={15} stroke={'black'} />
                        <Text style={{ fontSize: 14, marginLeft: 3 }}>Đăng xuất</Text>
                    </TouchableOpacity>
                </Popover>
            </View>
            <View style={styles.container}>
                <Text style={styles.header}>VỀ VẤN ĐỀ VỆ SINH</Text>
                <Text>
                    - Cần giữ gìn vệ sinh không gian chung và nơi ở. Tuyệt đối không vứt rác, xả nước hay để đồ đạc, rác
                    thải bừa bãi trong khu trọ.
                </Text>
                <Text>- Đổ rác mỗi ngày, đúng nơi quy định.</Text>
                <Text>- Không được vẽ bậy, dán tờ rơi, tranh ảnh,... lên tường.</Text>
                <Text>- Tuyệt đối không gây mất trật tự ảnh hưởng những người xung quanh.</Text>
                <Text>
                    - Phơi quần áo đúng nơi quy định, không được phơi đồ vướng đường đi. Vắt kỹ quần áo để tránh làm mất
                    vệ sinh sân sinh hoạt chung.
                </Text>
                <Text style={styles.header}>VỀ VẤN ĐỀ AN TOÀN CHUNG</Text>
                <Text>- Tuân thủ tốt công tác phòng cháy chữa cháy theo quy định.</Text>
                <Text>
                    - Nấu ăn sử dụng bếp từ hay bình ga sử dụng có khóa chốt an toàn để hạn chế nguy cơ cháy nổ.
                </Text>
                <Text>- Không đốt lửa, sử dụng những chất có nguy cơ gây nổ trong phòng trọ.</Text>
                <Text>- Sử dụng điện nước tiết kiệm, tuyệt đối không được lãng phí.</Text>
                <Text>- Không đưa bạn bè về vui chơi quá đà làm ảnh hưởng tới những người xung quanh.</Text>
                <Text>- Không vứt dép guốc lung tung tại cửa phòng ảnh hưởng tới lối đi chung.</Text>
                <Text style={styles.header}>ĐỐI VỚI VIỆC BẢO VỆ AN TOÀN PHÒNG CHÁY CHỮA CHÁY</Text>
                <Text>Kiểm tra vòi nước, ngắt nguồn điện, bếp nấu trước khi ra khỏi phòng</Text>
                <Image
                    source={require('../../assets/noi-quy-phong-tro-day-du-nhat-pccc-637605815209513613.png')}
                    style={{
                        height: 300,
                        width: 400,
                        objectFit: 'cover',
                        marginTop: 10,
                    }}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
    },
    header: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#265679',
    },
});
