import type * as CSS from 'csstype';
import { textBlock } from "./text";
import { imageBlock } from "./image";
export type BlockInfo = typeof blockInfoList[number];
export type CSSProperties = CSS.Properties<string | number>;

// 公共样式
export const commonStyle = {
  rotate: 0,
  opacity: 1,
}

const list = [
  textBlock,
  imageBlock,
]

export const blockInfoList = list.map(item => ({
  ...item,
}))

export type TextBlock = typeof textBlock;
export type ImageBlock = typeof imageBlock;