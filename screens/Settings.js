import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Switch,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {UIHeader} from '../components';
import {colors, fontSizes} from '../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {StackActions} from '@react-navigation/native'
import {auth, firebaseDatabase, firebaseDatabaseRef} from '../firebase/firebase'
const Settings = (props) => {
  const [isEnabledLockApp, setEnabledLockApp] = useState(true);
  const [isUseFingerprint, setUseFingerprint] = useState(false);
  const [isEnabledChangePassword, setEnabledChangePassword] = useState(true);
  const button = ['1', '2', '3'];
  const [sele, setSele] = useState(false);
   //navigation
   const {navigation, route} = props
   //function of navigate to/back
   const {navigate, goBack} = navigation
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <UIHeader title={'Settings'} />
      <ScrollView>
        {/*Design commom */}
        <View style={styles.container}>
          <Text style={styles.title}>Common</Text>
        </View>
        <View style={styles.view}>
          <AntDesign name="earth" style={styles.icon}></AntDesign>
          <Text style={styles.text}>Language</Text>
          <View style={{flex: 1}} />
          <Text style={styles.text1}>English</Text>
          <AntDesign name="right" style={styles.icon1}></AntDesign>
        </View>
        <View style={styles.view}>
          <AntDesign name="cloud" style={styles.icon}></AntDesign>
          <Text style={styles.text}>Environment</Text>
          <View style={{flex: 1}} />
          <Text style={styles.text1}>Production</Text>
          <AntDesign name="right" style={styles.icon1}></AntDesign>
        </View>
        {/*Design Account */}
        <View style={styles.container}>
          <Text style={styles.title}>Account</Text>
        </View>
        <View style={styles.view}>
          <AntDesign name="phone" style={styles.icon}></AntDesign>
          <Text style={styles.text}>Phone number</Text>
          <View style={{flex: 1}} />
          <AntDesign name="right" style={styles.icon1}></AntDesign>
        </View>
        <View style={styles.view}>
          <AntDesign name="mail" style={styles.icon}></AntDesign>
          <Text style={styles.text}>Email</Text>
          <View style={{flex: 1}} />
          <AntDesign name="right" style={styles.icon1}></AntDesign>
        </View>
        <TouchableOpacity style={styles.view} onPress={()=> {
          auth.signOut()
          navigation.dispatch(StackActions.popToTop())
        }}>
          <AntDesign name="logout" style={styles.icon}></AntDesign>
          <Text style={styles.text}>Sign out</Text>
          <View style={{flex: 1}} />
          <AntDesign name="right" style={styles.icon1}></AntDesign>
        </TouchableOpacity>
        {/*Design Security */}
        <View style={styles.container}>
          <Text style={styles.title}>Security</Text>
        </View>
        {/** Lock app in background*/}
        <View style={styles.view}>
          <AntDesign name="codesquareo" style={styles.icon}></AntDesign>
          <Text style={styles.text}>lock app in background</Text>
          <View style={{flex: 1}} />
          <Switch
            trackColor={{false: colors.inactive, true: colors.primary}}
            thumbColor={isEnabledLockApp ? colors.primary : colors.inactive}
            //ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              setEnabledLockApp(!isEnabledLockApp);
            }}
            value={isEnabledLockApp}
            style={{marginEnd: 15}}
          />
        </View>
        {/** Use finger print */}
        <View style={styles.view}>
          <Entypo name="fingerprint" style={styles.icon}></Entypo>
          <Text style={styles.text}>Use finger print</Text>
          <View style={{flex: 1}} />
          <Switch
            trackColor={{false: colors.inactive, true: colors.primary}}
            thumbColor={isUseFingerprint ? colors.primary : colors.inactive}
            //ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              setUseFingerprint(!isUseFingerprint);
            }}
            value={isUseFingerprint}
            style={{marginEnd: 15}}
          />
        </View>
        {/** Change password */}
        <View style={styles.view}>
          <AntDesign name="lock" style={styles.icon}></AntDesign>
          <Text style={styles.text}>Change password</Text>
          <View style={{flex: 1}} />
          <Switch
            trackColor={{false: colors.inactive, true: colors.primary}}
            thumbColor={
              isEnabledChangePassword ? colors.primary : colors.inactive
            }
            //ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              setEnabledChangePassword(!isEnabledChangePassword);
            }}
            value={isEnabledChangePassword}
            style={{marginEnd: 15}}
          />
        </View>
        {button.map(item => {
          return (
            <TouchableOpacity
            onPress={()=>{
                              
              setSele(true)
            }}
              key={item}
              style={[

                // item === '1'
                //   ? styles.button1
                //   : item === '2'
                //   ? styles.button2
                //   : item === '3'
                //   ? styles.button3
                //   : styles.button1,
              ]}>
              <Text>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
  },
  sele: {
    backgroundColor: 'yellow',
  },
  button1: {
    backgroundColor: 'red',
  },
  button2: {
    backgroundColor: 'black',
  },
  button3: {
    backgroundColor: 'green',
  },
  view: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: fontSizes.h6,
    color: 'red',
    padding: 10,
  },
  icon: {
    fontSize: 20,
    marginStart: 10,
    color: 'black',
  },
  icon1: {
    fontSize: 20,
    color: 'black',
    paddingEnd: 10,
    opacity: 0.5,
  },
  text: {
    color: 'black',
    fontSize: fontSizes.h6,
    paddingStart: 10,
  },
  text1: {
    color: 'black',
    fontSize: fontSizes.h6,
    paddingStart: 10,
    opacity: 0.5,
  },
});
export default Settings;
