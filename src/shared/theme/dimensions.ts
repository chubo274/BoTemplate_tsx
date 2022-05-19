import { PixelRatio, Dimensions, Platform, StatusBar } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const screenHeight = Dimensions.get('screen').height;
const navbarHeight = screenHeight - height + (StatusBar.currentHeight ?? 0);

const scale = width / 375;

const responsiveSize = (size: number) => {
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const isIphoneX = () => {
    const dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        ((dimen.height === 780 || dimen.width === 780)
            || (dimen.height === 812 || dimen.width === 812)
            || (dimen.height === 844 || dimen.width === 844)
            || (dimen.height === 896 || dimen.width === 896)
            || (dimen.height === 926 || dimen.width === 926))
    );
};

const statusBarHeight = Platform.select({
    ios: isIphoneX() ? 44 : 20,
    android: StatusBar.currentHeight,
    default: 0
});

const dimensions = {
    deviceHeight: height,
    deviceWidth: width,
    makeResponsiveSize: responsiveSize,
    getStatusBarHeight: statusBarHeight,
    androidBottomNavHeight: Platform.OS === 'android' ? navbarHeight : 0,
    p2: responsiveSize(2),
    p4: responsiveSize(4),
    p6: responsiveSize(6),
    p8: responsiveSize(8),
    p12: responsiveSize(12),
    p16: responsiveSize(16),
    p20: responsiveSize(20),
    p24: responsiveSize(24),
    p28: responsiveSize(28),
    p32: responsiveSize(32),
    p40: responsiveSize(40),
    p48: responsiveSize(48),
    p56: responsiveSize(56),
    p62: responsiveSize(62),
};

const fontSize = {
    makeResponsiveSize: responsiveSize,
    p2: responsiveSize(2),
    p4: responsiveSize(4),
    p6: responsiveSize(6),
    p8: responsiveSize(8),
    p12: responsiveSize(12),
    p16: responsiveSize(16),
    p18: responsiveSize(18),
    p20: responsiveSize(20),
    p24: responsiveSize(24),
    p28: responsiveSize(28),
    p32: responsiveSize(32),
    p40: responsiveSize(40),
};

export default { dimensions, fontSize };
