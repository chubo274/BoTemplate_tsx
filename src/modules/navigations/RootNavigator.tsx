import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import _ from 'lodash';
import { RouteNames } from './routeName';
import MainStackScreen from './MainStackScreen';
import AuthStackScreen from './AuthStackScreen';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { IReducer } from 'src/data/interfaces/common';
import { UserModel } from 'src/data/models/UserModel';

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
    const userReducer: IReducer<UserModel> = useSelector((state: RootState) => state.userReducer.loginReducer);

    return <RootStack.Navigator
        screenOptions={{
            headerShown: false,
        }}
    >
        {!!userReducer.data?.token ? (
            <RootStack.Screen
                name={RouteNames.MainStack}
                component={MainStackScreen}
            />
        ) : (
            <RootStack.Screen
                name={RouteNames.AuthStack}
                component={AuthStackScreen}
            />
        )}
    </RootStack.Navigator>
}

export default RootNavigator;