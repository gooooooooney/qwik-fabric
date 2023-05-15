import { ComponentType } from "~/constants/enum";
import type * as CSS from 'csstype';
export type BlockInfo = typeof blockInfoList[number];
export type CSSProperties = CSS.Properties<string | number>;

// 公共样式
export const commonStyle = {
  rotate: 0,
  opacity: 1,
}
 const list = [
  {
    name: 'Text',
    type: ComponentType.Text,
    id: '',
    style: {
      width: 200,
      height: 28,
      fontSize: '',
      fontWeight: 400,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: 'center',
      color: '',
      top: 0,
      left: 0,
    },
    isLock: false,
    props: {
      text: 'Hello World'
    }
  }
]

export const blockInfoList = list.map(item => ({
  ...item,
  style: {
    ...commonStyle,
    ...item.style
  }
}))
