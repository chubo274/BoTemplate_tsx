import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import TutorialHomeScreen from '../screens/tutorialScreen/homeScreen';
import TutorialLoginScreen from '../screens/tutorialScreen/loginScreen';
import { RouteNames } from './routeName';

export type AuthStackParamList = {
    TutorialLoginScreen: undefined,
    TutorialHomeScreen: undefined,
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackScreen = () => {
    return <AuthStack.Navigator>
        <AuthStack.Screen name={RouteNames.TutorialLoginScreen} component={TutorialLoginScreen} />
        <AuthStack.Screen name={RouteNames.TutorialHomeScreen} component={TutorialHomeScreen} />
    </AuthStack.Navigator>
};

export default AuthStackScreen;