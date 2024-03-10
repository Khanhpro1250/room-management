import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from 'react-native';
import { ChatBubbleLeftEllipsisIcon, ClipboardDocumentListIcon, HomeIcon } from 'react-native-heroicons/outline';
import Notification from '../screens/Notification';
import RequestsScreen from '../screens/RequestsScreen';
import DetailRoomNavigation from './DetailRoomNavigation';

const Tab = createBottomTabNavigator();
export default function HomeUINavigation() {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    tabBarStyle: {
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        backgroundColor: 'white',
                    },
                    // tabBarActiveTintColor: "tomato",
                }}
            >
                <Tab.Screen
                    name="Notification"
                    component={Notification}
                    options={{
                        headerShown: false,
                        //   tabBarBadge: 3,
                        tabBarIcon: ({ color, size }) => <ChatBubbleLeftEllipsisIcon stroke={color} size={size} />,
                    }}
                />
                <Tab.Screen
                    name="Home"
                    component={DetailRoomNavigation}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => <HomeIcon stroke={color} size={size} />,
                    }}
                />

                <Tab.Screen
                    name="Request"
                    component={RequestsScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => <ClipboardDocumentListIcon stroke={color} size={size} />,
                    }}
                />
            </Tab.Navigator>
        </View>
    );
}
