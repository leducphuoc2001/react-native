import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Switch,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {UIHeader} from '../../components';
import {colors, fontSizes} from '../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatItem from './ChatItem';
import { auth,
  onAuthStateChanged,
  firebaseDatabaseRef,
  firebaseSet,
  firebaseDatabase,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  child,
  get,
  onValue
} from '../../firebase/firebase';
const Chat = (props) => {
  const [users, setUsers] = useState([
    // {
    //   url: 'https://randomuser.me/api/portraits/men/75.jpg',
    //   name: 'Hoa',
    //   message: 'Hello, how are you',
    //   numberOfUnreadMessages:3
    // },
  ]);
  //navigation
  const {navigation, route} = props;
  //function of navigate to/back
  const {navigate, goBack} = navigation;
  useEffect(()=> {
    onValue(firebaseDatabaseRef(firebaseDatabase, 'users'), async(snapshot) => {
      if(snapshot.exists()) {                
          let snapshotObject  = snapshot.val()
          let stringUser = await AsyncStorage.getItem("user")
          let myUserId = JSON.parse(stringUser).userId
          setUsers(Object.keys(snapshotObject)
          .filter(item => item != myUserId).map((eachKey  => {
            let eachObject = snapshotObject[eachKey]
              return {
                  //default profile url
                  url: 'https://www.w3schools.com/howto/img_avatar.png',
                  name: eachObject.email,
                  email: eachObject.email,
                  accessToken: eachObject.accessToken,
                  numberOfUnreadMessages: 0,
                  userId: eachKey,
              }
          })))     
      } else {
          console.log('No data available')
      }
  })       
  }, [])
  return (
    <View
      style={{
        flexDirection: 'column',
      }}>
      <UIHeader
        title={'Notifications'}
        leftIconName={'chevron-left'}
        rightIconName={'magnifying-glass'}
        onPressLeftIcon={() => {
          goBack()
        }}
        onPressRightIcon={() => {
          alert('Right');
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingStart :10  
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: fontSizes.h5,
          }}>
          6 unread messages
        </Text>
        <AntDesign
          name={'search1'}
          color="black"
          style={{
            padding: 15,
            fontSize: 25,
          }}
          onPress={() => {
            alert('You press delete');
          }}
        />
      </View>
      <FlatList
          data={users}
          renderItem={({item}) => (
            <ChatItem
              onPress={() => {
                navigate('Messenger', {user: item})
              }}
              user={item}
              key={item.url}
            />
          )}
        />
    </View>
  );
};
export default Chat;
