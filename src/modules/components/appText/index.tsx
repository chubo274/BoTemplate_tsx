import React, { ReactNode } from "react";
import { StyleSheet, Text, TextProps } from "react-native";
import theme from "../../../shared/theme";

interface IAppText extends TextProps {
    children: string | ReactNode;
}

export const AppText = React.memo((props: IAppText) => {
    const { children } = props;
    return <Text {...props} style={[styles.defaultStyle, props.style]} children={children} />;
});

const styles = StyleSheet.create({
    defaultStyle: {
        fontFamily: theme.font.Regular,
        fontSize: theme.fontSize.p16,
    }
});