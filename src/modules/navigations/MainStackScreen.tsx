import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { RouteNames } from './routeName';
import TutorialHomeScreen from '../screens/tutorialScreen/homeScreen';
import TutorialLoginScreen from '../screens/tutorialScreen/loginScreen';

export type MainStackParamList = {
    TutorialHomeScreen: undefined,
    TutorialLoginScreen: undefined,
};

const MainStack = createNativeStackNavigator<MainStackParamList>();

const MainStackScreen = () => {
    return <MainStack.Navigator>
        <MainStack.Screen name={RouteNames.TutorialHomeScreen} component={TutorialHomeScreen} />
        <MainStack.Screen name={RouteNames.TutorialLoginScreen} component={TutorialLoginScreen} />
    </MainStack.Navigator>
};

export default MainStackScreen;