import React, {Component} from "react"
import { TouchableOpacity, Text} from "react-native"
import AntDesign from 'react-native-vector-icons/AntDesign'
import {colors} from '../constants'
function UIButton(props) {
    const{onPress, title, isSelected} = props
    return  <TouchableOpacity
    onPress={onPress}
    style={{
      borderColor:'white',
      borderWidth: 1,
      height:45,
      borderRadius:5,
      marginHorizontal:15,
      marginVertical:10,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: isSelected == true ? 'white': null
    }}>
      {isSelected== true && <AntDesign 
      name='checkcircleo' style={{
        color:'green',
         fontSize:20,
         position:'absolute',
         left:10,
         top:10,
      }}></AntDesign>}
      <Text style={{
        color: isSelected == true ? colors.primary: 'white'
      }}>{title}
      </Text>
    </TouchableOpacity>
}
export default UIButton