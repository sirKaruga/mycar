import React, { useState, useEffect } from "react";
import { View, Text, Image, StatusBar } from "react-native";

export default function prehomeLoader({ navigation }) {
  const [loader, setloader] = useState(true);

  //   useEffect(() => {
  setTimeout(() => {
    setloader(false);
  }, 3000);
  //   }, []);

  if (loader === false) {
    return <>{navigation.navigate("Home")}</>;
  }
  if (loader === true) {
    return (
      <View
        style={{
          flex: 11,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StatusBar />
        <View style={{ flex: 6, alignItems: "center", paddingTop: 200 }}>
          <Image
            resizeMode="contain"
            style={{
              flex: 2,
              height: 60,
            }}
            source={require("../assets/cmalogo.png")}
          />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 40,
              fontStyle: "italic",
              color: "black",
            }}
          >
            Car Market Africa
          </Text>
          <View style={{ flex: 5 }} />
        </View>
      </View>
    );
  }
}
