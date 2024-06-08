import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Switch,
  StyleSheet,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import {UIHeader} from '../../components';
import {colors, fontSizes} from '../../constants';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MessengerItem from './MessengerItem';
import {TextInput} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
const Messenger = props => {
  const [typedText, setTypedText] = useState('');
  const [chatHistory, setChatHistory] = useState([

  ]);
  useEffect(()=> {
    onValue(firebaseDatabaseRef(firebaseDatabase, 'chats'), async(snapshot) => {
      if(snapshot.exists()) {                
          let snapshotObject  = snapshot.val()
          let stringUser = await AsyncStorage.getItem("user")
          let myUserId = JSON.parse(stringUser).userId
          let updateChatHistory = Object.keys(snapshotObject)
          .filter(item => item.includes(myUserId))
          .map(eachKey=> {
            return {
              ...snapshotObject[eachKey],
              isSender: eachKey.split('-')[0] == myUserId
            }
          })
          .sort((item1, item2)=> item1.timestamp - item2.timestamp)
          for(let i =0; i<updateChatHistory.length;i++){
            let item = updateChatHistory[i]
            item.showUrl = (i==0) ?
            true: item.isSender != updateChatHistory[i].isSender
          }
          setChatHistory(updateChatHistory)
      } else {
          console.log('No data available')
      }
  })       
  }, [])
  const {url, name, userId} = props.route.params.user;
  const {navigate, goBack} = props.navigation;
  return (
    <View
      style={{
        flexDirection: 'column',
        flex: 1,
      }}>
      <UIHeader
        title={name}
        leftIconName={'chevron-left'}
        rightIconName={'dots-three-vertical'}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={() => {
          alert('Right');
        }}
      />

      <FlatList
        data={chatHistory}
        renderItem={({item}) => (
          <MessengerItem
            onPress={() => {
              alert(`You press item name: ${item.timestamp}`);
            }}
            item={item}
            key={`${item.timestamp}`}
          />
        )}
      />
      <View
        style={{
          height: 50,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TextInput
          onChangeText={typedText => {
            setTypedText(typedText);
          }}
          style={{
            color: 'black',
            paddingStart: 10,
          }}
          placeholder="Enter your message here"
          value={typedText}
          placeholderTextColor={colors.placeholder}
        />
        <TouchableOpacity
          onPress={async () => {
            if (typedText.trim().length == 0) {
              return;
            }   
            let stringUser = await AsyncStorage.getItem("user")
            let myUserId = JSON.parse(stringUser).userId
            let myFriendUserId = props.route.params.user.userId
            //save to Firebase DB
            let newMessengerObject = {
              //fake
              url: 'https://randomuser.me/api/portraits/men/50.jpg',
              showUrl: false,
              messenger: typedText,
              timestamp: new Date().getTime(),
            };
            Keyboard.dismiss()
            firebaseSet(firebaseDatabaseRef(
              firebaseDatabase,
              `chats/${myUserId}-${myFriendUserId}`
            ), newMessengerObject).then(()=>{
              setTypedText('')
            })
            //"id1 - id2": {messenger object}
          }}>
          <Feather
            name="send"
            style={{
              color: 'red',
              fontSize: 20,
              marginEnd: 20,
            }}></Feather>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Messenger;
