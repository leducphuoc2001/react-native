import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import {colors, fontSizes} from '../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FiveStars from './FiveStars';
function GirdItem(props) {
  const {item, index, onPress} = props;
  return (
    <View
      style={{
        flex: 1,
        marginLeft: index % 2 == 0 ? 10 : 0,
        marginTop: 5,
        marginRight: 10,
        marginBottom: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.inactive,
      }}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
        }}>
        <Image
          style={{
            width: 70,
            height: 90,
            resizeMode: 'cover',
            borderRadius: 20,
            marginRight: 15,
          }}
          source={{
            uri: item.url,
          }}
        />
        <Text
          style={{
            color: 'black',
            fontSize: fontSizes.h2,
            marginRight: 5,
            fontWeight: 'bold',
            flex: 1,
            textAlign: 'right',
          }}>
          $ {item.price}
        </Text>
      </View>
      <Text
        style={{
          color: colors.primary,
          fontSize: fontSizes.h6,
          fontWeight: 'bold',
          marginHorizontal: 10,
          marginTop: 5,
        }}>
        {item.productName}
      </Text>
      {item.specifications.map((specification,index) => (
        <Text
          key={index}
          style={{
            color: 'black',
            fontSize: fontSizes.h6,
            paddingHorizontal: 10,
            paddingBottom: 10,
          }}>
          * {specification}
        </Text>
      ))}
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
        }}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            flexDirection: 'row',
          }}>
          <AntDesign
            name="hearto"
            color={
              item.isSaved == undefined || item.isSaved == false
                ? colors.inactive
                : 'red'
            }
            style={{
              fontSize: 22,
              marginEnd: 5,
            }}></AntDesign>
          <Text
            style={{
              color:
                item.isSaved == undefined || item.isSaved == false
                  ? colors.inactive
                  : 'red',
              fontSize: fontSizes.h6 * 0.8,
              width: 50,
            }}>
            Saved for later
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
          }}>
          <FiveStars numberOfStars={item.start}></FiveStars>
          <Text
            style={{
              color: 'blue',
              fontSize: fontSizes.h6,
              textAlign: 'right',
              marginTop: 5,
            }}>
            {item.reviews} Reviews
          </Text>
        </View>
      </View>
    </View>
  );
}
export default GirdItem;
