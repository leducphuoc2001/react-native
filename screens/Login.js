import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  StyleSheet,
} from 'react-native';
import {images, colors, icons, fontSizes} from '../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {isValidEmail, isValidPassword} from '../utilies/Validations';
import {
  auth,
  signInWithEmailAndPassword,
} from '../firebase/firebase';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
function Login(props) {
  const [keyboardIsShow, setkeyboardIsShow] = useState(false);
  //state for validating
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  //state for store email, password
  const [email, setEmail] = useState('thanhphuong@gmail.com');
  const [password, setPassword] = useState('quanglong2');
  //state check data is validate
  const isValidationOK = () =>
    email.length > 0 &&
    password.length > 0 &&
    isValidEmail(email) == true &&
    isValidPassword(password) == true;
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setkeyboardIsShow(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setkeyboardIsShow(false);
    });
  });
  //navigation
  const {navigation, route} = props;
  //function of navigate to/back
  const {navigate, goBack} = navigation;

  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
  
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
  
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
  
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.textStyle}>This is login</Text>
        <Image
          tintColor={colors.primary}
          source={images.computer}
          style={styles.imagesStyle}
        />
      </View>
      <View
        style={{
          flex: 30,
        }}>
        <View
          style={{
            marginHorizontal: 15,
          }}>
          <Text style={styles.textCheckErrorStyle}>Email: </Text>
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
            placeholder="example@gmail.com"
            value={email}
            placeholderTextColor={colors.placeholder}
          />
          <View style={styles.viewError} />
          <Text style={styles.textErrorStyle}>{errorEmail}</Text>
        </View>

        <View
          style={{
            marginHorizontal: 15,
          }}>
          <Text style={styles.textCheckErrorStyle}>Password: </Text>
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
            secureTextEntry={true}
            placeholder="Enter your password"
            value={password}
            placeholderTextColor={colors.placeholder}
          />
          <View style={styles.viewError} />
          <Text style={styles.textErrorStyle}>{errorPassword}</Text>
        </View>
      </View>
      {keyboardIsShow == false && (
        <View
          style={{
            flex: 15,
          }}>
          <TouchableOpacity
            disabled={isValidationOK() == false}
            onPress={() => {
              signInWithEmailAndPassword(auth, email, password)
                .then(userCredential => {
                  const user = userCredential.user;
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
            <Text style={styles.ButtonLoginStyle}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigate('Register');
            }}
            style={{
              padding: 5,
            }}>
            <Text style={styles.buttonRegisterStyle}>
              New use? Register now
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {keyboardIsShow == false && (
        <View
          style={{
            flex: 25,
          }}>
          <View style={styles.useOtherMethodStyle}>
            <View style={styles.unline} />
            <Text style={styles.textuseOtherMethodStyle}>
              Use other methods ?
            </Text>
            <View style={styles.unline} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <AntDesign
              onPress={() => 
                onFacebookButtonPress()
              }
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
const styles = StyleSheet.create({
  container: {
    flex: 100,
    backgroundColor: 'white',
  },
  title: {
    flex: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textStyle: {
    color: 'black',
    fontSize: fontSizes.h2,
    fontWeight: 'bold',
  },
  imagesStyle: {
    width: 120,
    height: 120,
    alignSelf: 'center',
  },
  textCheckErrorStyle: {
    color: colors.primary,
    fontSize: fontSizes.h5,
  },
  viewError: {
    height: 1,
    backgroundColor: colors.primary,
    width: '100%',
    marginBottom: 5,
    marginHorizontal: 15,
    alignSelf: 'center',
  },
  textErrorStyle: {
    color: 'red',
    marginBottom: 15,
    fontSize: fontSizes.h6,
  },
  ButtonLoginStyle: {
    padding: 8,
    fontSize: fontSizes.h5,
  },
  buttonRegisterStyle: {
    padding: 8,
    fontSize: fontSizes.h6,
    alignSelf: 'center',
    color: colors.primary,
  },
  useOtherMethodStyle: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  textuseOtherMethodStyle: {
    padding: 8,
    fontSize: fontSizes.h6,
    color: 'black',
    alignSelf: 'center',
    marginHorizontal: 5,
  },
  unline: {
    height: 1,
    backgroundColor: 'black',
    flex: 1,
  },
});
export default Login;
