import React, {useState} from 'react';
import {View} from 'react-native';
import {colors, fontSizes} from '../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
function FiveStars(props) {
  const {numberOfStars} = props;
  return (
    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
      {[0, 1, 2, 3, 4].map(item => (
        <AntDesign
          key={`${item}`}
          name="star"
          color={item <= numberOfStars - 1 ? colors.warning : colors.inactive}
          style={{
            fontSize: 10,
            marginEnd: 2,
          }}
        />
      ))}
    </View>
  );
}
export default FiveStars;
