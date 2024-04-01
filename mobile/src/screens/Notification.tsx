import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ArrowRightOnRectangleIcon } from 'react-native-heroicons/outline';
import Popover from 'react-native-popover-view/dist/Popover';
import { USER_DATA_STORED } from '../constants/AppConstant';
import { useMergeState } from '../hooks/useMergeState';
import { DateUtil } from '../utils/DateUtil';

export default function Notification({ navigation }) {
    const onLogout = async () => {
        AsyncStorage.removeItem(USER_DATA_STORED).then(() => {
            navigation.replace('LoginV2');
        });
    };
    const mockData = [
        {
            id: 1,
            title: 'Thông báo từ chủ nhà',
            message:
                'Xin chào quý khách, chúng tôi rất vui thông báo rằng từ ngày 15/03/2024, chúng tôi sẽ thực hiện việc cải thiện hệ thống nước nóng ở tòa nhà. Trong thời gian này, có thể sẽ có một số gián đoạn ngắn trong việc sử dụng nước nóng. Chúng tôi rất tiếc về sự bất tiện này và xin cảm ơn sự thông cảm của quý khách.',
            timestamp: new Date('2024-03-10T09:00:00').toString(),
            status: 'unread',
        },
        {
            id: 2,
            title: 'Thông báo từ chủ nhà',
            message:
                'Kính gửi quý khách, chúng tôi muốn thông báo rằng chúng tôi sẽ tiến hành làm mới phòng tắm ở tầng 2 từ ngày mai. Việc này sẽ không gây ảnh hưởng đến việc lưu trú của quý khách, nhưng có thể sẽ có tiếng ồn và một số nhân viên di chuyển trong khu vực. Chúng tôi rất mong quý khách thông cảm và xin lưu ý.',
            timestamp: new Date('2024-03-09T14:30:00').toString(),
            status: 'read',
        },
        {
            id: 3,
            title: 'Thông báo từ chủ nhà',
            message:
                'Chào quý khách, chúng tôi muốn thông báo rằng từ ngày 20/03/2024, chúng tôi sẽ thực hiện việc vệ sinh chung khu vực hành lang và cầu thang trong toà nhà. Việc này sẽ không gây ảnh hưởng lớn đến việc sử dụng, nhưng có thể sẽ làm mất mát gọn gàng trong một số thời gian ngắn. Xin quý khách vui lòng lưu ý.',
            timestamp: new Date('2024-03-08T11:00:00').toString(),
            status: 'read',
        },
        {
            id: 4,
            title: 'Thông báo từ chủ nhà',
            message:
                'Thông báo: Từ ngày 25/03/2024, chúng tôi sẽ tổ chức một buổi tiệc nhỏ để kỷ niệm ngày thành lập. Quý khách được mời tham dự vào lúc 18:00 tại khu vườn của tòa nhà. Rất mong quý khách sẽ tham gia.',
            timestamp: new Date('2024-03-07T15:00:00').toString(),
            status: 'unread',
        },
        {
            id: 5,
            title: 'Thông báo từ chủ nhà',
            message:
                'Kính gửi quý khách, chúng tôi muốn thông báo rằng trong thời gian tới, chúng tôi sẽ thực hiện việc cải thiện dịch vụ Internet. Trong quá trình này, có thể sẽ có gián đoạn ngắn trong việc truy cập Internet. Chúng tôi xin lỗi về sự bất tiện này và xin cảm ơn sự thông cảm của quý khách.',
            timestamp: new Date('2024-03-06T10:30:00').toString(),
            status: 'read',
        },
        {
            id: 6,
            title: 'Thông báo từ chủ nhà',
            message:
                'Chúng tôi muốn thông báo rằng vào ngày 18/03/2024, chúng tôi sẽ tổ chức một buổi họp gặp gỡ cộng đồng. Quý khách được mời tham gia và góp ý ý kiến để cải thiện dịch vụ và môi trường sống tại khu vực của chúng tôi. Rất mong sự tham gia tích cực của quý khách.',
            timestamp: new Date('2024-03-05T13:45:00').toString(),
            status: 'unread',
        },
        {
            id: 7,
            title: 'Thông báo từ chủ nhà',
            message:
                'Xin chào quý khách, chúng tôi muốn thông báo rằng từ ngày mai, chúng tôi sẽ thực hiện việc sơn lại khu vực sảnh. Việc này sẽ không ảnh hưởng đến việc đi lại của quý khách, nhưng có thể sẽ có một số mùi sơn trong thời gian ngắn. Xin quý khách vui lòng lưu ý.',
            timestamp: new Date('2024-03-04T08:00:00').toString(),
            status: 'read',
        },
        {
            id: 8,
            title: 'Thông báo từ chủ nhà',
            message:
                'Kính gửi quý khách, chúng tôi muốn thông báo rằng từ ngày 10/03/2024, chúng tôi sẽ mở rộng thời gian hoạt động của phòng tập thể dục. Phòng sẽ mở cửa từ 6:00 sáng đến 22:00 tối hàng ngày. Rất mong quý khách sẽ tận hưởng thêm dịch vụ này.',
            timestamp: new Date('2024-03-03T16:20:00').toString(),
            status: 'unread',
        },
    ];

    const [state, setState] = useMergeState({
        loading: false,
        data: mockData,
    });

    return (
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1, paddingTop: StatusBar.currentHeight }}>
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
                    <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold' }}>Thông báo</Text>
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
            {/* </View> */}
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 15,
                }}
            >
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Tất cả: </Text>
                <Text style={{ fontStyle: 'italic', fontSize: 13 }}>({state.data?.length ?? 0})</Text>
            </View>
            <ScrollView
                style={{
                    paddingHorizontal: 15,
                    flex: 1,
                }}
            >
                {state.data?.map((item, index) => {
                    const statusColor = item.status === 'unread' ? '#58b6f520' : '#fff';
                    const statusRow = item.status === 'unread' ? '#ed4e39' : '#30394f';
                    return (
                        <View
                            key={index}
                            style={{
                                position: 'relative',
                                borderStyle: 'solid',
                                borderWidth: 1,
                                borderColor: '#265679',
                                backgroundColor: statusColor,
                                borderLeftWidth: 6,
                                borderRadius: 10,
                                padding: 15,
                                marginVertical: 5,
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                            }}
                        >
                            <View style={{ width: '100%' }}>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        width: '100%',
                                        position: 'relative',
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: 'bold',
                                            color: '#265679',
                                            flex: 1,
                                        }}
                                    >
                                        {item.title}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 11,
                                            fontWeight: 'bold',
                                            color: `${statusRow}`,
                                            backgroundColor: `${statusRow}20`,
                                            padding: 2,
                                            borderRadius: 5,
                                        }}
                                    >
                                        {item.status === 'unread' ? 'Mới' : 'Đã đọc'}
                                    </Text>
                                </View>
                                <Text
                                    numberOfLines={3}
                                    style={{
                                        fontSize: 12,
                                        color: '#333',
                                        marginTop: 5,
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    {item.message}
                                </Text>
                                <Text
                                    style={{
                                        position: 'absolute',
                                        bottom: -13,
                                        right: 0,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        fontSize: 11,
                                        color: '#a3a8ad',
                                        marginLeft: 5,
                                        fontStyle: 'italic',
                                    }}
                                >
                                    {DateUtil.formatDate(item.timestamp)}
                                </Text>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
}
