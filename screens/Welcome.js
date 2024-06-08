import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, } from 'react-native';
import { images, icons, colors, fontSizes } from '../constants'
import { UIButton } from '../components';
import AntDesign from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {auth,
   onAuthStateChanged,
   firebaseDatabaseRef,
   firebaseSet,
   firebaseDatabase
  } from '../firebase/firebase'

const Welcome = (props) => {
  const [accountTypes, setAccountTypes] = useState([
    {
      id: 1,
      name: 'Influencer',
      isSelected: true,
    },
    {
      id: 2,
      name: 'Bussiness',
      isSelected: false,
    },
    {
      id: 3,
      name: 'Individual',
      isSelected: false,
    },
  ])
  //navigation
  const {navigation, route} =props
  //function of navigate to/back
  const {navigate, goBack} = navigation
  useEffect(()=> {
    onAuthStateChanged(auth, (responseUser)=> {
      if(responseUser){
        //save data to Firebase
        let user = {
          userId: responseUser.uid,
          email: responseUser.email,
          emailVerified: responseUser.emailVerified,
          accessToken: responseUser.accessToken         
        }
        firebaseSet(firebaseDatabaseRef(
          firebaseDatabase,
          `users/${responseUser.uid}`
        ), user)
        //save user to local storage
        AsyncStorage.setItem("user", JSON.stringify(user))
        navigate('UITab')
      }
    })
  })
  return (
    <View style={{
      backgroundColor: 'white',
      flex: 100,
    }}>
      <ImageBackground
        source={images.backgroud}
        resizeMode='cover'
        style={{
          flex: 100,
        }}
      >
        <View style={{
          flex: 20,
        }}>
          <View style={{
            flexDirection: 'row',
            height: 50,
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}>
            <Image
              source={icons.fire}
              style={{
                marginHorizontal: 10,
                width: 30,
                height: 30,
              }}
            />
            <Text style={{
              color: 'white',
            }}>YOURCOMPANY.CO</Text>
            <View style={{ flex: 1 }} />
            <AntDesign
              name='questioncircleo' style={{
                color: 'white',
                fontSize: 20,
                marginEnd: 20
              }}></AntDesign>
            {/* <Image
              source={icons.question}
              style={{
                width: 20,
                height: 20,
                tintColor: 'white',
                marginEnd: 10
              }}
            />*/}
          </View>
        </View>
        <View style={{
          flex: 20,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{
            marginBottom: 7,
            color: 'white',
            fontSize: fontSizes.h6
          }}>Welcome to</Text>
          <Text style={{
            marginBottom: 7,
            color: 'white',
            fontWeight: 'bold',
            fontSize: fontSizes.h5
          }}>YOURCOMPANY.CO</Text>
          <Text style={{
            marginBottom: 7,
            color: 'white',
            fontSize: fontSizes.h6
          }}>Please select your account type</Text>
        </View>

        <View style={{
          flex: 40,
        }}>
          {accountTypes.map(accountType => <UIButton key = {accountType.id} onPress={() => {
            setAccountTypes(accountTypes.map(eachAccountType => {
              return {
                ...eachAccountType,
                isSelected: eachAccountType.name == accountType.name
              }
            }));
          }}
            title={accountType.name}
            isSelected={accountType.isSelected}
          />)}
        </View>
        <View style={{
          flex: 20,
        }}>
          <UIButton
          onPress ={() => {
            navigate('Login')
          }}
          title={'Login'.toUpperCase()}></UIButton>
          <Text style={{
            color: 'white',
            fontSize: fontSizes.h6,
            alignSelf: 'center',
          }}>Want to register new Account</Text>
          <TouchableOpacity
            onPress={() => {
              navigate('Register')
            }}
            style={{
              padding: 5,
            }}>
            <Text style={{
              color: colors.primary,
              fontSize: fontSizes.h6,
              alignSelf: 'center',
              textDecorationLine: 'underline'
            }}>Register</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  )
}
export default Welcome;