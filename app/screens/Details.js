import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  Platform,
  Alert,
} from 'react-native';
import {Card} from 'react-native-elements';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import {Check, PenTool, User, PhoneCall} from 'react-native-feather';
import {useSelector} from 'react-redux';

export default function details({navigation}) {
  var gstate = useSelector(state => state.registration);

  const promote = () => {
    if (gstate.isRegistered === false) {
      navigation.navigate('Profile');
    } else {
      Alert.alert({
        title: 'promotion',
        message: 'pay up ksh.300 and try again',
      });
      console.log(gstate.userData);
    }
  };
  return (
    <ScrollView>
      <Card marginHorizontal={1} marginVertical={5}>
        <StatusBar />
        <Text style={styles.screenHead}>Promote Your Add</Text>
      </Card>

      <Card marginHorizontal={1} marginVertical={5}>
        <Text style={styles.subHead}>Your details</Text>
        <View style={{flexDirection: 'row', flex: 2}}>
          <View
            style={{flex: 1, borderRightColor: 'grey', borderRightWidth: 1}}>
            <Text>
              <Check size={20} color="purple" />
              Registered
            </Text>
            <Text style={{color: 'purple', paddingTop: 3}}>
              - You need to transact using this exact number for mpesa{' '}
              <Text style={{fontWeight: 'bold'}}>
                ({gstate.userData.contact})
              </Text>
            </Text>
            <Text style={{paddingTop: 3}}>
              - <Text style={{fontWeight: 'bold'}}>Amount:</Text> ksh.300
            </Text>
            <Text style={{paddingTop: 3}}>
              -<Text style={{fontWeight: 'bold'}}>Promotion for:</Text> 30days
            </Text>
            <PenTool width={62} height={72} color="black" />
          </View>
          <View style={{flex: 1, marginTop: 8}}>
            <Text
              style={{fontSize: 18, fontStyle: 'italic', paddingBottom: 10}}>
              <Text>
                <User width={20} height={25} color="black" />{' '}
                {gstate.userData.name}
              </Text>
            </Text>
            <Text
              style={{fontSize: 18, fontStyle: 'italic', paddingBottom: 10}}>
              <Text>
                <PhoneCall size={25} color="black" /> {gstate.userData.contact}
              </Text>
            </Text>
            <Text style={{fontStyle: 'italic'}}>
              All adds posted using these details will be promoted once You buy
              a promotion vouture
            </Text>
          </View>
        </View>
        <View style={{alignItems: 'center', paddingTop: 10}}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>
            M-Pesa Paybill: 247247
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>
            Accont Number: 7770156736783
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>
            Amount: ksh.300
          </Text>
        </View>
      </Card>

      <Card marginHorizontal={1} marginVertical={5}>
        <View>
          <Text style={styles.subHead}>Why Promote Your Add??</Text>
          <Text style={{fontStyle: 'italic', fontSize: 16}}>
            - Your adds are always put on top of the others when you have a
            promotion vouture
          </Text>
          <Text style={{fontStyle: 'italic', fontSize: 16}}>
            - Every buyer will see your adds as first in priority
          </Text>
          <Text style={{fontStyle: 'italic', fontSize: 16}}>
            - Your adds will{' '}
            <Text style={{fontWeight: 'bold'}}> Sell Faster</Text>
          </Text>
        </View>
      </Card>
      <TouchableOpacity
        onPress={() => promote()}
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
          Promote my Adds
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

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
