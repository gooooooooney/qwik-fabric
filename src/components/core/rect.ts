import { ComponentType } from "~/constants/enum"
import type { fabric } from "~/element"
export type RectProps = ConstructorParameters<typeof fabric.Rect>[number] & {type: ComponentType.Rect, id?: string}

export const RectCanvasStyle: RectProps = {
  "rx": 5,
  "ry": 5,
  "originX": "left",
  "originY": "top",
  "left": 406.5,
  "top": 106,
  "width": 100,
  "height": 100,
  "fill": "#000",
  "stroke": "",
  "strokeWidth": 1,
  "strokeDashArray": null,
  "strokeLineCap": "butt",
  "strokeDashOffset": 0,
  "strokeLineJoin": "miter",
  "strokeUniform": false,
  "strokeMiterLimit": 4,
  "scaleX": 1,
  "scaleY": 1,
  "angle": 0,
  "flipX": false,
  "flipY": false,
  "opacity": 1,
  "visible": true,
  "backgroundColor": "",
  "fillRule": "nonzero",
  "paintFirst": "fill",
  "skewX": 0,
  "skewY": 0,
  type: ComponentType.Rect,
  shadow: null,
}

export const rectBlock = {
  type: ComponentType.Rect as ComponentType.Rect,
  id: '',
  isLock: false,
  icon: 'SquareIcon',
  name: 'Rect',
  style: {
    width: 100,
    height: 100,
    top: 0,
    left: 0,
  },
  canvasStyle: {
    ...RectCanvasStyle,
  },
}