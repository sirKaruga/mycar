import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
} from 'react-native';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import Item from '../components/item';
import NoInternet from '../components/noInternet';
import '../sqlite/sqliteglobal.js';
//import { store } from "../store/";
import {useSelector, useDispatch} from 'react-redux';

const db = global.db;

const source = 'carbroet';
//console.log(store.getState);

export default function home({navigation}) {
  const [loader, setloader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setloader(false);
    }, 3000);
  }, []);

  const data = useSelector(state => state.registration.userData);
  const dispatch = useDispatch();
  //console.log(data);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists tbl_register (id integer primary key not null, name text, contact text);',
        //"drop table if  exists tbl_register ;"
      );
    });

    // check if registered
    const query = 'select *from tbl_register';
    const array = [];

    db.transaction(tx => {
      tx.executeSql(query, array, (tx, results) => {
        if (results.rows.length > 0) {
          dispatch({type: 'REGISTER', payload: results.rows[0]});
        }

        if (data.length === 0) {
          dispatch({type: 'SET_STATUS', payload: 'false'});
          //setIsRegistered("false");
        }
        if (data.length > 0) {
          dispatch({type: 'SET_STATUS', payload: 'true'});
          //setIsRegistered("true");
        }
      });
    });
  }, []);
  //console.log(data);

  // if (loader === true) {
  //   return (
  //     <View
  //       style={{
  //         flex: 11,
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //     >
  //       <StatusBar />
  //       <View style={{ flex: 6, alignItems: "center", paddingTop: 200 }}>
  //         <Image
  //           resizeMode="contain"
  //           style={{
  //             flex: 2,
  //             height: 60,
  //           }}
  //           source={require("../assets/cmalogo.png")}
  //         />
  //         <Text
  //           style={{
  //             fontWeight: "bold",
  //             fontSize: 40,
  //             fontStyle: "italic",
  //             color: "black",
  //           }}
  //         >
  //           Car Market Africa
  //         </Text>
  //         <View style={{ flex: 5 }} />
  //       </View>
  //     </View>
  //   );
  // // } else {
  return (
    <ScrollView stickyHeaderIndices={[1]} style={styles.container}>
      <View
        style={{
          // justifyContent: "center",
          // alignSelf: "center",
          flexDirection: 'row',
          paddingTop: 30,
        }}>
        <Image
          resizeMode="contain"
          style={{
            flex: 2,
            height: 60,
          }}
          source={require('../assets/cmalogo.png')}
        />
        <Text
          style={{
            flex: 4,
            color: 'white',
            justifyContent: 'center',
            alignSelf: 'center',
            fontSize: 25,
            fontStyle: 'italic',
            fontWeight: 'bold',
          }}>
          Car Market Africa
        </Text>
      </View>
      <View
        style={{
          backgroundColor: '#072f5f',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            marginTop: 14,
          }}>
          <View
            style={{
              alignContent: 'center',
              flex: 1,
              height: 40,
              backgroundColor: 'white',
              borderTopLeftRadius: 15,
              borderBottomLeftRadius: 15,
            }}>
            {/* <Ionicons
              style={{
                alignSelf: 'center',
                marginTop: 5,
                height: 35,
              }}
              name="ios-search-outline"
              size={30}
            /> */}
          </View>

          <TextInput
            style={{
              flex: 6,
              height: 40,
              backgroundColor: '#fff',
              marginBottom: 20,
              color: 'black',
            }}
            placeholder="Search by make, model, brand, origin.."
            placeholderTextColor={'grey'}
            onChangeText={data => console.log(data)}
          />

          <TouchableOpacity
            onPress={() => console.log('executeSearch')}
            style={{
              justifyContent: 'center',
              borderTopRightRadius: 15,
              borderBottomRightRadius: 15,
              height: 40,
              backgroundColor: 'green',
              flex: 1.5,
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{backgroundColor: '#072f5f', height: 30}}></View>
      <StatusBar style="auto" />

      <View style={styles.rowTableView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Products', {cat: 'Carbrolet'});
          }}
          style={styles.tableCell}>
          <View style={{flexDirection: 'column'}}>
            <Image
              style={styles.tableCatImg}
              source={require('../assets/carbrolet.jpg')}
            />
            <Text style={styles.tableCellText}>Carbrolet</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Products', {cat: 'SUV'});
          }}
          style={styles.tableCell}>
          <View style={{flexDirection: 'column'}}>
            <Image
              style={styles.tableCatImg}
              source={require('../assets/suv.png')}
            />
            <Text style={styles.tableCellText}>SUV's</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Products', {cat: 'van'});
          }}
          style={styles.tableCell}>
          <View style={{flexDirection: 'column'}}>
            <Image
              style={styles.tableCatImg}
              source={require('../assets/vans.jpeg')}
            />
            <Text style={styles.tableCellText}>Vans</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* second table row */}
      <View style={styles.rowTableView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Products', {cat: 'Small car'});
          }}
          style={styles.tableCell}>
          <View style={{flexDirection: 'column'}}>
            <Image
              style={styles.tableCatImg}
              source={require('../assets/car.png')}
            />
            <Text style={styles.tableCellText}>Small cars</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Products', {cat: 'luxury'});
          }}
          style={styles.tableCell}>
          <View style={{flexDirection: 'column'}}>
            <Image
              style={styles.tableCatImg}
              source={require('../assets/luxury.jpg')}
            />
            <Text style={styles.tableCellText}>Luxury</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Products', {cat: 'pick-up'});
          }}
          style={styles.tableCell}>
          <View style={{flexDirection: 'column'}}>
            <Image
              style={styles.tableCatImg}
              source={require('../assets/pickup.png')}
            />
            <Text style={styles.tableCellText}>Pick-up's</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* third table row */}

      <View style={styles.rowTableView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Products', {cat: 'Small truck'});
          }}
          style={styles.tableCell}>
          <View style={{flexDirection: 'column'}}>
            <Image
              style={{
                height: 80,
                width: '100%',
                alignSelf: 'center',
                marginTop: 15,
                resizeMode: 'contain',
              }}
              source={require('../assets/Delivery-Truck.png')}
            />
            <Text style={styles.tableCellText}>Small trucks</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Products', {cat: 'Heavy Truck'});
          }}
          style={styles.tableCell}>
          <View style={{flexDirection: 'column'}}>
            <Image
              style={styles.tableCatImg}
              source={require('../assets/backgroundvisual.png')}
            />
            <Text style={styles.tableCellText}>Heavy trucks</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Products', {cat: 'electric car'});
          }}
          style={styles.tableCell}>
          <View style={{flexDirection: 'column'}}>
            <Image
              style={styles.tableCatImg}
              source={require('../assets/electric-car.png')}
            />
            <Text style={styles.tableCellText}>Electric cars</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* end table */}

      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{marginTop: 10}}>
          <Text
            style={{
              borderBottomColor: 'green',
              borderBottomWidth: 2,
              fontWeight: '700',
              fontSize: 19,
            }}>
            {'  '}
            The Trending
          </Text>
          {/* top items */}

          <NoInternet />
          <Item />

          {/* top items */}
        </View>
      </View>
    </ScrollView>
  );
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#072f5f',
  },
  head: {
    backgroundColor: '#072f5f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowTableView: {
    flexDirection: 'row',
    // height: 40,
    backgroundColor: '#bebebe',
    justifyContent: 'space-evenly',
  },
  tableCell: {
    borderColor: '#bebebe',
    backgroundColor: '#fff',
    flex: 1,
    borderWidth: 1,
    height: 'auto',
  },
  tableCatImg: {
    height: 90,
    width: '100%',
    alignSelf: 'center',
    marginTop: 5,
    resizeMode: 'contain',
  },
  tableCellText: {
    alignSelf: 'center',
    fontSize: 19,
  },
});
