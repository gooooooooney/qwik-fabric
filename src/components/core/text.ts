import { ComponentType } from "~/constants/enum"
import type { FontWeight, TextAlign } from "~/constants/enum/style"
export interface Shadow {
  /**
   * Shadow color
   * @type String
   * @default
   */
  color: string;
  /**
   * Shadow blur
   * @type Number
   */
  blur: number;
  /**
   * Shadow horizontal offset
   * @type Number
   * @default
   */
  offsetX: number;
  /**
   * Shadow vertical offset
   * @type Number
   * @default
   */
  offsetY: number;
}
export const TextCanvasStyle = {
  fontWeight: 'normal' as FontWeight,
  shadow: null as Shadow | null | undefined,
  textAlign: 'left' as TextAlign,
  fontSize: 16,
  fontFamily: "Arial",
  fontStyle: "normal",
  lineHeight: 1.5,
  text: "Hello World",
  charSpacing: 0,
  styles: [],
  path: null,
  pathStartOffset: 0,
  pathSide: "left",
  pathAlign: "baseline",
  underline: false,
  overline: false,
  linethrough: false,
  textBackgroundColor: "transparent",
  direction: "ltr",
  minWidth: 20,
  splitByGrapheme: true,
  originX: "left",
  originY: "top",
  left: 125.5,
  top: 97,
  width: 100,
  height: 18.08,
  fill: "#181818",
  stroke: null,
  strokeWidth: 1,
  strokeDashArray: null,
  strokeLineCap: "butt",
  strokeDashOffset: 0,
  strokeLineJoin: "miter",
  strokeUniform: false,
  strokeMiterLimit: 4,
  scaleX: 1,
  scaleY: 1,
  angle: 0,
  flipX: false,
  flipY: false,
  opacity: 1,
  visible: true,
  backgroundColor: "",
  fillRule: "nonzero",
  paintFirst: "fill",
  globalCompositeOperation: "source-over",
  skewX: 0,
  skewY: 0
}
export const textBlock = {
  type: ComponentType.TextBox as ComponentType.TextBox,
  id: '',
  isLock: false,
  icon: 'TextIcon',
  name: 'Text',
  canvasStyle: {
    ...TextCanvasStyle,
  },
}