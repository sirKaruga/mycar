import React from 'react';
import {StyleSheet, View, Text, StatusBar, ScrollView} from 'react-native';

export default function login({navigation}) {
  return (
    <View style={styles.screen}>
      <StatusBar />
      <View style={styles.top}>
        <Text>this is a text</Text>
      </View>
      <View style={styles.bottom}>
        <Text style={{paddingLeft: 5}}>bottom part</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'green',
    flex: 1,
    height: '100%',
  },
  top: {
    flex: 1,
  },
  bottom: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingTop: 35,
    marginLeft: 10,
  },
});
