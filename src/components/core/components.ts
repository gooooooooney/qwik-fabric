import type * as CSS from 'csstype';
import { TextCanvasStyle } from "./text";
import type { imageBlock } from "./image";
import { CircleCanvasStyle } from './circle';
import { RectCanvasStyle } from './rect';
export type BlockInfo = typeof blockInfoList[number];
export type CSSProperties = CSS.Properties<string | number>;

// 公共样式
export const commonStyle = {
  rotate: 0,
  opacity: 1,
}

export const blockInfoList = [
  TextCanvasStyle,
  // imageBlock,
  CircleCanvasStyle,
  RectCanvasStyle,
]

// export const blockInfoList = list.map(item => ({
//   ...item,
// }))

export type TextBlock = typeof TextCanvasStyle;
export type ImageBlock = typeof imageBlock;
export type CircleBlock = typeof CircleCanvasStyle;
export type RectBlock = typeof RectCanvasStyle;