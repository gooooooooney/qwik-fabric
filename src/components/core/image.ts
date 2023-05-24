import { ComponentType } from "~/constants/enum"
import type { FontWeight, TextAlign } from "~/constants/enum/style"
import type { Shadow } from "./text"

export const ImageCanvasStyle = {
  width: 200,
  height: 28,
  fontSize: 16,
  fontWeight: 'normal' as FontWeight,
  letterSpacing: 0,
  fill: '#181818',
  top: 0,
  left: 0,
  // textDecoration
  underline: false,
  overline: false,
  linethrough: false,
  // shadow
  shadow: null as Shadow | null,
  // fontStyle
  fontStyle: 'normal',
  fontFamily: 'Arial',
  // stroke and strokeWidth
  stroke: null as string | null,
  strokeWidth: 1,
  // textAlignment
  textAlign: 'left' as TextAlign,
  lineHeight: 1.5,
  // textBackgroundColor
  textBackgroundColor: 'transparent',
  zoomX: 1,
  zoomY: 1,
}
export const imageBlock = {
  type: ComponentType.Img as ComponentType.Img,
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
    ...ImageCanvasStyle,
  },
}