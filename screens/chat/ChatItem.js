import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {colors, fontSizes} from '../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
function ChatItem(props) {
  let {name, url, message, numberOfUnreadMessages,userId} = props.user;
  const {onPress} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 80,
        paddingTop: 20,
        paddingStart: 10,
        flexDirection: 'row',
      }}>
      <View>
        <Image
          style={{
            width: 50,
            height: 50,
            resizeMode: 'cover',
            borderRadius: 25,
            marginRight: 15,
            marginStart: 10,
          }}
          source={{
            uri: url,
          }}
        />
        {numberOfUnreadMessages > 0 && (
          <Text
            style={{
              backgroundColor: 'red',
              position: 'absolute',
              right: 7,
              fontSize: fontSizes.h6,
              borderRadius: 10,
              paddingHorizontal: numberOfUnreadMessages > 9 ? 2 : 4,
              color: 'white',
            }}>
            {numberOfUnreadMessages}
          </Text>
        )}
      </View>
      <View style={{
        flexDirection:'column',
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: fontSizes.h5,
            fontWeight: 'bold',
          }}>
          {name}
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: fontSizes.h5,
          }}>
          {message}
        </Text>
      </View>
      <View style={{
        flexDirection:'column',
        flex:1,
        justifyContent:'center',
        alignItems:'flex-end'
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: fontSizes.h6,
          }}>
          5 minutes ago
        </Text>
      </View>
    </TouchableOpacity>
  );
}
export default ChatItem;
