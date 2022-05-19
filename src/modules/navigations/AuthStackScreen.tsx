import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../screens/tutorialScreen/loginScreen';
import { RouteNames } from './routeName';

export type AuthStackParamList = {
    LoginScreen: undefined,
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackScreen = () => {
    return <AuthStack.Navigator>
        <AuthStack.Screen name={RouteNames.LoginScreen} component={LoginScreen} />
    </AuthStack.Navigator>
};

export default AuthStackScreen;