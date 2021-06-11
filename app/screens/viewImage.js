import React from "react";
import { View, Text, Image } from "react-native";
import * as Animatable from "react-native-animatable";

export default function viewImage(props) {
  const image = props.route.params.image;

  return (
    <View
      style={{
        justifyContent: "center",
        paddingLeft: 0,
        marginLeft: 0,
      }}
    >
      <Image
        source={image}
        style={{ height: 300, resizeMode: "stretch", marginTop: "30%" }}
      />
    </View>
  );
}
