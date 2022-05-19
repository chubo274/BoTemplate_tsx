import React from "react";
import FastImage, { FastImageProps } from "react-native-fast-image";

interface IImageRender extends FastImageProps {

}

export const ImageRender = React.memo((props: IImageRender) => {
    return <FastImage {...props} />;
});