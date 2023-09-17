import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { ChevronRightIcon } from "react-native-heroicons/outline";

export default function RoommatesScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          alignItems: "center",
          elevation: 3,
          shadowColor: "black",
          backgroundColor: "white",
          borderRadius: 10,
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 10,
          marginHorizontal: 22,
        }}
      >
        <View>
          <Text style={styles.title}>Nguyễn Nhật Linh</Text>
          <Text>Ngày sinh: 29-08-2001</Text>
          <Text>CCCD: 387643921</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <ChevronRightIcon stroke={"grey"} />
        </TouchableOpacity>
      </View>
      {/* nguoi thue 2 */}
      <View
        style={{
          alignItems: "center",
          elevation: 3,
          shadowColor: "black",
          backgroundColor: "white",
          borderRadius: 10,
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 10,
          marginHorizontal: 22,
        }}
      >
        <View>
          <Text style={styles.title}>Huỳnh Công Khanh</Text>
          <Text>Ngày sinh: 13-03-2001</Text>
          <Text>CCCD: 387443921</Text>
        </View>
        <TouchableOpacity>
          <ChevronRightIcon stroke={"grey"} />
        </TouchableOpacity>
      </View>
      {/* nguoi thue 3 */}
      <View
        style={{
          alignItems: "center",
          elevation: 3,
          shadowColor: "black",
          backgroundColor: "white",
          borderRadius: 10,
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 10,
          marginHorizontal: 22,
        }}
      >
        <View>
          <Text style={styles.title}>Trần Anh Khoa</Text>
          <Text>Ngày sinh: 12-12-2001</Text>
          <Text>CCCD: 387649807</Text>
        </View>
        <TouchableOpacity>
          <ChevronRightIcon stroke={"grey"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
  },
  info: {
    fontSize: 13,
    color: "grey",
    fontWeight: "bold",
  },
});
