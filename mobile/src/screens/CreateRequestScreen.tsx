import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { ChevronLeftIcon, ShareIcon } from "react-native-heroicons/outline";
import { Button, TextInput } from "react-native-paper";

export default function CreateRequestScreen({ navigation }) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "white",
      }}
    >
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 20,
            marginHorizontal: 22,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <ChevronLeftIcon stroke={"black"} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text
              style={{ alignSelf: "center", fontSize: 20, fontWeight: "bold" }}
            >
              Add Request
            </Text>
          </View>
          <ShareIcon />
        </View>
        {/* Content */}
        <View
          style={{
            elevation: 3,
            shadowColor: "black",
            backgroundColor: "white",
            borderRadius: 10,
            marginHorizontal: 22,
            paddingBottom: 30,
          }}
        >
          <View style={{ marginHorizontal: 10 }}>
            <TextInput label={"Title"} mode="outlined" />
            <TextInput label={"Description"} mode="outlined" />
            <TextInput label={"Priority"} mode="outlined" />
            <Button
              style={{ marginVertical: 20 }}
              mode="elevated"
              buttonColor="violet"
              onPress={() => {
                navigation.goBack();
              }}
            >
              Thêm
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
