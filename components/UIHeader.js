import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors, fontSizes} from '../constants';

const UIHeader = (props) => {
    const {title, leftIconName,rightIconName,
      onPressLeftIcon,onPressRightIcon} = props
  return (
    <View
      style={{
        height: 50,
        backgroundColor: colors.primary,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
      }}>
        {leftIconName != undefined ? <Entypo
          name={leftIconName}
          color='white'
          style={{
            fontSize: 25,
            padding: 10,         
          }}
          onPress={onPressLeftIcon} 
        />: <View style={{width:50,height:50}}/>}
      <Text
        style={{
          fontSize: fontSizes.h5,
          alignSelf: 'center',
          lineHeight: 45,
          color: 'white',
        }}>
        {title}
      </Text>
      {rightIconName != undefined ?<Entypo
          name={rightIconName}
          color='white'
          style={{
            fontSize: 25,
            padding: 10,
          }}
          onPress={onPressRightIcon} 
        />: <View style={{width:50,height:50}}/>}
    </View>
  );
};
export default UIHeader;
