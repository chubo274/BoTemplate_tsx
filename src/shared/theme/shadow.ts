import { StyleSheet } from 'react-native';

export const globalShadowStyle = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            height: 3,
            width: 0
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    }
});