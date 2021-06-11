import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions,
} from "react-native";
import { Card } from "react-native-elements";
import { MapPin, User, PhoneCall } from "react-native-feather";

export default function productDetails(props) {
  const extract = props.route.params.productData;
  const [item, setitem] = React.useState({
    id: extract.id,
    title: extract.name,
    location: extract.location,
    seller: extract.seller,
    contact: extract.contact,
    price: extract.price,
    condition: extract.condition,
    images: extract.images,
    productDetails: extract.description,
  });

  const modImages = Object.values(item.images);
  const newImages = [];

  modImages.forEach((element) => {
    newImages.push({ key: modImages.indexOf(element), value: element });
  });

  // var filtered = newImages.filter(function (value, index, arr) {
  //   return value != "";
  // });
  // for (let i = 0; i < modImages.length; i++) {
  //   modImages.forEach((element) => {
  //     newImages.push({ key: i, value: element });
  //   });
  // }

  return (
    <ScrollView>
      <Card marginHorizontal={3} paddingHorizontal={0}>
        <View style={{ height: "100%" }}>
          <StatusBar />
          <View style={[styles.imageSection, { justifyContent: "center" }]}>
            <ScrollView
              bouncesZoom={true}
              centerContent={true}
              horizontal={true}
            >
              {newImages.map((img) => (
                <View key={img.key}>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate("viewImage", {
                        image: { uri: `${img.value}` },
                      })
                    }
                  >
                    <Image
                      style={[styles.itemImage]}
                      source={{ uri: `${img.value}` }}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 200,
              borderBottomWidth: 1,
              borderBottomColor: "grey",
            }}
          >
            {item.title}
          </Text>
          <View style={styles.detailsSections}>
            <View style={{ flexDirection: "row", width: "100%" }}>
              <Text
                style={{
                  flex: 1,
                  //   alignSelf: "flex-start",
                  color: "grey",
                  fontSize: 18,
                }}
              >
                Condition: {item.condition}
              </Text>
              <Text
                style={{
                  flex: 1,
                  width: "100%",
                  textAlign: "right",
                  alignSelf: "flex-end",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Price: ksh. {item.price}/=
              </Text>
            </View>

            <View style={{ backgroundColor: "#fff" }}>
              <Card marginHorizontal={0} paddingHorizontal={0}>
                <Text
                  style={{
                    fontWeight: "400",
                    fontStyle: "italic",
                    fontSize: 17,
                    color: "purple",
                    marginBottom: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "rgb(220,220,220)",
                  }}
                >
                  Seller details
                </Text>

                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    marginBottom: 10,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ marginVertical: 4 }}>
                      <MapPin
                        stroke="grey"
                        fill="#fff"
                        width={16}
                        height={16}
                      />{" "}
                      Location:
                    </Text>
                    <Text style={{ marginVertical: 4 }}>
                      <User stroke="grey" fill="#fff" width={16} height={16} />{" "}
                      Sold by:
                    </Text>
                    <Text style={{ marginVertical: 4 }}>
                      <PhoneCall
                        stroke="grey"
                        fill="#fff"
                        width={16}
                        height={16}
                      />{" "}
                      Contact:
                    </Text>
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={{ marginVertical: 4 }}>{item.location}</Text>
                    <Text style={{ marginVertical: 4 }}>{item.seller}</Text>
                    <Text style={{ marginVertical: 4 }}> {item.contact}</Text>
                  </View>
                </View>
              </Card>
              <View>
                <Text
                  style={{
                    backgroundColor: "beige",
                    marginBottom: 10,
                    paddingVertical: 7,
                  }}
                >
                  Seller score: 100%
                </Text>
              </View>
              <Card marginHorizontal={0} paddingHorizontal={0}>
                <Text
                  style={{
                    fontWeight: "400",
                    fontStyle: "italic",
                    fontSize: 17,
                    color: "blue",
                  }}
                >
                  Product details
                </Text>
                <Text style={{ fontFamily: "sans-serif-light", fontSize: 16 }}>
                  {item.productDetails}
                </Text>
              </Card>

              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:${item.contact}`);
                }}
                style={{
                  backgroundColor: "green",
                  marginTop: 15,
                  borderRadius: 32,
                  marginBottom: 25,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 19,
                    paddingVertical: 10,
                    alignSelf: "center",
                  }}
                >
                  Call Seller
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  imageSection: {
    flex: 2,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(220,220,220)",
    backgroundColor: "#fff",
  },
  detailsSections: {
    flex: 3,
    paddingHorizontal: 5,
  },
  itemImage: {
    width: Math.round(Dimensions.get("window").width) / 1.3,
    height: 210,
    marginTop: 5,
    resizeMode: "contain",
  },
});
