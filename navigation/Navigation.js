import React, {Component, useState} from "react";
import {
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    Keyboard,
  } from 'react-native';
import UITab from "./UITab";  
import { Welcome, Login, Register, Messenger } from "../screens";  
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Stack = createNativeStackNavigator()
const Navigation = () =>{
    return <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={"Welcome"} component={Welcome}/>
            <Stack.Screen name={"Login"} component={Login}/>
            <Stack.Screen name={"Register"} component={Register}/>
            <Stack.Screen name={"UITab"} component={UITab}/> 
            <Stack.Screen name={"Messenger"} component={Messenger}/>
        </Stack.Navigator>
    </NavigationContainer>
}
export default Navigation