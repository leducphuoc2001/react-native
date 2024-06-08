import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {colors, fontSizes} from '../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {screenWidth} from '../../utilies/Device';

function MessengerItem(props) {
  const {onPress} = props;
  const {url, isSender, messenger, timestamp, showUrl} = props.item;
  return isSender == false ? (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {showUrl == true ? (
        <Image
          style={{
            width: 40,
            height: 40,
            resizeMode: 'cover',
            borderRadius: 20,
            marginRight: 15,
            marginStart: 10,
          }}
          source={{
            uri: url,
          }}
        />
      ) : (
        <View
          style={{
            width: 40,
            height: 40,
            marginRight: 15,
            marginStart: 10,
          }}></View>
      )}
      <View
        style={{
          width: screenWidth * 0.7,
          flexDirection: 'row',
        }}>
        <View>
          <Text
            style={{
              color: 'black',
              fontSize: fontSizes.h6,
              paddingVertical: 5,
              backgroundColor: colors.messenger,
              paddingHorizontal: 7,
              borderRadius: 10,
            }}>
            {messenger}
          </Text>
        </View>
        <View style={{width: 20}}></View>
      </View>
      {/**isSender = true */}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: screenWidth * 0.7,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <View style={{width: 40}}></View>
        <View>
          <Text
            style={{
              color: 'black',
              fontSize: fontSizes.h6,
              paddingVertical: 5,
              backgroundColor: colors.messenger,
              paddingHorizontal: 7,
              borderRadius: 10,
            }}>
            {messenger}
          </Text>
        </View>
      </View>
      {showUrl == true ? (
        <Image
          style={{
            width: 40,
            height: 40,
            resizeMode: 'cover',
            borderRadius: 20,
            marginRight: 15,
            marginStart: 10,
          }}
          source={{
            uri: url,
          }}
        />
      ) : (
        <View
          style={{
            width: 40,
            height: 40,
            marginRight: 15,
            marginStart: 10,
          }}></View>
      )}
    </TouchableOpacity>
  );
}
export default MessengerItem;
