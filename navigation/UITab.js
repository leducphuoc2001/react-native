import React from 'react';
import {colors, fontSizes} from '../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Settings, ProductGirdView, FoodList, Profile,Chat} from '../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
const screenOption = ({route}) => ({
  headerShown: false,
  tabBarActiveTintColor: 'white',
  tabBarInactiveTintColor: colors.inactive,
  tabBarActiveBackgroundColor: colors.primary,
  tabBarInactiveBackgroundColor: colors.primary,
  tabBarIcon: ({focused, color, size}) => {
    /*
    let screenName = route.name
    let iconName = "setting";
    if(screenName == "ProductGirdView") {
        iconName = "appstore1"
    }else if (screenName == "FoodList"){
        iconName = "menu-fold"
    }
    */
    return (
      <AntDesign
        name={
          route.name == 'ProductGirdView'
            ? 'twitter'
            : route.name == 'FoodList'
            ? 'menu-fold'
            : route.name == 'Settings'
            ? 'setting'
            : route.name == 'Profile'
            ? 'user'
            : route.name == 'Chat'
            ? 'message1'
            :''
        }
        color={focused ? 'white' : colors.inactive}
        style={{
          fontSize: 20,
        }}></AntDesign>
    );
  },
});
const UITab = () => {
  return (
    <Tab.Navigator screenOptions={screenOption}>
      <Tab.Screen name={'ProductGirdView'} component={ProductGirdView} />
      <Tab.Screen name={'Chat'} component={Chat} />
      <Tab.Screen name={'FoodList'} component={FoodList} />
      <Tab.Screen name={'Settings'} component={Settings} />
      <Tab.Screen name={'Profile'} component={Profile} />
    </Tab.Navigator>
  );
};
export default UITab;
