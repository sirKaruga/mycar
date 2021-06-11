import 'react-native-gesture-handler';
import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import {ArrowUpCircle, List, CloudLightning} from 'react-native-feather';
//
import Home from './app/screens/home';
import Sell from './app/screens/sell';
import Support from './app/screens/support';
import Profile from './app/screens/profile';
import PreProfile from './app/screens/preprofile';
import ProductDetails from './app/screens/productDetails';
import NoInternet from './app/components/noInternet';
import SqliteScreen from './app/sqlite/sqtable';
import Flatlist from './app/screens/flatlist';
import Login from './app/screens/login';
import ViewImage from './app/screens/viewImage';
import {store} from './app/store/';
import {Provider} from 'react-redux';
import Details from './app/screens/Details';
import PreHome from './app/screens/prehomeLoader';

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          // let iconName;

          // if (route.name === 'Home') {
          //   iconName = 'ios-home-outline';
          // } else if (route.name === 'Promo') {
          //   iconName = 'ios-list';
          // } else if (route.name === 'Sell') {
          //   iconName = 'ios-add-circle-outline';
          // } else if (route.name === 'Profile') {
          //   iconName = 'ios-person-outline';
          // } else if (route.name === 'Support') {
          //   iconName = 'ios-pulse-outline';
          // }
          return (
            <ArrowUpCircle stroke={color} fill="#fff" width={32} height={32} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Promo" component={Details} />
      <Tab.Screen name="Sell" component={Sell} />
      <Tab.Screen name="Support" component={Support} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="PreHome"
            component={PreHome}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Home"
            component={Tabs}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Products"
            component={Flatlist}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="ProductDetails"
            component={ProductDetails}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="viewImage"
            component={ViewImage}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
