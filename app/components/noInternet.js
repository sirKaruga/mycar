import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-elements";
import { CloudOff } from "react-native-feather";

export default function noInternet() {
  return (
    <Card
      marginHorizontal={3}
      paddingHorizontal={0}
      paddingVertical={70}
      marginVertical={40}
    >
      <View style={styles.body}>
        <Text style={{ fontSize: 20 }}>
          <CloudOff stroke="red" fill="#fff" width={32} height={32} />
          {"  "} No internet...
        </Text>
        <Text style={{ color: "grey" }}>
          Try re-establishing your connection
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  body: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    height: "100%",
  },
});
