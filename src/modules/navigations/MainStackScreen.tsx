import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { RouteNames } from './routeName';
import HomeScreen from '../screens/tutorialScreen/homeScreen';
import LoginScreen from '../screens/tutorialScreen/loginScreen';

export type MainStackParamList = {
    HomeScreen: undefined,
    LoginScreen: undefined,
};

const MainStack = createNativeStackNavigator<MainStackParamList>();

const MainStackScreen = () => {
    return <MainStack.Navigator>
        <MainStack.Screen name={RouteNames.HomeScreen} component={HomeScreen} />
        <MainStack.Screen name={RouteNames.LoginScreen} component={LoginScreen} />
    </MainStack.Navigator>
};

export default MainStackScreen;