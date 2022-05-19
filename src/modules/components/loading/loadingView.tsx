import React from "react";
import {
    ActivityIndicator,
    StyleSheet, View
} from "react-native";
import theme from "../../../shared/theme";

const LoadingView = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={"large"} color={theme.color.activeBlue} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        padding: theme.dimensions.p16,
        flex: 1,
    },
});

export default LoadingView;
