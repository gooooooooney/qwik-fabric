import type * as CSS from 'csstype';
import { textBlock } from "./text";
import { imageBlock } from "./image";
import { circleBlock } from './circle';
import { rectBlock } from './rect';
export type BlockInfo = typeof blockInfoList[number];
export type CSSProperties = CSS.Properties<string | number>;

// 公共样式
export const commonStyle = {
  rotate: 0,
  opacity: 1,
}

export const blockInfoList = [
  textBlock,
  imageBlock,
  circleBlock,
  rectBlock,
]

// export const blockInfoList = list.map(item => ({
//   ...item,
// }))

export type TextBlock = typeof textBlock;
export type ImageBlock = typeof imageBlock;
export type CircleBlock = typeof circleBlock;
export type RectBlock = typeof rectBlock;