import React, {useState, useEffect} from 'react';
import {Image} from 'react-native';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {MapPin, User} from 'react-native-feather';
//import Ionicons from "react-native-vector-icons/Ionicons";
import apiCalls from '../components/apiCalls';

const Item = ({image, item, onPress, style}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <View style={styles.listItem}>
      <View style={styles.itemCardTopSection}>
        <Image style={styles.itemImage} source={image} />
        <View style={{alignSelf: 'center', flex: 4}}>
          <Text style={styles.item}>
            {item.name.length > 50
              ? item.name.slice(0, 50).concat('...')
              : item.name}
          </Text>
          <Text>
            <MapPin stroke="grey" fill="#fff" width={15} name="map-pin" />
            {'  '}
            {item.location}
          </Text>
          <Text style={{backgroundColor: 'beige', padding: 5}}>
            {item.condition}
          </Text>
          <Text style={{fontStyle: 'italic', fontWeight: 'bold', fontSize: 14}}>
            Ksh. {item.price}/=
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            flex: 1,
            borderRightWidth: 1,
            borderRightColor: 'rgb(220,220,220)',
            borderBottomWidth: 2,
            borderBottomColor: 'blue',
          }}>
          <Text style={[styles.item]}>
            {/* <Ionicons name="ios-call-outline" size={20} /> Contact */}
          </Text>
        </View>
        <View
          style={{flex: 1, borderBottomWidth: 2, borderBottomColor: 'green'}}>
          <Text style={[styles.item]}>
            <User stroke="grey" fill="#fff" /> {item.seller}
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const Flatlist = props => {
  const [loading, setloading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [rowDATA, setRowDATA] = useState([]);
  const [returns, setreturns] = useState(false);
  const cat = props.route.params.cat;
  const [arr, setArr] = useState([]);
  //LogBox.ignoreAllLogs();
  useEffect(() => {
    apiCalls({cartegory: cat}, '/getproduct_cat')
      .then(resp => {
        setArr(resp.data.items);
        setloading(false);
      })
      .catch(err => console.log(err));
  }, []);

  console.log(cat);

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    return (
      <Item
        image={{uri: `${item.images[0]}`}}
        item={item}
        onPress={() => {
          props.navigation.navigate('ProductDetails', {productData: item});
        }}
        style={{backgroundColor}}
      />
    );
  };

  if (loading === true) {
    return (
      <View
        style={{
          flex: 11,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <StatusBar />
        <View style={{flex: 6, alignItems: 'center', paddingTop: 200}}>
          <Image
            resizeMode="contain"
            style={{
              flex: 2,
              height: 60,
            }}
            source={require('../assets/loader.gif')}
          />

          <View style={{flex: 5}} />
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={arr}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(220,220,220)',
    flex: 1,
    //marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    fontSize: 15,
    marginVertical: 3,
    marginHorizontal: 0,
  },
  itemCardTopSection: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(220,220,220)',
  },
  itemImage: {
    flex: 3,
    height: 100,
    alignSelf: 'center',
    marginTop: 5,
    resizeMode: 'contain',
  },
  listItem: {
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
  },
});

export default Flatlist;
