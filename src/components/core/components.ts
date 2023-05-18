import { ComponentType } from "~/constants/enum";
import type * as CSS from 'csstype';
export type BlockInfo = typeof blockInfoList[number];
export type CSSProperties = CSS.Properties<string | number>;

// 公共样式
export const commonStyle = {
  rotate: 0,
  opacity: 1,
}
export const TextCanvasStyle = {
  width: 200,
  height: 28,
  fontSize: 16,
  fontWeight: 400,
  letterSpacing: 0,
  fill: '#181818',
  top: 0,
  left: 0,
  // textDecoration
  underline: false,
  overline: false,
  linethrough: false,
  // shadow
  shadow: null,
  // fontStyle
  fontStyle: 'normal',
  fontFamily: 'sans-serif',
  // stroke and strokeWidth
  stroke: null,
  strokeWidth: 1,
  // textAlignment
  textAlign: 'left',
  lineHeight: 1.5,
  // textBackgroundColor
  textBackgroundColor: 'transparent',

}
const textBlock = {
  type: ComponentType.TextBox,
  id: '',
  isLock: false,
  name: 'Text',
  props: {
    text: 'Hello World'
  },
  style: {
    width: 200,
    height: 28,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '',
    letterSpacing: 0,
    textAlign: 'left',
    color: '',
    top: 0,
    left: 0,
  },
  canvasStyle: {
    ...TextCanvasStyle,
  },
}
const list = [
  textBlock,
]

export const blockInfoList = list.map(item => ({
  ...item,
}))

export type TextBlock = typeof textBlock;