import React from 'react';
import {
    View, Text, Image,
    TouchableOpacity,
} from 'react-native';
import { colors, fontSizes } from '../../constants'
import AntDesign from 'react-native-vector-icons/AntDesign'
function _getColorFromStatus(status) {
    /*
    if(status.toLowerCase().trim() == 'opening now') {
        return colors.success
    } else if (status.toLowerCase().trim() == 'closing soon'){
        return colors.alert
    }else if (status.toLowerCase().trim() == 'comming soon'){
        return colors.warning
    }*/
    return status.toLowerCase().trim() == 'opening now' ? colors.success :
        (status.toLowerCase().trim() == 'closing soon' ? colors.alert :
            (status.toLowerCase().trim() == 'comming soon' ? colors.warning : colors.success))
}
function FoodItem(props) {
    const { name, price, socialNetworks, status, url, website, } = props.food
    const { onPress } = props
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                height: 150,
                paddingTop: 20,
                paddingStart: 10,
                flexDirection: 'row'
            }}>
            <Image
                style={{
                    width: 100,
                    height: 100,
                    resizeMode: 'cover',
                    borderRadius: 10,
                    marginRight: 15
                }}
                source={{
                    uri: url
                }} />
            <View style={{
                flex: 1,
                marginRight: 10
            }}>
                <Text style={{
                    color: 'black',
                    fontSize: fontSizes.h6,
                    fontWeight: 'bold'
                }}>{name}</Text>
                <View style={{
                    height: 1,
                    backgroundColor: 'black'
                }} />
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{
                        color: colors.inactive,
                        fontSize: fontSizes.h6,
                    }}>Status: </Text>
                    <Text style={{
                        color: _getColorFromStatus(status),
                        fontSize: fontSizes.h6,
                    }}>{status.toUpperCase()}</Text>
                </View>
                <Text style={{
                    color: colors.inactive,
                    fontSize: fontSizes.h6,
                }}>Price: {price} $</Text>
                <Text style={{
                    color: colors.inactive,
                    fontSize: fontSizes.h6,
                }}>Food Type: Pizza</Text>
                <Text style={{
                    color: colors.inactive,
                    fontSize: fontSizes.h6,
                }}>Website: {website}</Text>
                <View style={{
                    flexDirection: 'row'
                }}>
                    {socialNetworks['facebook'] != undefined && <AntDesign
                        name='facebook-square' style={{
                            fontSize: 15,
                            paddingEnd: 5
                        }}></AntDesign>}
                    {socialNetworks['twitter'] != undefined && <AntDesign
                        name='twitter' style={{
                            fontSize: 15,
                            paddingEnd: 5
                        }}></AntDesign>}
                    {socialNetworks['instagram'] != undefined && <AntDesign
                        name='instagram' style={{
                            fontSize: 15,
                        }}></AntDesign>}
                </View>
            </View>
        </TouchableOpacity>
    )
}
export default FoodItem