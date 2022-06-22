import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MainStackParamList } from 'src/modules/navigations/MainStackScreen';
import { postLoginRequest } from 'src/modules/redux/actions/tutorialAction/user';
import { RouteNames } from 'src/modules/navigations/routeName';
import { AppLanguage, getString } from 'src/shared/localization';
import theme from 'src/shared/theme';
import { AppText } from 'src/modules/components/appText';
import { changeLanguage } from 'src/modules/redux/actions/general';
import { IReducer } from 'src/data/interfaces/common';
import { RootState } from 'src/modules/redux/reducers';

const TutorialLoginScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
    const languageReducer: IReducer<AppLanguage> = useSelector((state: RootState) => state.generalReducer.languageReducer);

    const onLogin = useCallback(() => {
        // dispatch(postLoginRequest({
        //     grantType: "password",
        //     email: "liffu@yopmail.com",
        //     password: "Admin123!"
        // }));
        navigation.navigate(RouteNames.TutorialHomeScreen);
    }, []);

    const onChangeLanguage = () => {
        if (languageReducer.data != 'en') {
            dispatch(changeLanguage('en'));
        } else {
            dispatch(changeLanguage('vn'));
        }
    }

    return <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.6} style={styles.btnLogin} onPress={onLogin}>
            <AppText>
                {getString('logIn')}
            </AppText>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} style={styles.btnLogin} onPress={onChangeLanguage}>
            <AppText>
                {getString('changeLanguage', {language: 'to VietNamese'})}
            </AppText>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: theme.dimensions.p40,
        justifyContent: 'space-between',
    },
    btnLogin: {
        width: '100%',
        padding: 16,
        backgroundColor: 'pink'
    },
});

export default TutorialLoginScreen;