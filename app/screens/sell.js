import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  Platform,
  TextInput,
} from 'react-native';
import {Card, Input} from 'react-native-elements';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
//import Ionicons from "react-native-vector-icons/Ionicons";
import {ShoppingBag, MapPin} from 'react-native-feather';
import * as ImagePicker from 'expo-image-picker';
import {State} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import * as Animatable from 'react-native-animatable';
import '../sqlite/sqliteglobal.js';
import {useSelector, useDispatch} from 'react-redux';

const db = global.db;

export default function sell() {
  var gstate = useSelector(state => state.registration);
  const dispatch = useDispatch();
  const [image, setImage] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
    image6: null,
  });

  const [product, setProduct] = useState({
    name: '',
    cartegory: 'Small car',
    model: '',
    condition: 'used',
    price: '',
    location: '',
    description: '',
    seller: '',
    contact: '',
    images: [],
  });

  const [err, seterr] = useState({
    name: '',
    cartegory: '',
    model: '',
    condition: '',
    price: '',
    location: '',
    description: '',
    seller: '',
    contact: '',
  });

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {status} =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  // handle the image picker buttons
  const pickImage = async id => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage({...image, [id]: result.uri});
    }
  };

  // handle other input change values
  const handleChange = (val, field) => {
    setProduct({...product, [field]: val});
  };

  //handle end editing err
  const onEndEditing = field => {
    if (product[field] === '') {
      seterr({...err, [field]: true});
    } else {
      seterr({...err, [field]: ''});
    }

    console.log(product[field]);
  };

  ///sqlite reg operation logic
  //******************************************************************************************** */
  var isRegistered = gstate.isRegistered;

  //**************************************************8************************************* */
  // console.log(isRegistered);
  //console.log(details);
  const [loader, setloader] = useState(false);
  // handle product submit
  const submit = () => {
    if (
      product.name !== null &&
      product.brand !== '' &&
      product.price !== '' &&
      product.location !== '' &&
      product.seller !== '' &&
      product.contact !== '' &&
      product.images !== '' &&
      product.description !== ''
    ) {
      setloader(true);
      //***************************************************************************************** */
      if (isRegistered === false) {
        db.transaction(tx => {
          tx.executeSql(
            `insert into tbl_register (name, contact) values('${product.seller}', '${product.contact}');`,
          );
        });
      }

      if (gstate.isRegistered === false) {
        dispatch({
          type: 'REGISTER',
          payload: {name: product.name, contact: product.contact},
        });
      }
      //******************************************************************************************* */

      //adding data to form data
      let data = new FormData();
      fl.forEach(element => {
        data.append('img' + fl.indexOf(element), element);
      });

      axios({
        method: 'post',
        url: 'http://goodmailapi.wasilisha.com/',
        // withCredentials: true,
        data: data,
        headers: {
          'content-type': 'multipart/form-data',
        },
      }).then(res => {
        product.images = res.data;
        // a call iside call

        apiCalls(inputs, '/postproduct')
          .then(response => {
            if (response.data.message === 'success') {
              alert('Product posted successfully');

              setProduct({
                ...product,
                name: '',
                cartegory: 'Small car',
                model: '',
                condition: 'used',
                price: '',
                location: '',
                description: '',
                images: [],
              });

              setImage({
                ...image,
                image1: null,
                image2: null,
                image3: null,
                image4: null,
                image5: null,
                image6: null,
              });
              setloader(false);
            }
          })
          .catch(err => {
            console.log(err);
          });
        // a call iside call end
      });
    } else {
      alert('All fields highlighted in red have to be filled to continue');
    }
  };

  if (loader === true) {
    return (
      <View
        style={{
          flex: 1,
          height: '100%',
          marginTop: '50%',
          marginBottom: '50%',
        }}>
        <Image
          style={{height: 200, width: '100%'}}
          source={require('../assets/loader.gif')}
        />
      </View>
    );
  }

  return (
    <ScrollView>
      <Animatable.View animation="bounce">
        <Card marginHorizontal={1} marginVertical={5}>
          <StatusBar />
          <Text style={styles.screenHead}>Post Your Sale add here</Text>
        </Card>
      </Animatable.View>
      <Animatable.View animation="pulse">
        <Card marginHorizontal={1} marginVertical={5}>
          <Text style={styles.subHead}>Product details</Text>

          <View>
            <Text style={{fontSize: 18, fontStyle: 'italic'}}>
              Vehicle Name and model
            </Text>
            <Input
              placeholder="e.g Toyota Fielder"
              onChangeText={val => handleChange(val, 'name')}
              errorStyle={{color: 'red'}}
              onBlur={() => onEndEditing('name')}
              errorMessage={
                err.name === true ? 'Product name is required' : null
              }
              leftIcon={<ShoppingBag name="user" size={24} color="black" />}
            />
          </View>

          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: 'grey',
              marginBottom: 10,
            }}>
            <Text style={{fontSize: 18, fontStyle: 'italic'}}>
              Vehicle cartegory
            </Text>
            <Picker
              selectedValue={product.cartegory}
              onValueChange={(itemValue, itemIndex) =>
                setProduct({...product, cartegory: itemValue})
              }
              style={{color: 'grey'}}>
              <Picker.Item label="Small car" value="Small car" />
              <Picker.Item label="pick-up" value="pick-up" />
              <Picker.Item label="van" value="van" />
              <Picker.Item label="SUV" value="SUV" />
              <Picker.Item label="Small truck" value="Small truck" />
              <Picker.Item label="Heavy Truck" value="Heavy Truck" />
              <Picker.Item label="Carbrolet" value="Carbrolet" />
              <Picker.Item label="luxury" value="luxury" />
              <Picker.Item label="electric car" value="electric car" />
            </Picker>
          </View>

          <View>
            <Text style={{fontSize: 18, fontStyle: 'italic'}}>Brand</Text>
            <Input
              placeholder="e.g Toyota"
              onChangeText={val => handleChange(val, 'model')}
              errorStyle={{color: 'red'}}
              onBlur={() => onEndEditing('model')}
              errorMessage={
                err.model === true ? 'Vehicle Model is required' : null
              }
              // leftIcon={<Ionicons name="logo-buffer" size={24} color="black" />}
            />
          </View>

          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: 'grey',
              marginBottom: 10,
            }}>
            <Text style={{fontSize: 18, fontStyle: 'italic'}}>
              Vehicle condition
            </Text>
            <Picker
              selectedValue={product.condition}
              onValueChange={(itemValue, itemIndex) =>
                setProduct({...product, condition: itemValue})
              }
              style={{color: 'grey'}}>
              <Picker.Item label="used" value="used" />
              <Picker.Item label="new" value="new" />
            </Picker>
          </View>

          <View>
            <Text style={{fontSize: 18, fontStyle: 'italic'}}>Price</Text>
            <Input
              placeholder="Price in ksh."
              onChangeText={val => handleChange(val, 'price')}
              errorStyle={{color: 'red'}}
              onBlur={() => onEndEditing('price')}
              errorMessage={
                err.price === true ? 'Vehicle Price is required' : null
              }
              // leftIcon={
              //   <Ionicons name="ios-cash-outline" size={24} color="black" />
              // }
            />
          </View>

          <View>
            <Text style={{fontSize: 18, fontStyle: 'italic'}}>Location</Text>
            <Input
              placeholder="Your location"
              errorStyle={{color: 'red'}}
              onChangeText={val => handleChange(val, 'location')}
              onBlur={() => onEndEditing('location')}
              errorMessage={
                err.location === true ? 'Your Location is required' : null
              }
              leftIcon={<MapPin size={24} color="black" />}
            />
          </View>

          <View>
            <Text style={{fontSize: 18, fontStyle: 'italic'}}>
              Vehicle Deascription
            </Text>
            <TextInput
              style={{
                flex: 6,
                height: 'auto',
                marginBottom: 10,
                backgroundColor: '#fff',
                color: 'black',
                minWidth: '100%',
                maxWidth: '100%',
                width: 0,
                flexGrow: 1,
                flex: 1,
              }}
              placeholder="Type your Text here.."
              multiline={true}
              placeholderTextColor={'grey'}
              numberOfLines={4}
              onBlur={() => onEndEditing('description')}
              onChangeText={val => handleChange(val, 'description')}
            />
            {err.description === true ? (
              <div style={{color: 'red'}}>Vehicle description is required</div>
            ) : null}
          </View>
        </Card>
      </Animatable.View>

      <Card marginHorizontal={1} marginVertical={5}>
        <Text style={styles.subHead}>Product images</Text>
        <Text style={{fontSize: 18}}>Touch image field to upload</Text>
        <View
          style={{
            flex: 2,
            flexDirection: 'row',
            alignContent: 'stretch',
            width: '100%',
          }}>
          <TouchableOpacity onPress={() => pickImage('image1')}>
            <Card marginHorizontal={5} marginVertical={0} style={{flex: 1}}>
              <Text>Image 1</Text>
              {image && (
                <Image
                  source={{uri: image.image1}}
                  style={{width: 50, height: 50}}
                />
              )}
            </Card>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => pickImage('image2')}>
            <Card marginHorizontal={5} marginVertical={0} style={{flex: 1}}>
              <Text>Image 2</Text>
              {image && (
                <Image
                  source={{uri: image.image2}}
                  style={{width: 50, height: 50}}
                />
              )}
            </Card>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => pickImage('image3')}>
            <Card marginHorizontal={5} marginVertical={0} style={{flex: 1}}>
              <Text>Image 3</Text>
              {image && (
                <Image
                  source={{uri: image.image3}}
                  style={{width: 50, height: 50}}
                />
              )}
            </Card>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 2,
            flexDirection: 'row',
            alignContent: 'stretch',
            width: '100%',
          }}>
          {image.image3 !== null ? (
            <TouchableOpacity onPress={() => pickImage('image4')}>
              <Card marginHorizontal={5} marginVertical={0} style={{flex: 1}}>
                <Text>Image 4</Text>
                {image && (
                  <Image
                    source={{uri: image.image4}}
                    style={{width: 50, height: 50}}
                  />
                )}
              </Card>
            </TouchableOpacity>
          ) : null}

          {image.image4 !== null ? (
            <TouchableOpacity onPress={() => pickImage('image5')}>
              <Card marginHorizontal={5} marginVertical={0} style={{flex: 1}}>
                <Text>Image 5</Text>
                {image && (
                  <Image
                    source={{uri: image.image5}}
                    style={{width: 50, height: 50}}
                  />
                )}
              </Card>
            </TouchableOpacity>
          ) : null}

          {image.image5 !== null ? (
            <TouchableOpacity onPress={() => pickImage('image6')}>
              <Card marginHorizontal={5} marginVertical={0} style={{flex: 1}}>
                <Text>Image 6</Text>
                {image && (
                  <Image
                    source={{uri: image.image6}}
                    style={{width: 50, height: 50}}
                  />
                )}
              </Card>
            </TouchableOpacity>
          ) : null}
        </View>
      </Card>
      {/* g */}
      {isRegistered === false ? (
        <Card marginHorizontal={1} marginVertical={5}>
          <View>
            <Text style={{fontSize: 18, fontStyle: 'italic'}}>Your Name</Text>
            <Input
              placeholder="Your Name"
              value={product.seller}
              errorStyle={{color: 'red'}}
              onChangeText={val => handleChange(val, 'seller')}
              onBlur={() => onEndEditing('seller')}
              errorMessage={
                err.seller === true ? 'Your Name is required' : null
              }
              // leftIcon={
              //   <Ionicons name="person-add-outline" size={24} color="black" />
              // }
            />
          </View>
          <View>
            <Text style={{fontSize: 18, fontStyle: 'italic'}}>Contact</Text>
            <Input
              placeholder="Your contact"
              value={product.contact}
              errorStyle={{color: 'red'}}
              onChangeText={val => handleChange(val, 'contact')}
              onBlur={() => onEndEditing('contact')}
              errorMessage={
                err.contact === true ? 'Your contact is required' : null
              }
              // leftIcon={
              //   // <Ionicons name="call-outline" size={24} color="black" />
              // }
            />
          </View>
        </Card>
      ) : null}
      {/* g */}
      <TouchableOpacity
        onPress={() => submit()}
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
          Upload
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
