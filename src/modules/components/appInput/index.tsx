import React, { useRef } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Input, InputProps } from "react-native-elements";
import theme from "../../../shared/theme";
import Entypo from 'react-native-vector-icons/Entypo';

interface IAppInput extends InputProps {

}

export const AppInput = React.memo((props: IAppInput) => {
    const inputRef = useRef(null);
    const { inputContainerStyle, inputStyle, labelStyle, errorStyle,
        errorMessage, } = props;

    return <Input {...props}
        ref={inputRef}
        autoCompleteType={''}
        allowFontScaling={false}
        spellCheck={false}
        autoCorrect={false}
        underlineColorAndroid={'transparent'}
        inputContainerStyle={[styles.inputContainerStyle, inputContainerStyle]}
        inputStyle={[styles.inputStyle, inputStyle, Boolean(errorMessage) && { color: theme.color.red }]}
        labelStyle={[styles.labelStyle, labelStyle]}
        // placeholderTextColor={theme.color.orange}
        errorStyle={[styles.errorStyle, errorStyle]}
        rightIcon={
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => console.log('pressed')}
            >
                <Entypo name={'cross'} size={18} />
            </TouchableOpacity>
        }
    />
});

const styles = StyleSheet.create({
    container: {
    },
    inputContainerStyle: {
        width: '100%',
        // borderBottomWidth: 0,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
    },
    inputStyle: {
        fontFamily: theme.font.Regular,
        fontSize: theme.fontSize.p16,
        paddingHorizontal: theme.dimensions.p4,
    },
    labelStyle: {
        fontFamily: theme.font.SemiBold,
        fontSize: theme.fontSize.p16,
    },
    errorStyle: {
        fontFamily: theme.font.SemiBold,
        fontSize: theme.fontSize.p12,
        color: theme.color.red,
    }
});