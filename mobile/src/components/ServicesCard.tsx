import React from 'react';
import { Text, View } from 'react-native';
import { CloudIcon, HomeIcon, SpeakerWaveIcon, TruckIcon, WalletIcon, WifiIcon } from 'react-native-heroicons/outline';

interface props {
    serviceCode: string;
    name: String;
    price: String;
    color: String;
}
export default function ServicesCard(props) {
    const getIcon = () => {
        switch (props.serviceCode) {
            case 'DIEN':
                return <SpeakerWaveIcon stroke={`${props.color}`} />;
            case 'NUOC':
                return <CloudIcon stroke={`${props.color}`} />;
            case 'DRIVE':
                return <TruckIcon stroke={`${props.color}`} />;
            case 'WIFI':
                return <WifiIcon stroke={`${props.color}`} />;
            case 'ORDER':
                return <HomeIcon stroke={`${props.color}`} />;
            default:
                return <WalletIcon stroke={`${props.color}`} />;
        }
    };
    return (
        <View
            style={{
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: `${props.color}20`,
                paddingHorizontal: 15,
                paddingVertical: 10,
            }}
        >
            {getIcon()}
            <Text style={{ fontSize: 12, color: props.color }}>{props.name}</Text>
            <Text style={{ fontSize: 12, color: props.color }}>{props.price}</Text>
        </View>
    );
}
