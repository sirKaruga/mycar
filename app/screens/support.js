import React, {useState, useEffect} from 'react';
import {Image, TextInput} from 'react-native';
import {ScrollView} from 'react-native';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {MapPin, User} from 'react-native-feather';
//import Ionicons from "react-native-vector-icons/Ionicons";
import apiCalls from '../components/apiCalls';
import '../sqlite/sqliteglobal.js';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    message: 'Hello... how may we assist you today?...',
    sender: 'support',
  },
];

export default function support() {
  var gstate = useSelector(state => state.registration);
  const navigation = useNavigation();
  const [messages, setmessages] = useState(DATA);
  const [items, setitems] = useState([]);
  const [msg, setmsg] = useState('');
  const datetime = new Date();
  var date =
    datetime.getHours() +
    ':' +
    datetime.getMinutes() +
    ' ' +
    datetime.getDate() +
    '-' +
    datetime.getMonth() +
    '-' +
    datetime.getFullYear();

  useEffect(() => {
    apiCalls(
      {supportMessage: {contact: gstate.userData.contact}},
      '/support_initmes',
    ).then(resp => {
      setitems(resp.data.chats);
      setmsg('');
    });
  }, []);

  const onChange = val => {
    if (user.set === false) {
      navigation.navigate('Profile');
    } else {
      setmsg(val);
    }
  };

  const contact = gstate.userData.contact ? gstate.userData.contact : 'unset';

  //handle send action
  function useSend() {
    apiCalls(
      {
        supportMessage: {
          dtime: date,
          message: msg,
          contact: contact,
          sender: 'me',
        },
      },
      '/support_message',
    ).then(resp => {
      setitems(resp.data.items);
      setmsg('');
    });
  }
  return (
    <View style={{flex: 1, height: '100%'}}>
      <ScrollView>
        <StatusBar />
        {messages.map(da => (
          <View
            key={da.id}
            style={da.sender === 'support' ? styles.message : styles.received}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                fontStyle: 'italic',
              }}>
              {da.sender}
            </Text>

            <Text>{da.message}</Text>
            <Text
              style={{paddingLeft: 70, color: 'grey', alignSelf: 'flex-end'}}>
              {date}
            </Text>
          </View>
        ))}

        {items.map(da => (
          <View
            key={da._id}
            style={da.sender === 'support' ? styles.message : styles.received}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                fontStyle: 'italic',
              }}>
              {da.sender}
            </Text>

            <Text>{da.message}</Text>
            <Text
              style={{paddingLeft: 70, color: 'grey', alignSelf: 'flex-end'}}>
              {da.dtime}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          flex: 8,
          flexDirection: 'row',
        }}>
        <View style={{flex: 6, height: 70, height: 50, marginBottom: 10}}>
          <TextInput
            style={{
              backgroundColor: '#fff',
              color: 'black',
              // minWidth: "100%",
              // maxWidth: "100%",
            }}
            placeholder="Type your Text here.."
            multiline={true}
            placeholderTextColor={'grey'}
            numberOfLines={4}
            onChangeText={val => onChange(val)}
          />
        </View>
        <TouchableOpacity
          onPress={() => useSend()}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'green',
            flex: 2,
            borderRadius: 20,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 15, color: 'white'}}>
            Send
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  received: {
    marginVertical: 10,
    borderWidth: 1,
    backgroundColor: 'beige',
    padding: 5,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: -60,
    borderTopLeftRadius: 20,
    maxWidth: '80%',
    alignSelf: 'flex-end',
    marginRight: 10,
    //alignItems: "flex-end",
  },
  message: {
    backgroundColor: 'white',
    marginLeft: 10,
    marginVertical: 10,
    borderWidth: 1,
    padding: 5,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    maxWidth: '80%',
    alignSelf: 'flex-start',
    //alignItems: "flex-end",
  },
});
