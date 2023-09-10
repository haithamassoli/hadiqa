import { Platform } from "react-native";
import { height, width } from "./helper";

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

export const hs = (size: number) =>
  (shortDimension / guidelineBaseWidth) * size;
export const vs = (size: number) =>
  (longDimension / guidelineBaseHeight) * size;
export const ms = (size: number, factor = 0.5) =>
  size + (hs(size) - size) * factor;
export const mvs = (size: number, factor = 0.5) =>
  size + (vs(size) - size) * factor;

export const isIOS = Platform.OS === "ios";
