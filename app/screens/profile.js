import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, StatusBar, Image, Platform} from 'react-native';
import {Card, Input} from 'react-native-elements';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
//import Ionicons from "react-native-vector-icons/Ionicons";
import {ShoppingBag, MapPin} from 'react-native-feather';
import * as ImagePicker from 'expo-image-picker';
import {State} from 'react-native-gesture-handler';
import '../sqlite/sqliteglobal.js';
import {useSelector, useDispatch} from 'react-redux';
import {PenTool, User, PhoneCall, CheckCircle} from 'react-native-feather';

const db = global.db;

const profile = ({navigation}) => {
  const dispatch = useDispatch();
  // control form registration details
  const [input, setinput] = useState({
    name: '',
    contact: '',
  });
  const handleChange = (val, field) => {
    if (field === 'name') {
      setinput({
        ...input,
        name: val,
      });
    }
    if (field === 'contact') {
      setinput({
        ...input,
        contact: val,
      });
    }
  };

  const submit = () => {
    if (input.name !== '' && input.contact !== '') {
      db.transaction(tx => {
        tx.executeSql(
          `insert into tbl_register (name, contact) values('${input.name}', '${input.contact}');`,
        );
      });
      dispatch({type: 'REGISTER', payload: input});
      setdetails(input);
    }
  };

  //check if user is registered to render reg screen
  const [isRegistered, setIsRegistered] = useState('false');
  const [details, setdetails] = useState(''); //sqlite res
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists tbl_register (id integer primary key not null, name text, contact text);',
        // "drop table if  exists tbl_register ;"
      );
    });

    // check if registered
    const query = 'select *from tbl_register';
    const array = [];

    db.transaction(tx => {
      tx.executeSql(query, array, (tx, results) => {
        if (results.rows._array) {
          setdetails(results.rows._array);
        } else {
          setdetails(results.rows);
        }

        if (details.length === 0) {
          setIsRegistered('false');
        }
        if (details.length > 0) {
          setIsRegistered('true');
        }
      });
    });
  }, [details]);

  // return registered details view if client is registered
  if (isRegistered === 'true') {
    return (
      <ScrollView>
        <Card marginHorizontal={1} marginVertical={5}>
          <StatusBar />
          <Text style={styles.screenHead}>My Profile</Text>
        </Card>

        <Card marginHorizontal={1} marginVertical={5}>
          <Text style={styles.subHead}>Registration details</Text>
          <View style={{flexDirection: 'row', flex: 2}}>
            <View style={{flex: 1}}>
              <PenTool width={65} height={74} color="black" />
              <Text>
                <CheckCircle size={20} color="black" />
                Registered
              </Text>
            </View>
            <View style={{flex: 1, marginTop: 8}}>
              <Text
                style={{fontSize: 18, fontStyle: 'italic', paddingBottom: 10}}>
                <Text>
                  <User size={25} color="black" /> {details[0].name}
                </Text>
              </Text>
              <Text
                style={{fontSize: 18, fontStyle: 'italic', paddingBottom: 10}}>
                <Text>
                  <PhoneCall size={25} color="black" /> {details[0].contact}
                </Text>
              </Text>
              <Text style={{fontStyle: 'italic'}}>
                Profile set. You welcome to post adds at will
              </Text>
            </View>
          </View>
        </Card>

        <Card marginHorizontal={1} marginVertical={5}>
          <View>
            <Text style={styles.subHead}>Why sell here??</Text>
            <Text style={{fontStyle: 'italic', fontSize: 16}}>
              - You'll be able to list your owm adds for free
            </Text>
            <Text style={{fontStyle: 'italic', fontSize: 16}}>
              - Your buyers will be able to contact you directly. No monkey
              business
            </Text>
            <Text style={{fontStyle: 'italic', fontSize: 16}}>
              - it is{' '}
              <Text style={{fontWeight: 'bold'}}>
                {' '}
                absolutely Free of charge
              </Text>
            </Text>
          </View>
        </Card>
        <TouchableOpacity
          onPress={() => navigation.navigate('Sell')}
          style={{
            width: '90%',
            backgroundColor: 'green',
            marginTop: 30,
            alignSelf: 'center',
            borderRadius: 30,
            marginBottom: 30,
          }}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 20,
              color: 'white',
              padding: 10,
            }}>
            Sell my own Item
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // return unregistered details view if client is not registered
  else {
    return (
      <ScrollView>
        <Card marginHorizontal={1} marginVertical={5}>
          <StatusBar />
          <Text style={styles.screenHead}>Register for free</Text>
        </Card>

        <Card marginHorizontal={1} marginVertical={5}>
          <Text style={styles.subHead}>Registration details</Text>
          <View>
            <Text style={{fontSize: 18, fontStyle: 'italic'}}>Your Name</Text>
            <Input
              placeholder="Enter your full name"
              onChangeText={val => handleChange(val, 'name')}
              errorStyle={{color: 'red'}}
              errorMessage="Your name is required"
              leftIcon={<User size={24} color="black" />}
            />
          </View>
          <View>
            <Text style={{fontSize: 18, fontStyle: 'italic'}}>
              Contact number
            </Text>
            <Input
              placeholder="your contact number"
              onChangeText={val => handleChange(val, 'contact')}
              errorStyle={{color: 'red'}}
              errorMessage="Contact is required"
              leftIcon={<PhoneCall size={24} color="black" />}
            />
          </View>

          <TouchableOpacity
            onPress={() => submit()}
            style={{
              width: '40%',
              backgroundColor: 'green',
              marginTop: 30,
              alignSelf: 'flex-end',
              borderRadius: 20,
              marginBottom: 10,
            }}>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 20,
                color: 'white',
                padding: 7,
              }}>
              Register
            </Text>
          </TouchableOpacity>
        </Card>

        <Card marginHorizontal={1} marginVertical={5}>
          <View>
            <Text style={styles.subHead}>Why Register?</Text>
            <Text style={{fontStyle: 'italic', fontSize: 16}}>
              - You'll be able to list your owm adds for free
            </Text>
            <Text style={{fontStyle: 'italic', fontSize: 16}}>
              - Your buyers will be able to contact you directly. No monkey
              business
            </Text>
            <Text style={{fontStyle: 'italic', fontSize: 16}}>
              - You'll have a professional account
            </Text>
          </View>
        </Card>
      </ScrollView>
    );
  }
  // end return statements
};

export default profile;

const styles = StyleSheet.create({
  screenHead: {
    alignSelf: 'center',
    fontSize: 20,
  },
  subHead: {
    fontSize: 17,
    marginBottom: 10,
    fontStyle: 'italic',
    color: 'grey',
    fontWeight: 'bold',
  },
});
