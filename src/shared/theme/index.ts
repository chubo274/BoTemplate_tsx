import AppColor from "./colors";
import dimensions from "./dimensions";
import { AppFont } from "./fonts";
import { globalShadowStyle } from "./shadow";

export default {
    dimensions: dimensions.dimensions,
    fontSize: dimensions.fontSize,
    font: AppFont,
    color: AppColor,
    shadow: globalShadowStyle,
}