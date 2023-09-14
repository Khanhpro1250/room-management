import { View, Text, StatusBar, SafeAreaView } from "react-native";
import React from "react";

export default function HomeScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <Text>Hêllo</Text>
      </View>
    </SafeAreaView>
  );
}
