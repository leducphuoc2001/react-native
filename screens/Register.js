import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import {images, colors, icons, fontSizes} from '../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {isValidEmail, isValidPassword} from '../utilies/Validations';
import {
  auth,
  onAuthStateChanged,
  firebaseDatabaseRef,
  firebaseSet,
  firebaseDatabase,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword
} from '../firebase/firebase';
function Register(props) {
  const [keyboardIsShow, setkeyboardIsShow] = useState(false);
  //state for validating
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  //state for store email, password
  const [email, setEmail] = useState('thanhphuong@gmail.com');
  const [password, setPassword] = useState('quanglong2');
  const [retypePassword, setRetypePassword] = useState('quanglong2');
  //state check data is validate
  const isValidationOK = () =>
    email.length > 0 &&
    password.length > 0 &&
    isValidEmail(email) == true &&
    isValidPassword(password) == true &&
    password == retypePassword;
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setkeyboardIsShow(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setkeyboardIsShow(false);
    });
  });
    //navigation
    const {navigation, route} =props
    //function of navigate to/back
    const {navigate, goBack} = navigation
  return (
    <View
      style={{
        flex: 100,
        backgroundColor: colors.primary,
      }}>
      <View
        style={{
          flex: 25,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: fontSizes.h2,
            fontWeight: 'bold',
            width: '50%',
          }}>
          Already have an Account?
        </Text>
        <Image
          tintColor={'white'}
          source={images.computer}
          style={{
            width: 120,
            height: 120,
            alignSelf: 'center',
          }}
        />
      </View>

      <View
        style={{
          flex: 50,
          backgroundColor: 'white',
          padding: 10,
          margin: 10,
          borderRadius: 15,
        }}>
        <View
          style={{
            marginHorizontal: 15,
          }}>
          <Text
            style={{
              color: colors.primary,
              fontSize: fontSizes.h5,
            }}>
            Email:{' '}
          </Text>
          <TextInput
            onChangeText={text => {
              setErrorEmail(
                isValidEmail(text) == true ? '' : 'Email not is corret format',
              );
              setEmail(text);
            }}
            style={{
              color: 'black',
            }}
            value={email}
            placeholder="example@gmail.com"
            placeholderTextColor={colors.placeholder}
          />
          <View
            style={{
              height: 1,
              backgroundColor: colors.primary,
              width: '100%',
              marginBottom: 5,
              marginHorizontal: 15,
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              color: 'red',
              marginBottom: 10,
              fontSize: fontSizes.h6,
            }}>
            {errorEmail}
          </Text>
        </View>

        <View
          style={{
            marginHorizontal: 15,
          }}>
          <Text
            style={{
              color: colors.primary,
              fontSize: fontSizes.h5,
            }}>
            Password:{' '}
          </Text>
          <TextInput
            onChangeText={text => {
              setErrorPassword(
                isValidPassword(text) == true
                  ? ''
                  : 'Password must be at least 6 characters',
              );
              setPassword(text);
            }}
            style={{
              color: 'black',
            }}
            value={password}
            secureTextEntry={true}
            placeholder="Enter your password"
            placeholderTextColor={colors.placeholder}
          />
          <View
            style={{
              height: 1,
              backgroundColor: colors.primary,
              width: '100%',
              marginBottom: 5,
              marginHorizontal: 15,
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              color: 'red',
              marginBottom: 10,
              fontSize: fontSizes.h6,
            }}>
            {errorPassword}
          </Text>
        </View>

        <View
          style={{
            marginHorizontal: 20,
          }}>
          <Text
            style={{
              color: colors.primary,
              fontSize: fontSizes.h5,
            }}>
            Retype Password:{' '}
          </Text>
          <TextInput
            onChangeText={text => {
              setErrorPassword(
                isValidPassword(text) == true
                  ? ''
                  : 'Password must be at least 6 characters',
              );
              setRetypePassword(text);
            }}
            style={{
              color: 'black',
            }}
            value={retypePassword}
            secureTextEntry={true}
            placeholder="Re-Enter your password"
            placeholderTextColor={colors.placeholder}
          />
          <View
            style={{
              height: 1,
              backgroundColor: colors.primary,
              width: '100%',
              marginBottom: 5,
              marginHorizontal: 15,
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              color: 'red',
              marginBottom: 10,
              fontSize: fontSizes.h6,
            }}>
            {errorPassword}
          </Text>
        </View>
        <TouchableOpacity
          disabled={isValidationOK() == false}
          onPress={() => {
            //alert(`Email = ${email}, Password = ${password}`)
            createUserWithEmailAndPassword(auth, email, password)
              .then(userCredential => {
                const user = userCredential.user;
                sendEmailVerification(user).then(()=> {
                    console.log('Email verifieltion sent')
                })
                navigate('UITab');
              })
              .catch(error => {
                alert(`cannot signin, error: ${error.message}`);
              });
          }}
          style={{
            backgroundColor:
              isValidationOK() == true ? colors.primary : colors.inactive,
            justifyContent: 'center',
            alignItems: 'center',
            width: '50%',
            alignSelf: 'center',
            borderRadius: 20,
          }}>
          <Text
            style={{
              padding: 8,
              fontSize: fontSizes.h5,
            }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
      {keyboardIsShow == false && (
        <View
          style={{
            flex: 15,
          }}>
          <View
            style={{
              height: 30,
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 20,
            }}>
            <View style={{height: 1, backgroundColor: 'black', flex: 1}} />
            <Text
              style={{
                padding: 8,
                fontSize: fontSizes.h6,
                color: 'black',
                alignSelf: 'center',
                marginHorizontal: 5,
              }}>
              Use other methods ?
            </Text>
            <View style={{height: 1, backgroundColor: 'black', flex: 1}} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <AntDesign
              onPress={() => {
                alert('Facebook');
              }}
              name="facebook-square"
              style={{
                color: colors.facebook,
                fontSize: 35,
              }}></AntDesign>
            <View style={{width: 15}} />
            <AntDesign
              onPress={() => {
                alert('Google');
              }}
              name="google"
              style={{
                color: colors.google,
                fontSize: 35,
              }}></AntDesign>
          </View>
        </View>
      )}
    </View>
  );
}
export default Register;
