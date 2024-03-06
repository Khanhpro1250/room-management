import React from 'react';
import { Text, View } from 'react-native';
import { CloudIcon, HomeIcon, SpeakerWaveIcon, TruckIcon } from 'react-native-heroicons/outline';

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
            case 'ORDER':
                return <HomeIcon stroke={`${props.color}`} />;
            default:
                return null; // or some default icon if needed
        }
    };
    return (
        <View
            style={{
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: `${props.color}20`,
                marginVertical: 5,
                height: 80,
                width: 120,
                padding: 3,
            }}
        >
            {getIcon()}
            <Text style={{ fontSize: 12, color: props.color }}>{props.name}</Text>
            <Text style={{ fontSize: 12, color: props.color }}>{props.price}</Text>
        </View>
    );
}
